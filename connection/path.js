const express = require('express');
const router = express.Router();
const knex = require('../Database/db_connection');

// Here are the routes/path for Departments API
require('../Routs/departments')(knex,router)

// Here are the routes/path for Category API
require('../Routs/categories')(knex,router)

// Here are the routes/path for attributes API

require('../Routs/attributes')(knex,router)

// Here are the routes/path for  products API
require('../Routs/products')(knex,router)

// Here are the routes/path for customers API
require('../Routs/customers')(knex,router)

// Here are the routes/path for shoppingcart API
require('../Routs/shoppingcart')(knex,router)

// Here are the routes/path for orders API
require('../Routs/orders')(knex , router)

// Here are the routes/path for shipping API
require('../Routs/shipping')(knex,router)

// Here are the routes/path for tax API
require('../Routs/tax')(knex , router)


//For sending file to another file 
module.exports = router;