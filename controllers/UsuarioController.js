const asyncHandler = require('express-async-handler')
const Usuario = require('../models/Usuario')
const colors = require('colors')

// @desc Listar Usuarios
// @route GET /api/leilao/usuarios
// @access private

const listarUsuarios = asyncHandler(async (req,res)=>{
    const listaDeUsuarios = await Usuario.find();
    console.log(colors.bgBlue(listaDeUsuarios));
    res.status(200).send(listaDeUsuarios);
});

// Salvar
const salvarUsuarios = asyncHandler(async (req,res)=>{
    const usuario = new Usuario(req.body);

    await usuario.save((err)=>{
        if(err){
            res.status(500).send({message:`${err.message} - falha ao registrar usuario`})
        } else{
            res.status(201).send(usuario.toJSON());
        }
    })
});


// @desc Atualizar Usuario
// @access private
const atualizarUsuario = asyncHandler(async(req, res)=>{
    const filter = {_id:req.params.id};
    console.log(filter.bgBlue);
    const user = await Usuario.findById(filter);
    user["nome"] = req.body.nome;
    user["login"] = req.body.login;
    user["senha"] = req.body.senha;
   user["email"] = req.body.email;
    user["data_hora"] = req.body.data_hora;
   user["status"] = req.body.status;
    user.save();
    res.status(200).send(user);
    }
);

module.exports = {listarUsuarios,salvarUsuarios,atualizarUsuario}


