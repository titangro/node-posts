import path from 'path';
import { MikroORM } from 'mikro-orm';

import { Post, User } from './entities';

import { __prod__ } from './constants';

export default {
  entitiesDirs: ['./dist/entities'], // path to your JS entities (dist), relative to `baseDir`
  entitiesDirsTs: ['./src/entities'],
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: false, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
  entities: [Post, User],
  type: 'postgresql',
  dbName: 'postbook',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
