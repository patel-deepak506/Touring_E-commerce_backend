const jwt = require('jsonwebtoken');
const shoppingcart = require('./shoppingcart');

module.exports = (knex , order)=>{

    // Insert orders/Create a Order
    order.post('/orders/:email',(req,res)=>{
        var token = req.headers.cookie;
        var list = token.split(";").reverse();
        var tokens = list[0].trim().slice(0,-10);
        var decoded = jwt.verify(tokens,'deepakpatel');

        knex.select("*").from("customer")
        .where("email",req.params.email)
        .then((data)=>{
            // console.log(data[0].customer_id);
            knex.select("*").from("shopping_cart")
            .join("product",function(){
                this.on("shopping_cart.product_id","=","product.product_id")
            })
            .where('shopping_cart.cart_id',req.body.cart_id)
            .then((data1)=>{
                // console.log("data1",data1);
                var add_data = {
                    "total_amount":data1[0].price*data1[0].quantity,
                    "created_on":new Date(),
                    "customer_id":data[0].customer_id,
                    "shipping_id":req.body.shipping_id,
                    "tax_id":req.body.tax_id
                }
                knex("orders").insert(add_data)
                .then((data2)=>{
                    // console.log("data2",data2[0]);
                    knex("order_detail").insert({
                        "order_id":data2[0],
                        "product_id":data1[0].product_id,
                        "attributes":data1[0].attributes,
                        "product_name":data1[0].name,
                        "quantity":data1[0].quantity,
                        "unit_cost":data1[0].price
                    }).then(()=>{
                        res.send("order successfuly created..!");
                        console.log("order successfuly created..!");
                    }).catch((ar)=>{
                        console.log(ar);
                    })
                })
            }).catch((err)=>{
                console.log(err);
            })
        }).catch((err)=>{
            console.log(err);
        });
    });

    //Get Info about Order
    order.get("/orders/:order_id",(req,res)=>{
        knex("orders")
        .innerJoin('shopping_cart','orders.cart_id','shopping_cart.cart_id')
        .innerJoin('product',"shopping_cart.product_id","product.product_id")
        .where("orders.order_id",req.params.order_id)
        .then((data)=>{
            var data1 = {
                "item_id":data[0].item_id,
                "order_id":data[0].order_id,
                "product_id":data[0].product_id,
                "attributes":data[0].attributes,
                "product_name":data[0].product_name,
                "quantity":data[0].quantity,
                "unit_cost":data[0].unit_cost,
                "total_amount":data[0].quantity*data[0].unit_cost
            }
            res.send(data1);
            console.log(data1);
        }).catch((err)=>{
            console.log(err);
        })
    })

    // orders in_Customer
    // get order by customer


    order.get("/order/:email",(req,res)=>{
        knex("orders")
        .join('customer','customer.customer_id','orders.customer_id')
        .where('customer.email',req.params.email)
        .then((ordersData)=>{
            if (ordersData.length != 0) {
                return res.send(ordersData)
            }
            res.status(400).send({
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
            })
        })
        .catch((ar)=>{
            console.log(ar);
        })
    })


    // get information about ordersData

    order.get("/orders/shortDetail/:order_id",(req,res)=>{
        knex("orders")
        .join('order_detail','order_detail.order_id','orders.order_id')
        .where('orders.order_id',req.params.order_id)
        .select("orders.order_id","orders.total_amount","orders.shipped_on","orders.status","order_detail.product_name as name",
        "orders.created_on")
        .then((data)=>{
            if(data.length!=0){
                res.send(data[0]);
                console.log(data[0]);
            }
            res.status(400).send({
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
            })
            
        }).catch((er)=>{
            console.log(er);
        })
    })


    
}