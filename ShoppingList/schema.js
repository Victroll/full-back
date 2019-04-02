import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt
} from 'graphql';

/** Database */
import db from './db';

const ShoppingListType = new GraphQLObjectType({
  name: 'List',
  description: 'List of items',
  fields: () => ({
    id: {
      type: GraphQLString
    },
    userId: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    items: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: {
            type: GraphQLString
          },
          amount: {
            GraphQLInt
          },
          uds: {
            GraphQLInt
          }
        })
      )
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query for Shopping List lists',
  fields: () => ({
    lists: {
      type: new GraphQLList(ShoppingListType),
      args: {
        userId: {
          type: GraphQLString
        }
      },
      resolve(_, input) {
        return db.findById(input.userId);
      }
    }
  })
});
