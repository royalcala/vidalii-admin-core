import express from 'express';
// import 'express-async-errors';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { Connection, IDatabaseDriver, MikroORM, EntityManager, Options, AnyEntity, EntitySchema } from '@mikro-orm/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';
import expressPlayground from 'graphql-playground-middleware-express';
import { Server } from 'http';
// import ormConfig from './orm.config';
import { makeExecutableSchema } from 'graphql-tools'
import glob from 'glob'
import { Request, Response } from 'express';
import { EntityClass, EntityClassGroup } from '@mikro-orm/core/typings';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

// const ormConfig: Options = {
//   metadataProvider:TsMorphMetadataProvider,
//   migrations: {
//     path: './src/migrations',
//     tableName: 'migrations',
//     transactional: true,
//   },
//   tsNode: process.env.NODE_DEV === 'true' ? true : false,
//   type: 'sqlite',
//   dbName: 'test.db',
//   // as we are using class references here, we don't need to specify `entitiesTs` option
//   // entities: [Author, Book, BookTag, Publisher, BaseEntity],
//   highlighter: new SqlHighlighter(),
//   debug: true,
// }

export interface Context {
  req: Request;
  res: Response;
  em: EntityManager<IDatabaseDriver<Connection>>;
}


class VidaliiService {
  private ormConfig: Options = {
    metadataProvider: TsMorphMetadataProvider,
    migrations: {
      path: './src/migrations',
      tableName: 'migrations',
      transactional: true,
    },
    tsNode: process.env.NODE_DEV === 'true' ? true : false,
    type: 'sqlite',
    dbName: 'test.db',
    // as we are using class references here, we don't need to specify `entitiesTs` option
    // entities: [Author, Book, BookTag, Publisher, BaseEntity],
    highlighter: new SqlHighlighter(),
    debug: true,
  }
  private orm: MikroORM<IDatabaseDriver<Connection>>
  private host: express.Application
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
  public addResolver(type: keyof VidaliiService['api']['resolver'], resolver: Function, options: 'replace' | 'pre' | 'post' = 'replace') {
    console.log('addResolver:', resolver.name)
    const optionReplace = (type: keyof VidaliiService['api']['resolver'], resolver) => {
      this.api.resolver[type].set(resolver.name, resolver)
    }
    switch (options) {
      case 'replace':
        optionReplace(type, resolver)
        break;
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
      this.ormConfig.entities = [...this.entities.values()] as any
      console.log(this.ormConfig.entities)
      this.orm = await MikroORM.init(this.ormConfig);
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
    const data = {
      typeDefs: [...this.api.type.values()].join('\n'),
      resolvers: {
        Query: Object.fromEntries(this.api.resolver.Query),
        ...Object.fromEntries(this.api.resolver.Type)
      } as any
    }
    if (this.api.resolver.Mutation.size > 0)
      data.resolvers.Mutation = Object.fromEntries(this.api.resolver.Mutation)
    const schema = makeExecutableSchema(data)
    return schema
  }
  private async initServer() {
    this.host = express();
    this.host.use(cors());
    if (process.env.NODE_ENV !== 'production') {
      this.host.get('/graphql', expressPlayground({ endpoint: '/graphql' }));
    }
    try {
      const schema = this.getSchemaApi()

      //TODO validate with graphql like in ms and agregate flush after all the operations
      this.host.post(
        '/graphql',
        bodyParser.json(),
        graphqlHTTP(
          (req, res) => ({
            schema,
            context: { req, res, em: this.orm?.em?.fork() || 'no database init' } as Context,
            customFormatErrorFn: (error) => {
              throw error;
            },
          })
        ),
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

export default new VidaliiService()

