import express from "express"
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull } from "graphql";
import { authors, books } from "./data.js";

const app = express();

// steps in designing GraphQL server:
// 1)import { graphqlHTTP } from "express-graphql"; and call that function in app.use() as callback, and make graphiql as true and call schema
// we will use it to send response for the query
// 2) we need to design a schema for that import data types from graphql
//3)
// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "first_call",
//         args:{arg1:{type:......} }
//         fields: (parent, args) => ({
//             message: {
//                 type: GraphQLString,
//                 resolve:()=>{return "hello world"}
//             }
//         })
//     })
// })
// note: query here is by default and name is another means to call it



// const BookType = new GraphQLObjectType({
//     name: "Book",
//     decription: "this represents the book wirtten by an author",
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         authorId: { type: GraphQLNonNull(GraphQLInt) },
//         author: {
//             type: AuthorType,
//             resolve: (book) => { return authors.find(author => author.id === book.authorId) }
//         }

//     })
// })

// const AuthorType = new GraphQLObjectType({
//     name: "Author",
//     decription: "this represents an author of the book ",
//     fields: () => ({
//         id: { type: GraphQLNonNull(GraphQLInt) },
//         name: { type: GraphQLNonNull(GraphQLString) },
//         books: {
//             type: new GraphQLList(BookType),
//             resolve: (author) => {
//                 return books.filter(item => item.authorId == author.id)
//             }
//         }

//     })
// })

// const RootQueryType = new GraphQLObjectType({
//     name: `Query`,
//     description: 'Root Query',
//     fields: () => ({
//         books: {
//             type: new GraphQLList(BookType),
//             descreption: "list of all books",
//             resolve: () => books
//         },
//         authors: {
//             type: new GraphQLList(AuthorType),
//             descreption: "list of all authors",
//             resolve: () => authors
//         },
//         author: {
//             type: AuthorType,
//             descreption: "list of single author",
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => authors.find(ele => ele.id == args.id)
//         },
//         book: {
//             type: BookType,
//             descreption: "list of single author",
//             args: {
//                 id: { type: GraphQLInt }
//             },
//             resolve: (parent, args) => books.find(ele => ele.id == args.id)
//         }

//     })
// })

// const RootMutationType = new GraphQLObjectType({
//     name: "Mutation",
//     description: "Root Mutation",
//     fields: () => ({
//         addBook: {
//             type: BookType,
//             description: "Add a book",
//             args: {
//                 name: {type: GraphQLNonNull(GraphQLString)},
//                 authorId: {type: GraphQLNonNull(GraphQLInt)},
//             },
//             resolve: (parent, args) =>{
//                 const book ={
//                     id:books.length+1, name: args.name, authorId: args.authorId
//                 }
//                 books.push(book)
//                 return book
//             }

//         },
//         addAuthor: {
//             type: AuthorType,
//             description: "Add an author",
//             args: {
//                 name: {type: GraphQLNonNull(GraphQLString)}
//             },
//             resolve: (parent, args) =>{
//                 const author ={ id:authors.length+1, name: args.name  }
//                 authors.push(author)
//                 return author
//             }

//         }
//     })
// })

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use("/graphql", graphqlHTTP({
    schema: schema, graphiql: true
}))
app.listen(8080, () => console.log("server running at 8080"))
