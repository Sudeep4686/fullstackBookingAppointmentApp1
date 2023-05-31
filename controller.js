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

async function editUser(req,res){
    try{
        const {name,email,number} = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user){
            return res.status(404).send({message:'User not found'});
        }
        user.name = name;
        user.email = email;
        user.number = number;
        await user.save();

        res.send({message:"User updated successfully",user});
    }catch(error){
        console.log(error);
        res.status(500).send({message : "Error updating user in backend." });
    }
    
}

module.exports = {
    insertData: insertData,
    editUser: editUser
};
