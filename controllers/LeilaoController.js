const asyncHandler = require('express-async-handler');
const Leilao = require('../models/Leilao');
const colors = require('colors');

// @desc Listar Produtos
// @route GET /api/leilao/produtos
// @access private
const listarLeilao = asyncHandler(async (req,res)=>{
    const listaDeLeiloes = await leilao.find();
    console.log(colors.bgBlue(listaDeLeiloes));
    res.status(200).json(listaDeLeiloes);
});


// @desc Salvar Produto
// @route POST /api/leilao/produtos
// @access private
const salvarLeilao = asyncHandler(async (req,res)=>{
    console.log(colors.bgWhite(req.body));
    const leilao = new Leilao(req.body);
    console.log('Leilao '+colors.green(leilao));

    await leilao.save((err)=>{
       if(err){
        res.status(500).send({message:`${err.message} - falha ao registrar Produto.`});
            } else{
                res.status(201).send(leilao.toJSON());
            }
    })  
});

// @desc Atualizar Produto
// @route PUT /api/leilao/produtos/id
// @access private
const atualizarLeilao = asyncHandler(async (req,res)=>{
   
    const filter = {_id:req.params.id};
    const update = {
    "produto.nome": req.body.nomeProduto,
    "produto.descricao":req.body.descricaoProduto,
    "categoria.nome":req.body.nomeCategoria,
    "valor_inicial":req.body.valorInicialLeilao
}
    const leilao = await Leilao.findOne(filter);
    console.log('produto '+leilao["produto"].categoria.nome);
    leilao["produto"].nome = req.body.nomeProduto;
    leilao["produto"].descricao = req.body.descricaoProduto;
    leilao["produto"].categoria.nome = req.body.nomeCategoria;
    leilao.valor_inicial = req.body.valorInicialLeilao;

    leilao.save();
    console.log('efetuar leilão '+leilao);    
    res.status(200).json(leilao);

});

// @desc Pegar Produto por Id
// @route GET /api/leilao/produtos/id
// @access private
const pegaLeilaoId = asyncHandler(async (req,res)=>{
    const id = req.params.id;
    Leilao.findById(id,(err,leilaoResult)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }
        res.status(200).send(leilaoResult); 
    });
  
    
});

// @desc Remover Produto
// @route DELETE /api/leilao/produtos/id
// @access private

const removerLeilao = asyncHandler(async (req,res)=>{
    console.log('id '+req.params.id);
    const leilao = await leilao.findOneAndDelete({_id:req.params.id});

    if(!leilao){
        res.status(400).send({message:'Operation not executed. Produto not found.'});
    }else{
    res.status(200).send(leilao);
}
});

const efetuarLance = asyncHandler(async(req,res)=>{
    const filter = {_id:req.params.id};
   // console.log('ID Lance '+req.params.id);
    let update = {"email":req.body.email, "valor_lance":req.body.valor_lance}
    //console.log('UPDATE '+JSON.stringify(update));
    const atualizaLeilao = await Leilao.findOne(filter);
   
    //console.log('atualiza leilao '+JSON.stringify(atualizaLeilao.lances));
    if(atualizaLeilao.lances!==null){
        console.log('lenght '+atualizaLeilao.lances.length);
   if(atualizaLeilao.lances.length > 0){
        for(let i=0;i < atualizaLeilao.lances.length;i++){
            const l = atualizaLeilao.lances[i];
            if(req.body.email === l.email){                
            l.valor_lance = req.body.valor_lance;
             console.log("Atualiza valor do lance: "+JSON.stringify(l));
              break;
            }   
            
        }
    //   console.log("update "+JSON.stringify(update));        
    }else if(atualizaLeilao.lances.length == 0){
        console.log("Primeiro Lance "+JSON.stringify(update));        
       // atualizaLeilao.lances.push(update);


    }
    //atualizaLeilao.save();

    console.log('fim');
     
    }
   // console.log('update operation '+update.valor_lance);
  
    //console.log('efetuar leilão '+atualizaLeilao.lances);    
    res.status(200).json(atualizaLeilao);
});


module.exports = {listarLeilao, salvarLeilao,atualizarLeilao,pegaLeilaoId,removerLeilao,efetuarLance}