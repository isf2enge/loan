const asyncHandler = require('express-async-handler');
const UnidadeFilantropica = require('../models/UnidadeFilantropica');
const colors = require('colors');

// @desc Listar ONGS
// @route GET /api/leilao/unidades-filantropicas
// @access private
const listarUnidadesFilantropicas = asyncHandler(async (req,res)=>{
    const listaDeUnidadesFilantropicas = await UnidadeFilantropica.find();
    console.log(colors.bgBlue(listaDeUnidadesFilantropicas));
    res.status(200).send(listaDeUnidadesFilantropicas);
});


const salvarUnidadeFilantropica = asyncHandler(async (req,res)=>{
    const unidadeFilantropica = new UnidadeFilantropica(req.body);

    await unidadeFilantropica.save((err)=>{
        if(err){
            res.status(500).send({message:`${err.message} - falha ao registrar ONG`})
        } else{
            res.status(201).send(unidadeFilantropica.toJSON());
        }
    })
});


// @desc Atualizar ONG
// @route PUT /api/ong/id
// @access private
const atualizarUnidadeFilantropoca = asyncHandler(async(req, res)=>{
    const filter = {_id:req.params.id};
    console.log(filter.bgBlue);
    const ong  = await UnidadeFilantropica.findById(filter);
    ong["nome"] = req.body.nome;
    ong["cnpj"] = req.body.cnpj;
    ong["descricao"] = req.body.descricao;
    ong["endereco"]["logradouro"] = req.body.endereco.logradouro;
    ong["endereco"]["numero"] = req.body.endereco.numero,
   ong["endereco"]["cep"] = req.body.endereco.cep,
   ong["endereco"]["complemento"] = req.body.endereco.complemento
    ong.save();
    res.status(200).send(ong);
    }
);

module.exports = {listarUnidadesFilantropicas,salvarUnidadeFilantropica,atualizarUnidadeFilantropoca}