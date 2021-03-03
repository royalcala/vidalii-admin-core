import express from 'express';
// import 'express-async-errors';

import { Connection, IDatabaseDriver, MikroORM, EntityManager, Options, AnyEntity, EntitySchema } from '@mikro-orm/core';
import bodyParser from 'body-parser';
// import { PublisherType } from 'contracts/enums/publisherType.enum';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { Server } from 'http';
import ormConfig from './orm.config';
import { makeExecutableSchema } from 'graphql-tools'
import glob from 'glob'
// import { AuthorResolver } from 'resolvers/author.resolver';
// import { BookResolver } from 'resolvers/book.resolver';
// import { buildSchema, registerEnumType } from 'type-graphql';
import { Request, Response } from 'express';
import { EntityClass, EntityClassGroup } from '@mikro-orm/core/typings';

export interface MyContext {
  req: Request;
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
}

export default class Application {
  public orm: MikroORM<IDatabaseDriver<Connection>>;
  public host: express.Application;
  public server: Server;
  public entities = [] as (string | EntityClass<AnyEntity> | EntityClassGroup<AnyEntity> | EntitySchema<any>)[]
  public api = {
    type: [] as String[],
    resolver: [] as Function[]
  }

  public initDB = async (): Promise<void> => {
    try {
      ormConfig.entities = this.entities
      this.orm = await MikroORM.init(ormConfig);
      const migrator = this.orm.getMigrator();
      const migrations = await migrator.getPendingMigrations();
      if (migrations && migrations.length > 0) {
        await migrator.up();
      }
    } catch (error) {
      console.error('📌 Could not connect to the database', error);
      throw Error(error);
    }
  };

  private initGraphql() {
    // const schema: GraphQLSchema = await buildSchema({
    //   resolvers: [BookResolver, AuthorResolver],
    //   dateScalarMode: 'isoDate',
    // });
    const files = glob.sync(this.apiPaths)
      .map(path => {
        console.log(path)
        const file = require(path)
        const data = {
          typeDefs: [] as String[],
          resolvers: [] as Function[]
        }
        if (file?.typeDef && typeof file?.typeDef === 'string')
          data.typeDefs.push(file.typeDefs)

        if (file?.resolvers && typeof file.resolver === 'function')
          data.resolvers.push(file.resolvers)

        return data
      })
    const typeDefs = files.map(data => {
      if (data.typeDefs.length > 0)
        return data.typeDefs
      else
        return null
    }).filter(data => data !== null).join('\n')

    const resolvers = files.map(data => {
      if (data.resolvers.length > 0)
        return data.resolvers
      else
        return null
    }).filter(data => data !== null) as any

    const schema = makeExecutableSchema({
      typeDefs,
      resolvers
    });

    return schema
  }
  public initServer = async (): Promise<void> => {
    this.host = express();

    if (process.env.NODE_ENV !== 'production') {
      this.host.get('/graphql', expressPlayground({ endpoint: '/graphql' }));
    }

    this.host.use(cors());

    try {

      const schema = this.initGraphql()

      this.host.post(
        '/graphql',
        bodyParser.json(),
        graphqlHTTP((req, res) => ({
          schema,
          context: { req, res, em: this.orm.em.fork() } as MyContext,
          customFormatErrorFn: (error) => {
            throw error;
          },
        })),
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      this.host.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
        console.error('📌 Something went wrong', error);
        res.status(400).send(error);
      });

      const port = process.env.PORT || 4000;
      this.server = this.host.listen(port, () => {
        console.log(`🚀 http://localhost:${port}/graphql`);
      });
    } catch (error) {
      console.error('📌 Could not start server', error);
    }
  };
}
