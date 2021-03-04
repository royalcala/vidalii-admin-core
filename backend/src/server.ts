import express from 'express';
// import 'express-async-errors';
import Path from 'path'
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


class Vidalii {
  //@ts-ignore
  private orm: MikroORM<IDatabaseDriver<Connection>>
  //@ts-ignore
  private host: express.Application
  //@ts-ignore
  private server: Server
  private entities = new Map() as Map<string, EntityClass<AnyEntity>>
  private api = {
    type: new Map() as Map<string, string>,
    resolver: {
      Query: new Map() as Map<string, Function>,
      Mutation: new Map() as Map<string, Function>,
      Type: new Map() as Map<string, Function>
    }
  }
  public addType(name: string, type: string) {
    console.log('addType', name)
    this.api.type.set(name, type)
  }
  public addResolver(type: keyof Vidalii['api']['resolver'], resolver: Function, options: 'replace' | 'pre' | 'post') {
    console.log('addResolver:', resolver.name)
    const optionReplace = (resolver, type: keyof Vidalii['api']['resolver'],) => {
      this.api.resolver[type].set(resolver.name, resolver)
    }
    switch (type) {
      case 'Query':
        optionReplace
        break;
      case 'Mutation':

        break;
      case 'Type':

        break;
    }
    if (options === 'merge') {
      this.api.resolver.get()
      this.api.resolver.set(resolver.name, resolver)
    }
  }
  public addEntity(entity: EntityClass<AnyEntity>, options: 'replace' = 'replace') {
    console.log('addEntity:', entity.name)
    if (options === 'replace')
      this.entities.set(entity.name, entity)
  }
  private initAddsFiles() {
    console.log('Discovering .entity and .api files...\n')
    glob.
      glob.sync('**/*.api.{js,ts}', { absolute: true }).forEach(
        path => {
          console.log(path)
          require(path)
        }
      )
    glob.sync('**/*.entity.{js,ts}', { absolute: true }).forEach(
      (path) => {
        console.log(path)
        require(path)
      }
    )

  }

  private async initDB(): Promise<void> {
    try {
      ormConfig.entities = [...this.entities.values()] as any
      console.log(ormConfig.entities)
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
  }
  private getSchemaApi() {
    const schema = makeExecutableSchema({
      typeDefs: [...this.api.type.values()].join('\n'),
      resolvers: [...this.api.resolver.values()] as any
    })
    return schema
  }
  private async initServer() {
    this.host = express();
    this.host.use(cors());
    if (process.env.NODE_ENV !== 'production') {
      this.host.get('/graphql', expressPlayground({ endpoint: '/graphql' }));
    }
    try {
      this.host.post(
        '/graphql',
        bodyParser.json(),
        graphqlHTTP((req, res) => ({
          schema: this.getSchemaApi(),
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
  }

  public async start(): Promise<void> {
    this.initAddsFiles()
    await this.initDB()
    await this.initServer()
  }
}

export default new Vidalii()

