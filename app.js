const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const controller = require('./controller');

const sequelize = require('./util/database');

const User = require('./models/User');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

app.use(express.static(path.join(__dirname, 'public')));

sequelize.sync()
    .then(()=>{
        console.log('details synchronised with database');
    })
    .catch((error)=>{
        console.log("failed to sync the data with the database");
    });

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,'views', 'form.html'));
});


app.post('/submit-form', controller.insertData);

app.get('/users',async (req,res)=>{
    try{
        const users = await User.findAll();
        console.log(users, 'data is found');
        res.status(200).send(users);
    }catch(err) {
        console.log(err,"Error is found here");
        res.status(500).send('Something went Wrong');
    };
});

app.delete('/User/delete-user/:id' , async(req,res)=>{
    try{
    const userId = req.params.id;
    await User.destroy({where: {id:userId}});
    res.json({message: "User deleted successfully"});
    } catch(err){
        res.sendStatus(500).json({
            error:err,
        });
    }
})

app.put('/User/update-user/:id', controller.updateUser);

// app.put('/User/update-user/:id', async(req,res)=>{
//     try{
//         const userId = req.params.id;
//         // res.json({message:"User updated successfully"});
//         res.redirect(`/users/`+id);
//         }catch(err){
//             console.log(err.message);
//         }
// })

User.sync({force:false})
.then(cb=>{
    app.listen(3020);
})
.catch(err=>{
    console.log(err.message);
})
