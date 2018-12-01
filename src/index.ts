import { GraphQLServer } from 'graphql-yoga';
import { prisma } from './generated/prisma-client';

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query: {
      hello: () => 'test'
    },
    Subscription: {
      newUser: {
        subscribe: (parent, args, ctx) => {
          return ctx.db.$subscribe
            .user({ where: { mutation_in: 'CREATED' } })
            .node();
        }
      }
    }
  },
  context: {
    db: prisma
  }
} as any);

server.start(() => console.log('Server is running on http://localhost:4000'));
