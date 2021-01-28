# Touring_E-commerce_backend


In this project, I have made a backend of an e-commerce website using the Express framework of NodeJS. I have also used JWT-authentication to verify if the customer is valid or not. We have already given the mysql-database in which there are different tables and their data. I have written different API’s to work each action of the user while it is calling the specific API’s. This is an E-Commerce website backend where customers can buy any product and if the company wants to add, update, delete a product or customer that can also be done. There are different Api’s which help to do the above activity.

If you don’t have mysql-server then install it in your machine by running the following commands on the terminal:) $ sudo apt-get update $ sudo apt-get install mysql-server

There is data of this site in the database in different tables named according to data stored in them, to get the database in mysql run these commands:)

There is a tshirtshop.sql file already present in the database/ folder. You have to import this file to an empty database. For this, make a new database first, and navigate to the database/ directory and then write the following commands: Import the schema using For checking the data, log into your user, You would be asked for your password. Now, you can use database with all its tables' data.

Export Schema of DB $ mysqldump -u root -p --no-data e_commerce > schema.sql

Import Schema mysql -u <user_name> -p <database_name> < tshirtshop.sql

To use this ecommerce backend You have to Install some important tools using command line : $ sudo apt-get install git $ sudo apt-get install nodejs Clone this app using the command:

$ git clone https://github.com/patel-deepak506/E-Comerce_backend.git Steps to use this backend are or to run the Project are ):- $ cd e-commerce_backend/ $ npm init or $ sudo npm install (to install all the dependencies)

Note:- before running the project change sample.env to .env file in the root directory of the project and update the required variables.

$ npm start (:- to run the server. The server will run with auto reloading using nodemon. :-) Note: Check Import Schema section under Important Commands to see how to import the tshirtshop.sql file into your DB.

Run server with Auto Reload:- $ npm start (:- This needs to be run from the root of the project.

Make sure to restart the server after adding the product,customer because the product features loads all the products and customer in memory to load the customer or product. If you don't restart the server, then it will keep on products or customers from the old database memory. You can always kill your running port by writing, $ sudo killall -9 node (:- on the terminal. Now, you need to install postman, that helps you to develop APIs and getting responses from it, by writing the following commands on your terminal. 
