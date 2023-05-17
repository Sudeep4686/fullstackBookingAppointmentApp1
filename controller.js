const bodyParser = require('body-parser');
const User = require('./models/User');

async function insertData(req,res) {
    console.log(req.body, "data posting");
    if (!req.body.name || !req.body.email || !req.body.number){
        console.log("error");
        return res.status(400).send({
            message:"Please fill all the details"
        })
    }
    const obj={
        name : req.body.name,
        email : req.body.email,
        number : req.body.number
    }

    try{
        const data = await User.create(obj)
        res.redirect('/');
    
    }catch(error){
        res.status(500).send(error);
        console.log('could not send the data');
    }
}

module.exports = {insertData};

// exports.deleteUser = (req,res,next) =>{
//     const userId = req.params.id;
//     User.destroy({where : {id:userId}})
//         .then((result)=>{
//             console.log("deleted the User");
//             res.redirect('/');
//         })
//         .catch(err=> console.log(err));
// }

// app.delete('/User/delete-user/:id' , async(req,res)=>{
//     try{
//     const uId = req.params.id;
//     await User.destroy({where: {id:uId}});
//     res.sendStatus(200);
//     } catch(err){
//         res.status(500).json({
//             error:err,
//         });
//     }
// })