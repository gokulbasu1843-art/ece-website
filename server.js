
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

// =========================
// MONGODB CONNECTION
// =========================

mongoose.connect(
"mongodb://gb600018_db_user:gokul1843@ac-angnuyx-shard-00-00.pe2v4qq.mongodb.net:27017,ac-angnuyx-shard-00-01.pe2v4qq.mongodb.net:27017,ac-angnuyx-shard-00-02.pe2v4qq.mongodb.net:27017/?ssl=true&replicaSet=atlas-rkpqei-shard-0&authSource=admin&appName=ecewebsite"
)

.then(() => {

    console.log("MongoDB Connected ✅");

})

.catch((err) => {

    console.log(err);

});

// =========================
// USER SCHEMA
// =========================

const userSchema = new mongoose.Schema({

    name:String,

    email:String,

    password:String

});


// =========================
// USER MODEL
// =========================

const User = mongoose.model(
    "User",
    userSchema
);

// ======================
// ADMIN DATA
// ======================

const ADMIN_EMAIL =
"admin@ece.com";

const ADMIN_PASSWORD =
"eceadmin123";
// =========================
// REGISTER API
// =========================

app.post("/register", async(req,res)=>{

    try{

        console.log(req.body);

        const user = new User({

            name:req.body.name,

            email:req.body.email,

            password:req.body.password

        });

        await user.save();

        res.json({

            success:true,

            message:
            "Account Created Successfully"

        });

    }

    catch(error){

        console.log(error);

        res.json({

            success:false,

            message:error.message

        });

    }

});


// =========================
// GET USERS API
// =========================

app.get("/users", async(req,res)=>{

    try{

        const users =
        await User.find();

        res.json(users);

    }

    catch(error){

        console.log(error);

        res.json([]);

    }

});

// ======================
// ADMIN LOGIN API
// ======================

app.post("/admin-login",(req,res)=>{

    const {

        email,
        password

    } = req.body;

    if(

        email === ADMIN_EMAIL &&

        password === ADMIN_PASSWORD

    ){

        res.json({

            success:true

        });

    }

    else{

        res.json({

            success:false,

            message:"Invalid Admin Login"

        });

    }

});
// =========================
// START SERVER
// =========================

app.listen(3000, ()=>{

    console.log(
        "Server Running On Port 3000 🚀"
    );

});