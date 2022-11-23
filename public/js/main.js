function inserirLinha(produto){
let  nomeProduto =   document.querySelector(".produto-nome");
let  descricaoProduto =   document.querySelector(".produto-descricao");
let  precoProduto =   document.querySelector(".produto-preco");

//inserir valores nas linhas

nomeProduto.textContent = produto.nome;
descricaoProduto.textContent = produto.descricao;
precoProduto.textContent = produto.preco;

console.log("Produto "+JSON.stringify(produto));

}

function listarProdutos(){
    fetch("http://localhost:8000/api/leilao/produtos/")
    .then(response=>  response.json())
    .then(produtos=>
        {
            produtos.forEach(produto => {
                inserirLinha(produto);
            });
        }
        )
}

 listarProdutos();

