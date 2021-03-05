import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { EntityClass, EntityClassGroup } from '@mikro-orm/core/typings';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { Connection, IDatabaseDriver, MikroORM, EntityManager, Options, AnyEntity, EntitySchema } from '@mikro-orm/core';
// import { Author } from "./test/test1/Author.entity";
// import { BaseEntity } from "./test/test1/BaseEntity.entity";
export type Em = EntityManager<IDatabaseDriver<Connection>>


export class DB {
    public entities = new Map() as Map<string, EntityClass<AnyEntity>>
    public ormConfig: Options = {
        metadataProvider: TsMorphMetadataProvider,
        migrations: {
            path: './src/migrations',//TODO define in root path
            tableName: 'migrations',
            transactional: true,
        },
        tsNode: process.env.NODE_DEV === 'true' ? true : false,
        type: 'sqlite',
        dbName: 'test.db',//TODO define in root path
        // as we are using class references here, we don't need to specify `entitiesTs` option
        // entities: [Author, BaseEntity],
        highlighter: new SqlHighlighter(),
        debug: true,
    }
    public orm: MikroORM<IDatabaseDriver<Connection>>

    public addEntity(entity: EntityClass<AnyEntity>, options: 'replace' = 'replace') {
        console.log('addEntity:', entity.name)
        if (options === 'replace')
            this.entities.set(entity.name, entity)
    }


    public async start(): Promise<void> {
        try {
            this.ormConfig.entities = [...this.entities.values()] as any
            console.log(this.ormConfig.entities)
            this.orm = await MikroORM.init(this.ormConfig);
            const generator = this.orm.getSchemaGenerator();
            //TODO
            // if (process.env.NODE_ENV === 'testing') {
                await generator.dropSchema();
                await generator.createSchema();
                await generator.updateSchema();
            // }
            // else
            //     await generator.createSchema()

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
}