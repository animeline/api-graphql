import { ApolloServer } from "apollo-server";
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return "world";
        },
      },
    },
  }),
});

function serverConnection() {
  const server = new ApolloServer({
    schema,
    playground: true,
  });

  server.listen({ port: 3003 }).then(() => console.log("Server started"));
}

serverConnection();
