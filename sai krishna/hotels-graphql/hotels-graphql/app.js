var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var {graphqlHTTP} = require('express-graphql');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs')
var resolvers = require('./resolvers')
const typeDefs = readFileSync(`${__dirname}/typeDefinitions.graphql`).toString()
var schema = makeExecutableSchema({typeDefs, resolvers});

const cors=require('cors')


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,  
    graphiql: true
}));



app.listen(1111,()=>{
    console.log("running graphql server")
})



module.exports = app;
