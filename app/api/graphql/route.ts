import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../../graphql/schema';
import { resolvers } from '../../../graphql/resolvers';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer);

export { handler as GET, handler as POST };
