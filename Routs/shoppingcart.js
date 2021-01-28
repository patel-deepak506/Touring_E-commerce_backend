const shortid = require('shortid');

module.exports = (knex , shoppingcart)=>{

    //Generate unique id 

    shoppingcart.get('/shoppingcart/generateUniqueId',(req,res)=>{
        const id = require('shortid');
        const shortid = id.generate();
        console.log(shortid);
        res.send(shortid);
    });

    //Add a Product in the cart

    shoppingcart.post('/shoppingcart/add',(req,res)=>{
        const{cart_id,product_id,attributes,quantity} = req.body
        knex('shopping_cart')
        .insert({cart_id:cart_id,product_id:product_id,
        attributes:attributes,added_on:new Date(),quantity:quantity})
        .where('cart_id',cart_id)
        .then(data=>{
            knex('shopping_cart')
            .innerJoin('product','shopping_cart.product_id','product.product_id')
            .select('shopping_cart.item_id','shopping_cart.product_id','shopping_cart.attributes',
            'shopping_cart.quantity','product.image','product.name','product.price')
            .where('shopping_cart.product_id',product_id)
            .then(value=>{
                const total = (value[0].price)*(value[0].quantity);
                value[0]['totel']= total;
                res.send(value)
            })
            .catch(e=>{
                console.log(e);
                res.send(e);
            });

        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });


    // Get List of Products in Shopping Cart
    shoppingcart.get('/shoppingcart/:cart_id',(req,res)=>{
        knex('shopping_cart')
        .innerJoin('product','shopping_cart.product_id','product.product_id')
        .select('shopping_cart.item_id','shopping_cart.product_id','shopping_cart.attributes',
        'shopping_cart.quantity','product.image','product.name','product.price')
        .where('cart_id',req.params.cart_id)
        .then(value=>{
            const total = (value[0].price)*(value[0].quantity);
            value[0]['totel']= total;
            res.send(value)
            console.log(value);
            console.log("getting cart_id successful");
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });

    });


    //Update the cart by item
    shoppingcart.put('/shoppingcart/:item_id',(req,res)=>{
        knex('shopping_cart')
        .update({'quantity':req.body.quantity})
        .where('shopping_cart.item_id',req.params.item_id)
        .then(data=>{
            knex('shopping_cart')
            .innerJoin('product','shopping_cart.product_id','product.product_id')
            .select('shopping_cart.item_id','shopping_cart.product_id','shopping_cart.attributes',
            'shopping_cart.quantity','product.image','product.name','product.price')
            .where('shopping_cart.item_id', req.params.item_id)
            .then(value=>{
                const total = (value[0].price)*(value[0].quantity);
                value[0]['total']= total
                res.send(value)
            })
            .catch(err=>{
                console.log(err);
                res.send(err);
            })
        })
        .catch(error=>{
            console.log(error);
            res.send(error)
        });
    });

    // delete cart/empty cart
    shoppingcart.delete('/shoppingcart/empty/:cart_id',(req,res)=>{
        knex('shopping_cart')
        .where('shopping_cart.cart_id',req.params.cart_id)
        .delete()
        .then(data=>{
            res.send(data);
            console.log('delete successfully cart');
        })
        .catch(err=>{
            console.log(err);
        });
    });


    //Move a product to cart
    shoppingcart.get('/shoppingcart/totalAmount/:cart_id',(req,res)=>{
        knex('shopping_cart')
        .innerJoin('product','shopping_cart.product_id','product.product_id')
        .select("product.price",'shopping_cart.quantity')
        .where('shopping_cart.cart_id',req.params.cart_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });

    });
    

    //Save a Product for latter
    shoppingcart.get('/shoppingcart/saveForLater/:item_id',(req,res)=>{
        knex('shopping_cart')
        .innerJoin('product','shopping_cart.product_id','product.product_id')
        .select('shopping_cart.product_id',
                'shopping_cart.attributes',
                'shopping_cart.quantity',
                'shopping_cart.cart_id',
                'shopping_cart.item_id',
                'product.name',
                'product.price'

        )
        .where('shopping_cart.item_id', req.params.item_id)
        .then(data=>{
            if (data.length!=0){
                const later = data[0];
                knex('to_stirng')
                .insert(later)
                .where('shopping_cart.item_id',req.params.item_id)
                .then(value=>{
                    res.send(value);
                    console.log("data store successful");
                })
                .catch(e=>{
                    console.log(e);
                    res.send(e)
                })
            }
            else{
                console.log("there are no data in that field ");
            }

        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });


    //Get Products saved for latter
    shoppingcart.get('/shoppingcart/getSeved/:cart_id',(req,res)=>{
        knex.select('to_stirng.name','to_stirng.price','to_stirng.attributes','to_stirng.item_id')
        .from('to_stirng')
        .where('to_stirng.cart_id',req.params.cart_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });


    //Remove a product in the cart
    shoppingcart.get('/shoppingcart/removeProduct/:item_id',(req,res)=>{
        knex('to_stirng')
        .where('to_stirng.item_id',req.params.item_id)
        .delete()
        .then(data=>{
            res.send('data successful deleted')
            console.log(('data has been deleted'));
        })
        .catch(err=>{
            console.log(err);
            res.send(er)
        });
    });

};