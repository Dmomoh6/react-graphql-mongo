const Express = require("express");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const mongoose = require("mongoose");
require("dotenv").config();

const {
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,

  GraphQLSchema,
} = require("graphql");
var app = Express();
var cors = require("cors");

app.use(cors());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.error(err));

const TransactionModel = mongoose.model("Transaction", {
  status: { type: String, text: true },
  date: { type: String, text: true },
  name: { type: String, text: true },
  type: { type: String, text: true },
});

const TransactionType = new GraphQLObjectType({
  name: "Add",
  fields: {
    id: { type: GraphQLID },
    status: { type: GraphQLString },
    date: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
  },
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      transaction: {
        type: new GraphQLList(TransactionType),
        resolve: (root, args, context, info) => {
          // we are returning all transactions
          return TransactionModel.find().exec();
        },
      },
      transactionByID: {
        type: TransactionType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLID) },
        },
        resolve: (root, args, context, info) => {
          return TransactionModel.findById(args.id).exec();
        },
      },
      transactionByStatus: {
        type: new GraphQLList(TransactionType),
        args: {
          status: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return TransactionModel.find({ status: args.status }).exec();
        },
      },
      transactionByType: {
        type: new GraphQLList(TransactionType),
        args: {
          type: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return TransactionModel.find({ type: args.type }).exec();
        },
      },
      transactionByName: {
        type: new GraphQLList(TransactionType),
        args: {
          name: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return TransactionModel.find({ name: args.name }).exec();
        },
      },
      transactionSearch: {
        type: new GraphQLList(TransactionType),
        args: {
          queryparam: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          return TransactionModel.find({
            $or: [
              { name: args.queryparam },
              { status: args.queryparam },
              { type: args.queryparam },
            ],
          }).exec();
        },
      },
    },
  }),

  //Create
  mutation: new GraphQLObjectType({
    name: "Create",
    fields: {
      transaction: {
        type: TransactionType,
        args: {
          status: { type: GraphQLString },
          date: { type: GraphQLString },
          name: { type: GraphQLString },
          type: { type: GraphQLString },
        },
        resolve: (root, args, context, info) => {
          var transaction = new TransactionModel(args);
          return transaction.save();
        },
      },
    },
  }),
});

app.use("/transaction", expressGraphQL({ schema, graphiql: true }));

app.listen(3001, () => {
  console.log("server running at 3001");
});
