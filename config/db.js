const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/leilao_teste');
        console.log(`MongoDB Connect: ${conn.connection.host}`.cyan.underline);
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;