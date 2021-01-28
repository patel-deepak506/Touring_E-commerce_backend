const knex = require('../Database/db_connection')

module.exports = (knex,category)=>{

    //Getting  all data for category

    category.get('/category',(req,res)=>{
        console.log("hiiii");
        knex.select('*').from("category").then(data=>{
                res.send(data);
                console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });

    //Getting data by category_id
    category.get('/category/:category_id',(req,res)=>{
        knex.select('*') .from('category')
        .where('category_id',req.params.category_id).then(data=>{
            console.log(data);
            res.send(data);
        })
        .catch(err=>{
            console.log(err)
            res.send(err)
        });
    })

    //getting data by product_id
    category.get('/category/inProduct/:product_id',(req,res)=>{
        knex.from('category')
        .innerJoin('product_category', 'category.category_id','product_category.product_id')
        .select('name','category.category_id','category.department_id')
        .where('product_id',req.params.product_id)
        .then(data=>{
            res.send(data)
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });
    
    //getting data by department_id

    category.get('/category/inDepartment/:department_id',(req,res)=>{
        knex.from('category')
        .innerJoin('department','category.department_id','department.department_id')
        .select('category.category_id','category.department_id','category.description','category.name')
        .where('category.department_id',req.params.department_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });

};