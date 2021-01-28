const knex = require('knex');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

module.exports = (knex , customer)=>{
    // ragister user/customer

    customer.post('/customers',(req,res)=>{
        const{name,email,password} = req.body;
        knex('customer').insert({name:name,email:email,password:password})
        .then(data=>{
            let token = jwt.sign({'email':email},'deepakpatel',{expiresIn:'24h'});
            console.log(token);
            res.cookie(token);
            res.send(token);

        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

    //Login user/customer

    customer.post('/customers/login',(req,res)=>{
        // let toke = req.headers.cookie
        // console.log(toke);
        knex.select("*").from('customer').where('email',req.body.email)
        .then(data=>{
            if (data[0].password == req.body.password){
                res.send("logIn successful.");
                console.log("logIn successful..");
                console.log(data);
                // res.status('404').send("customer",toke);
            }else{
                console.log("there are some issue in email or password");
                res.send("there are some issue in email or password")
            }
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        })
    })

    //getting data  by id  get data by token

    customer.get('/customers/get',(req,res)=>{
        var token = req.headers.cookie
        var list = token.split(";").reverse()
        var tokens = list[0].trim().slice(0,-10)
        var decoded = jwt.verify(tokens,'deepakpatel')
        knex.select('*').from('customer').where({"email":decoded.email})
        .then(data=>{
            if (data.length!=0){
                res.send(data)
                console.log(" user login successful");
            }
            else{
                console.log("your email didn't match token ");
                res.send('your email didnot match token')
            }
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    })

    // update customer details
    customer.put('/customer',(req,res)=>{
        var token = req.headers.cookie
        var list = token.split(";").reverse()
        var tokens = list[0].trim().slice(0,-10)
        var decoded = jwt.verify(tokens,'deepakpatel')
        knex('customer')
        .update({
            'name':req.body.name,
            'email':req.body.email,
            'mob_phone':req.body.mob_phone,
            'day_phone':req.body.day_phone,
            'password':req.body.password,
            'eve_phone':req.body.eve_phone
        }).where('customer.email',decoded.email)
        .then(data=>{
            res.send('custtomer successful updated')
            console.log('custtomer successful updated');
        })
        .catch(err=>{
            console.log(err);
        });        
    });

    //update customer's address 

    customer.put('/customers/address',(req,res)=>{
        knex('customer')
        .update({
            "address_1":req.body.address_1,
            "email":req.body.email,
            "address_2":req.body.address_2,
            "city":req.body.city,
            "country":req.body.country,
            "region":req.body.region,
            "postal_code":req.body.postal_code,
            "shipping_region_id":req.body.shipping_region_id
        })
        .where("customer.email",req.body.email)
        .then(data=>{
            res.send("address had been update successful")
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });
    
    // update customer's creadiCard

    customer.put('/customers/creditCard',(req,res)=>{
        knex('customer')
        .update({credit_card:req.body.credit_card,email:req.body.email})
        .where('customer.email',req.body.email)
        .then(data=>{
            res.send("creditCard has been successful updated")
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

 
};