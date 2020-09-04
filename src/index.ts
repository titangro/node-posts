import { MyContext } from 'types';
import 'tsconfig-paths/register';
import 'reflect-metadata';
import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { MikroORM } from 'mikro-orm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { HelloResolver, PostResolver, UserResolver } from './resolvers';

import { __prod__, HOST, PORT } from './constants';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    session({
      name: 'qid',
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only work on https
      },
      saveUninitialized: false,
      secret: 'f`dkmfINFJONvokN(*Ejfsdfvadfv$Tgh',
      resave: false,
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }),
  });

  // @ts-ignore
  app.use('*', (req, res, next) => {
    const query = req.query.query || req.body.query || '';
    if (query.length > 2000) {
      throw new Error('Query too large');
    }
    next();
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
