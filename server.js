const express = require('express');
const Knex = require('./Database/db_connection');
const app = express();
app.use(express.json())

const router = require('./connection/path')

app.use(router)
// app.use(express.json());
app.listen(2000,()=>{
    console.log(" port is running ");
})
