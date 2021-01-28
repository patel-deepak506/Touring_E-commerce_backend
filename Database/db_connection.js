const knex =require('knex');

module.exports = knex({
    client:'mysql',
    connection:{
        host:'localhost',
        user:'root',
        password:'Deepak@20',
        database:'turing'
    }
},
console.log("database has been joined"));