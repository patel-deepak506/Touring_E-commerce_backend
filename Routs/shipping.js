
module.exports = (knex ,shipping)=>{

    //Return shippings regions
    shipping.get('/shipping/regions',(req,res)=>{
        knex.select('*').from('shipping')
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })

    });

    //Return shippings regions

    shipping.get('/shipping/regions/:shipping_region_id',(req,res)=>{
        knex.select('*').from('shipping')
        .where('shipping_region_id',req.params.shipping_region_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });

    });

};