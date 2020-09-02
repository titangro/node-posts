require('tsconfig-paths/register');
import { MikroORM } from 'mikro-orm';

import { Post } from 'entries/Post';

import { __prod__ } from './constants';
import microConfig from './mikro-orm.config';
// import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const post = orm.em.create(Post, { title: 'my first post' });
  await orm.em.persistAndFlush(post);
  // console.log('----------- sql 2 ----------');
  await orm.em.nativeInsert(Post, { title: 'my first post 2' });
};

main().catch((error) => {
  console.log(error);
});
