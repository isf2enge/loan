const mongoose  = require('mongoose');
mongoose.set('debug', true);
mongoose.pluralize(null);

const lance = new mongoose.Schema({_id:false,
    email:{type:String},
    valor_lance:{type:mongoose.Schema.Types.Decimal128,required:[true]},
    data_hora:{type:Date}
});

const categoria = new mongoose.Schema({_id:false,
    nome:{type:String, required:[true,'Favor, inserir o nome da Categoria.']},
    descricao:{type:String}
});

const produto = new mongoose.Schema({_id:false,
    nome:{type:String,  required:[true,'Favor, inserir o nome do Produto.']},
    descricao: {type:String, required:[true,'Favor inserir a descrição do produto.']},
    categoria:categoria
});

const LeilaoSchema = mongoose.Schema({
    id_usuario:{type:mongoose.Schema.Types.ObjectId},
    produto:produto,
    valor_inicial:{type:mongoose.Schema.Types.Decimal128},
    lances:[lance],             
    data_registro:{type:Date,default:Date.now},
    data_final:{type:Date},
    status:{type:String,default:'a'}
    },
{
    versionKey:false
});

const Leilao = mongoose.model('Leilao',LeilaoSchema);

module.exports = Leilao;