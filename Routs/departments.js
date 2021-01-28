
module.exports = ((knex,app)=>{
    //for get all departments
    app.get('/department',(req,res)=>{
        knex.select('*').from('department')
        .then(data=>{
            if (data.length != 0){
                res.send(data)
            }
            else{
                res.send("there are no one department ")
            }
        })
        .catch(err=>{
            console.log(err);
            res.send(err)
        });
    });

    //Get departmentByid

    app.get('/department/:id',(req,res)=>{
        knex.select('*').from('department')
        .where({department_id:req.params.id}).then(data=>{
            if (data.length !=0){
                res.send(data);
            }
            else{
                res.send("there are no one department ");
                
            }
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
    });

});
