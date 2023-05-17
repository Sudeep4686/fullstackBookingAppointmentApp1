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

function updateUser(req,res) {
    const userId = req.params.id;
    User.findByPk(userId)
    .then(User =>{
        if(!User){
            console.log("ID not found");
            res.status(404).send("No ID found to update");
        }else{
            User.update({where:{id:userId}})
            .then(updateUser=>{
                console.log("updated user", updatedUser)
                res.send(updatedUser);
                console.log("user updated")
            })
            .catch(err=>{
                res.status(500).send(err);
            });

        }
    })
}

module.exports = {
    insertData: insertData,
    updateUser: updateUser
};
