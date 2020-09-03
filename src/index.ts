import 'tsconfig-paths/register';
import 'reflect-metadata';
import express from 'express';
import { MikroORM } from 'mikro-orm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

// import { Post } from 'entities/Post';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';

import { __prod__, HOST, PORT } from './constants';
import mikroOrmConfig from './mikro-orm.config';

// const app = express();

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });

  app.get('/', (__, res) => {
    res.send('Hello world!');
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, HOST, () => {
    console.log(`server started on ${HOST}:${PORT}`);
  });

  // const post = await orm.em.create(Post, { title: 'my first post' });
  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log('main -> posts', posts);
};

main().catch((error) => {
  console.log(error);
});

// app.use((req, res, next) => {
//   RequestContext.create(orm.em, next);
// });
