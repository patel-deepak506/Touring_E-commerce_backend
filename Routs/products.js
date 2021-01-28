module.exports = (knex , product)=>{

    //for getting all data form products
    product.get('/products',(req,res)=>{
        knex.select('*').from('product').then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

    //for getting data by serch
    product.get('/products/:serch',(req,res)=>{
        knex.select('name','product_id','description ').from('product')
        .where('name','like','%', req.params.serch,'%')
        .orWhere('product_id',req.params.serch)
        .then(data=>{
            res.send(data)
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

   // Getting data from product by product_id

   product.get('products/:product_id',(req,res)=>{
        knex.select('*').from('product')
        .where('product_id',req.params.product_id)
        .then(data=>{
           res.send(data)
           console.log(data);   
       })
       .catch(err=>{
           console.log(err);
           res.send(err);
       });
   });
   
   //getting data from product_category by catergory_id

    product.get('/products/inCategory/:category_id',(req,res)=>{
        knex.from('product_category')
        .innerJoin('product','product_category.product_id',' product.product_id')
        .select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail')
        .where('category_id',req.params.category_id)
        .then(data=>{
           res.send(data);
           console.log(data);
       })
        .catch(err=>{
           console.log(err);
           res.send(err)
       });
    });


    //for Getting data form product_department

    product.get('/products/inDepartment/:department_id',(req,res)=>{
        console.log('hiiiii');
        knex.from('category')
        .innerJoin('product_category','category.category_id','product_category.category_id')
        .innerJoin('product','product_category.product_id','product.product_id')
        .select('product.product_id','product.name','product.description','product.price','product.discounted_price','product.thumbnail')
        .where('department_id',req.params.department_id)
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

    //for Getting data product by product_id of details.

    product.get('/products/:product_id/details',(req,res)=>{
        knex.select('product.product_id','product.name','product.price','product.image',
        'product.image2','product.discounted_prise','product.thumbnail')
        .from('product')
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

    // Getting data  for product by product_id of location.

    product.get('/products/:product_id/location',(req,res)=>{
        knex.from('product_category')
        .innerJoin('category','product_category.category_id','category.category_id')
        .innerJoin('department','category.department_id','department.department_id')
        .select('category.category_id','category.name as category_name',
        'category.department_id',"department.name as department_name")
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

    //Getting data from product by product_id of reviews
    product.get('/products/:product_id/review',(req,res)=>{
        console.log('hiii');  
        knex.select('review','rating','created_on').from('review')
        .join('product','product.product_id','=','review.product_id')
        .where('review.product_id',req.params.product_id)
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