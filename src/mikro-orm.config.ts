import path from 'path';
import { MikroORM } from 'mikro-orm';

import { Post } from 'entries/Post';

import { __prod__ } from './constants';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  entities: [Post],
  type: 'postgresql',
  dbName: 'postbook',
  debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
