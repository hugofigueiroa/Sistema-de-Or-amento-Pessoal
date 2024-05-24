// Criando a clase Despesa ; 

class Despesa {
    
    // Construtor ; 

    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano ; 
        this.mes = mes ; 
        this.dia = dia ; 
        this.tipo = tipo ; 
        this.descricao = descricao ; 
        this.valor = valor ; 
    }

    // Função que irá validar se os dados estão corretos antes de gravar no Local Storage ; 

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false ; 
            }
        }
        return true ; 
    }
}

// Criando a função de cadastrar despesa, que instanciarar um objeto do tipo: "Despesa" ; 

function cadastrarDespesa() {
    let ano = document.getElementById("ano"); // Recuperando o ano da despesa cadastrada pelo usuário ; 
    let mes = document.getElementById("mes"); // Recuperando o mês da despesa cadastrada pelo usuário ; 
    let dia = document.getElementById("dia"); // Recuperando o dia da despesa cadastrada pelo usuário ; 
    let tipo = document.getElementById("tipo"); // Recuperando o tipo da despesa cadastrada pelo usuário ; 
    let descricao = document.getElementById("descricao"); // Recuperando a descrição da despesa cadastrada pelo usuário ; 
    let valor = document.getElementById("valor"); // Recuperando o valor da despesa cadastrada pelo usuário ; 

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value) ; // Intanciando um objeto do tipo: "Despesa" ; 

    if(despesa.validarDados()) {

        bd.gravar(despesa) ; // Gravando a despesa no Local Storage ; 

        document.getElementById("modal_titulo").innerHTML = "Registro inserido com sucesso" ; // Inserindo o título do modal que será exibido ao usuário quando inserir uma despesa com sucesso ;
        document.getElementById("modal_titulo_div").className = "modal-header text-success" // Inserindo a classe do modal que será exibido ao usuário quando inserir uma despesa com sucesso ;
        document.getElementById("modal_conteudo").innerHTML = "Despesa foi cadastrada com sucesso!" ; // Inserindo o texto do modal que será exibido ao usuário quando inserir uma despesa com sucesso ;
        document.getElementById("modal_btn").innerHTML = "Voltar" ; // Inserindo botão de voltar do modal que será exibido ao usuário quando inserir uma despesa com sucesso ;
        document.getElementById("modal_btn").className = "btn btn-success" ; // Inserindo a classe de estilização do botão voltar do modal que será exibido ao usuário quando inserir uma despesa com sucesso ;
        $('#modalRegistraDespesa').modal('show') ; // Apresentando um dialog de sucesso para o usuário ; 

        // Limando os campos cadastrados pelo usuário anteriormente ; 
        ano.value = '' ; 
        mes.value = '' ; 
        dia.value = '' ; 
        tipo.value = '' ; 
        descricao.value = '' ; 
        valor.value = ''  ;

    }
    else {

        document.getElementById("modal_titulo").innerHTML = "Erro na inclusão do registro" ; // Inserindo o título do modal que será exibido ao usuário quando ocorrer um erro ao inserir uma despesa ;
        document.getElementById("modal_titulo_div").className = "modal-header text-danger" ; // Inserindo a classe do modal que será exibido ao usuário quando ocorrer um erro ao inserir uma despesa ;
        document.getElementById("modal_conteudo").innerHTML = "Erro na gravação, verifique se todos os campos foram preenchidos corretamente!" ; // Inserindo o texto do modal que será exibido ao usuário quando ocorrer um erro ao inserir uma despesa ;
        document.getElementById("modal_btn").innerHTML = "Voltar e corrigir" ; // Inserindo botão de voltar e corrigir do modal que será exibido ao usuário quando ocorrer um erro ao inserir uma despesa ;
        document.getElementById("modal_btn").className = "btn btn-danger" ; // Inserindo a classe de estilização do botão voltar do modal que será exibido ao usuário quando ocorrer um erro ao inserir uma despesa ;

        $('#modalRegistraDespesa').modal('show') ; // Apresentando um dialog de erro para o usuário ; 
    }
}


// Criando a classe Bd que terá as funções interligando com o localStorage ; 

class Bd {

    // Constructor

    constructor() {

        // Iniciando um valor para ID quando essa informação não existir dentro de local Storage ; 

        let id = localStorage.getItem('id') ; 

        if(id === null) {
            localStorage.setItem("id", 0) ; 
        }
    }

    // Criando a função que retornará o ID para inserir a despesa no Local Storage ; 

    getProximoId() {
        let proximoid = localStorage.getItem("id") ; // Recuperando o ID ; 
        return parseInt(proximoid) + 1 ; 
    }

    // Criando a função que irá inserir a despesa no localStorage ; 

    gravar(d) {
        let id = this.getProximoId() ;
        localStorage.setItem(id, JSON.stringify(d)) ; // Utilizado para gravar a despesa no localStorage ; 
        localStorage.setItem("id", id) ; // Atualizando o ID com o ID recuperado ; 
    }

    // Criando a função que irá recuperar todos os registros cadastrados no localStorage ; 

    recuperarTodosRegistros() {

       let despesas = Array() ; // Array que atribuirá todas as despesas cadastradas em localStorage ;  

       let id = localStorage.getItem("id") ; // Recuperando o ID atual das despesas que estão cadastradas no localStorage ; 
       
       for(let i = 1 ; i <= id; i++) { // Recuperando todas as despesas caadstradas em localStorage ; 
            let despesa = JSON.parse(localStorage.getItem(i)) ; // Recuperando a despesa que está cadastrada no id(e convertendo para objetos literais) ; 
            if(despesa === null) { // Verificando se existe a possibilidade de indíces que foram pulados ou removidos ; 
                continue ; 
            }
            despesa.id = i ; // Atribuindo um ID para cada despesa ; 
            despesas.push(despesa) ;
        }

        return despesas ; 
    }

    // Criando a função que irá fazer a pesquisa de despesa no localStorage ; 

    pesquisar(despesa) {

        let despesasFiltradas = this.recuperarTodosRegistros() ; // Criando um array que irá armazenar todas as despesas cadastradas ; 

        if(despesa.ano != '') { // Filtrando o ano ; 

            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano) ; 
        }
    
        if(despesa.mes != '') { // Filtrando o mês ; 
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes) ; 
        }

        if(despesa.dia != '') { // Filtando o dia ;
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia) ; 
        }

        if(despesa.tipo != '') { // Filtrando o tipo ;
            console.log(despesa.tipo) ; 
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo) ;
        }

        if(despesa.descricao != ''){ // Filtrando a descrição ;
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao) ;
        }

        if(despesa.valor != ''){ // Filtrando o valor ;
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor) ;
        }

        return despesasFiltradas ; 
    }

    // Criando a função que irá remover uma despesa cadastrada em um determinando ID ; 

    remover(id) {
        localStorage.removeItem(id) ; 
    }
}

let bd = new Bd() ; // Criando o objeto Bd() ; 


// Recuperando despesas carregadas ; 

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarTodosRegistros() ; // Recuperando todos os registros através do Objeto BD ; 
    }

    let listasDespesas = document.getElementById('listaDespesas') ; 
    listasDespesas.innerHTML = '' ; // Limpando a tabela ; 
    
    // Percorrer o array despesas, listando cada despesa de forma dinâmica ; 

    despesas.forEach(function(d) {
    
        let linha = listasDespesas.insertRow(); // Criando a linha da tabela (TR), a variável recebe a linha criada naquele momenento ; 
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;  // Criando a primeira coluna (TD) ; 
    
        switch(parseInt(d.tipo)) {  // Ajustando qual que é o tipo ; 

            case 1 : 
                d.tipo = 'Alimentação' ; 
                break ; 
            case 2 :
                d.tipo = 'Educação' ; 
                break ; 
            case 3 :
                d.tipo = 'Lazer' ; 
                break ; 
            case 4 :
                d.tipo = 'Saúde' ; 
                break ;  
            case 5 :
                d.tipo = 'Transporte' ; 
                break ; 
        }
    
        linha.insertCell(1).innerHTML = d.tipo ;  // Criando a segunda coluna (TD) ; 
        linha.insertCell(2).innerHTML = d.descricao ;  // Criando a terceira coluna (TD) ; 
        linha.insertCell(3).innerHTML = d.valor ;  // Criando a quarta coluna (TD) ; 
    
        let btn = document.createElement("button") ; // Criando o elemento botão que será responsável por excluir as despesas cadastradas ; 
        btn.className = "btn btn-danger" ; // Adicionando classes responsável por estilização ao Botão ; 
        btn.innerHTML = '<i class="fas fa-times"></i>' // Criando o ícone do botão ; 
        btn.id = `id_despesa_${d.id}`; // Associando o ID da despesa ao botão ; 

        btn.onclick = function() { // Remover a despesa ; 
            let id = this.id.replace('id_despesa_', '') ; // Excluindo o texto do id, e permanecendo apenas com o número para exclusão ; 
            bd.remover(id) ; // Removendo a despesa ; 
            window.location.reload() ; // Recarregando a página depois de cada exclusão ; 
        }
        linha.insertCell(4).append(btn); // Criando o botão de exclusão ; 
    })
}
 
// Pesquisando despesa 

function pesquisarDespesa() {

    let ano = document.getElementById('ano').value ; // Recuperando o ano informado pelo usuário ; 
    let mes = document.getElementById('mes').value ; // Recuperando o ano informado pelo usuário ; 
    let dia = document.getElementById('dia').value ; // Recuperando o ano informado pelo usuário ; 
    let tipo = document.getElementById('tipo').value ; // Recuperando o ano informado pelo usuário ; 
    let descricao = document.getElementById('descricao').value ; // Recuperando o ano informado pelo usuário ; 
    let valor = document.getElementById('valor').value ; // Recuperando o ano informado pelo usuário ; 

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor); // Criando um objeto do tipo despesa ;      
    let despesas = bd.pesquisar(despesa) ; // Pesquisando se existe a despesa informada e atribuindo a 'despesas' ;
    carregaListaDespesas(despesas, true) ; // Carregando na página as despesas encontrada ; 
}


