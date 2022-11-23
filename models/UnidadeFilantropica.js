const mongoose = require('mongoose');
mongoose.set('debug',true);
mongoose.pluralize(false);

const Endereco = mongoose.Schema({
    _id:false,
    logradouro:{type:String,required:[true,' Favor, especificar o logradouro do Endereço']},
    numero:{type:Number,required:[true,' Favor, especificar o número do Endereço']},
    cep:{type:String,required:[true,' Favor, especificar o CEP do Endereço']},
    complemento:{type:String}


})

const unidadeFilantropicaSchema = mongoose.Schema({
    nome:{type:String, required:[true, 'Favor, inserir o nome da Unidade Filantropica.']},
    cnpj:{type:String, required:[true, 'Favor, inserir o CNPJ da Unidade Filantropica']},
    descricao:{type:String},
    endereco:{type:Endereco, required:[true]}
    
});

const UnidadeFilantropica = mongoose.model('UnidadeFilantropica', unidadeFilantropicaSchema);

module.exports = UnidadeFilantropica;