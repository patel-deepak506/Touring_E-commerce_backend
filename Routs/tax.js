
module.exports = (knex , tax)=>{


    //Get All Taxe

    tax.get('/tax',(req,res)=>{
        knex.select('*').from('tax')
        .then(data=>{
            res.send(data);
            console.log(data);
 })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });

    //Get data from tax_id
    tax.get('/tax/:tax_id',(req,res)=>{
        knex.select('*').from('tax')
        .where('tax_id',req.params.tax_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            console.log(err);
        })
    })
};