const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

// dotenv config
dotenv.config({path:'./config/config.env'});

// Mongoose Connection
const connectDB = require('./config/db');
connectDB();

const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV === 'development')
    app.use(morgan('dev'));

// Router Config
app.use('/api/v1/transactions',require('./routes/transactions'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client/build/index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server up and running in ${process.env.NODE_ENV} on port : ${PORT}`.yellow.bold);
})