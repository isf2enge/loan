const mongoose  = require('mongoose');
mongoose.set('debug', true);
mongoose.pluralize(null);


const usuario = new mongoose.Schema({
    nome:{type:String, required:[true,'Favor, inserir o nome do Usuário.']},
    login:{type:String, required:[true]},
    senha:{type:String, required:[true]},
    email:{type:String,required:[true]},
    data_hora:{type:Date, default: Date.now},
    status:{type:String, required:[true], default:'a'}
});

const Usuario = mongoose.model("usuario",usuario);