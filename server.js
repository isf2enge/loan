const express = require('express');
const cors = require('cors');
const colors = require('colors');
const { json } = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const port = process.env.PORT ||  9000;

//connect with database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({origin:'http://127.0.0.1:5500'}));
app.use('/api/leilao',require('./routes/LeilaoRoutes'));
app.use('/api/ongs',require('./routes/UnidadeFilantropicaRoutes'));

app.listen(port,()=>{
    console.log(colors.bgGreen(`Server Running at ${port}`));
});



