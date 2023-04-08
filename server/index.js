const express=require('express');
const cors=require('cors');
const path=require('path');
const dotenv=require('dotenv');
const bodyparser=require('body-parser');
const db=require('./db/db');
const multer=require('multer')
const registerRoutes=require('./routes/users');
const authRoutes=require('./routes/auth');
const passwordresetRoutes=require('./routes/passwordreset');
const profileroutes=require('./routes/profile');
dotenv.config();
//database connection
db();

//configurations

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));

app.use('/assests',express.static(path.join(__dirname,"public/assests")));

// file upload route
const storage =multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"public/assests");
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage});

//routes
app.use('/api/users',upload.single("picture"),registerRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/password-reset", passwordresetRoutes);
app.use('/api/profile/:id',profileroutes);
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));