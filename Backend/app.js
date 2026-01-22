const express=require('express')
const app=express();
const dotenv=require('dotenv')
const cors=require('cors');
const cookieParser=require("cookie-parser")
dotenv.config();
const connectToDb=require("./db/db")
const userRoutes=require("./routes/user.route")


connectToDb()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hello World");

});

app.use("/users",userRoutes);


module.exports=app;

