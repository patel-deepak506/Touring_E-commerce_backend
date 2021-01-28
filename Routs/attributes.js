module.exports = (knex , attribute)=>{

    //for getting data form attributes table
    attribute.get('/attributes',(req,res)=>{
        knex.select("*").from("attribute")
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        })
    })

    //for getting data by attribute_id  

    attribute.get('/attributes/:attribute_id',(req,res)=>{
        knex.select('*') .from("attribute")
        .where('attribute_id',req.params.attribute_id)
        .then(data=>{
            res.send(data)
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });


    //Getting data from value by attribute_id

    attribute.get('/attributes/values/:attribute_id',(req,res)=>{
        knex.select('value','attribute_id').from('attribute_value')
        .where('attribute_id' ,req.params.attribute_id)
        .then(data=>{
            console.log(data);
            res.send(data)
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });

    });

    // Getting data from all attributes by product_id

    attribute.get('/attributes/inProduct/:product_id',(req,res)=>{
        knex.from('product_attribute')
        .innerJoin('attribute_value','product_attribute.attribute_value_id','attribute_value.attribute_value_id')
        .innerJoin('attribute','attribute_value.attribute_id','attribute.attribute_id')
        .select('attribute_value.attribute_value_id','attribute_value.value','attribute.name')
        .where('product_id',req.params.product_id)
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