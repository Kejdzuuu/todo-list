import { ApolloServer, gql } from 'apollo-server';
import mongoose from 'mongoose';
import TodoItem from './models/TodoItem';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI as string)
  .then(() => {
    console.log('connected to mongodb');
  })
  .catch((error) => {
    console.log('did not connect:', error.message);
  });

const typeDefs = gql`
  type TodoItem {
    id: ID!,
    content: String!,
    done: Boolean!
  },
  type Query {
    allItems: [TodoItem!]!
  },
  type Mutation {
    addItem(
      content: String!
    ): TodoItem
    removeItem(
      id: String!
    ): Boolean
    updateItem(
      id: String!
    ): Boolean
  }
`;

const resolvers = {
  Query: {
    allItems: async (_root: any, _args: any) => {
      return TodoItem.find({});
    }
  },
  Mutation: {
    addItem: (_root: any, args: { content: string; }) => {
      const newItem = new TodoItem({ content: args.content, done: false });
      newItem.save().catch((e) => console.log(e));
      return newItem;
    },
    removeItem: async (_root: any, args: { id: string; }) => {
      try {
        await TodoItem.findById(args.id).deleteOne();
      } catch (e) {
        console.log(e);
      }
      return true;
    },
    updateItem: async (_root: any, args: { id: string; }) => {
      const item = await TodoItem.findById(args.id);
      if (!item) {
        return false;
      }
      try {
        await TodoItem.findByIdAndUpdate(item.id, { done: !item.done }, {new: true});
      } catch (e) {
        console.log(e);
      }
      return true;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
}).catch((e) => console.log(e));
