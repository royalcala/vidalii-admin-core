import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { EntityClass, EntityClassGroup } from '@mikro-orm/core/typings';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { Connection, IDatabaseDriver, MikroORM, EntityManager, Options, AnyEntity, EntitySchema } from '@mikro-orm/core';


export type Em = EntityManager<IDatabaseDriver<Connection>>


export class DB {
    public entities = new Map() as Map<string, EntityClass<AnyEntity>>
    public ormConfig: Options = {
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