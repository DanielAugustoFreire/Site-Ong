var voluntarios = [
    { id: 1, nome: "Gustavo Moreira", email: "gustavomoreira@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 2, nome: "João Constante", email: "joao@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 3, nome: "Paulo Henrique", email: "paulin12@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 4, nome: "Igor Lins", email: "igor@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 5, nome: "Daniel Freie", email: "daniel@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 6, nome: "Victor Chaves", email: "victor@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 7, nome: "Lucas Sisti", email: "lucassisti@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" },
    { id: 8, nome: "Samuel Sanches", email: "sanches@gmail.com", telefone: "+55 (18)981981478", endereco: "Rua Anna,523" }
]


function montarTabela() {
    var tabela = document.getElementById('tb-body');
    let html = '';
    for (let vol of voluntarios) {
        html += `<tr>
               <td><input type="checkbox" data-id="${vol.id}"></td>
               <td>${vol.nome}</td>
               <td>${vol.email}</td>
               <td>${vol.telefone}</td>
               <td><a class="btnExcluir" onclick="excluirItem(${vol.id})">&#9746;</a></td>
           </tr>`;
    }
    tabela.innerHTML = html;
}

function adicionarItem() {

    var nomeIn = document.getElementById('nome');
    var emailIn = document.getElementById('email');
    var telefoneIn = document.getElementById('tel');
    var ruaIn = document.getElementById('end');
    var numIn = document.getElementById('n');
    var enderecoIn = ruaIn + ',' + numIn;
    let dados_vol = {
        id: new Date().getTime(),
        nome: nomeIn.value,
        email: emailIn.value,
        telefone: telefoneIn.value,
        endereco: enderecoIn.value
    }
    var passou = 10;

    if(dados_vol.nome.length < 5)
    {
        let paragrafo = document.getElementById('namexin');
        paragrafo.textContent = `O nome precisa ter no minimo 5 caracteres`;
        passou = 0;
    }
    else{
        let paragrafo = document.getElementById('namexin');
        paragrafo.textContent = ``;
    }

    var regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(dados_vol.email)) {
        let paragrafo = document.getElementById('emailxin');
        paragrafo.textContent = `O e-mail não é válido`;
        passou = 0;
    }
    else{
        let paragrafo = document.getElementById('emailxin');
        paragrafo.textContent = ``;
    }   

    var regexTelefone = /^\+\d{2} \(\d{2}\)\d{5}-\d{4}$/;
    if (regexTelefone.test(dados_vol.telefone)) {
        let paragrafo = document.getElementById('telefonexin');
        paragrafo.textContent = ``;
    } else {
        let paragrafo = document.getElementById('telefonexin');
        paragrafo.textContent = `Número de Telefone Inválido`;
        passou = 0;
    }

    if (ruaIn.value.trim() === "") {
        let paragrafoRua = document.getElementById('ruaxin');
        paragrafoRua.textContent = `A rua não pode estar em branco`;
        passou = 0;
    } else {
        let paragrafoRua = document.getElementById('ruaxin');
        paragrafoRua.textContent = ``;
    }

    if (numIn.value.trim() === "") {
        let paragrafoNum = document.getElementById('numxin');
        paragrafoNum.textContent = `O número não pode estar em branco`;
        passou = 0;
    } else {
        let paragrafoNum = document.getElementById('numxin');
        paragrafoNum.textContent = ``;
    }

    if(passou == 10)
    {
        voluntarios.push(dados_vol);
        montarTabela();
        nomeIn.value = '';
        emailIn.value = '';
        telefoneIn.value = '';
        ruaIn.value = '';
        numIn.value = '';
        nomeIn.focus();        
    }


}

function excluirItem(idDeletar) {
    let vetorAux = [];
    for (let i = 0; i < voluntarios.length; i++) {
        if (voluntarios[i].id != idDeletar)
            vetorAux.push(voluntarios[i]);
    }
    voluntarios = vetorAux;
    montarTabela();
}

function excluirSelecionados() {
    let vetorCheckbox = document.querySelectorAll('[data-id]');
    if (vetorCheckbox.length > 0) {
        for (let caixa of vetorCheckbox) {
            if (caixa.checked == true)
                excluirItem(caixa.dataset.id);
        }

    }
    else alert('Não tem itens selecionados para serem excluídos!!');
}

function selecionarTodos() {
    let Checkbox = document.querySelectorAll('[data-id]');
    let ckInit = document.querySelector('#checkTodos');
    for (let caixa of Checkbox) {
        caixa.checked = ckInit.checked;
    }
}

/*
fonte: https://github.com/FlavioALeal/MascaraJS

Parametros da função mascara
A função máscara tem 3 parametros.

1º - o Modelo da máscara utilizado no input, como explicado acima, informe sempre a máscara entre aspas simples ou aspas duplas, parametro obrigatório
2º - não mude, sempre deve ser this, parametro obrigatório
3º - não mude, sempre deve ser event, parametro obrigatório
*/
function mascara(m,t,e){
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g,'');
    var l = texto.length;
    var lm = m.length;
    if(window.event) {                  
       id = e.keyCode;
    } else if(e.which){                 
       id = e.which;
    }
    cursorfixo=false;
    if(cursor < l)cursorfixo=true;
    var livre = false;
    if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
    ii=0;
    mm=0;
    if(!livre){
       if(id!=8){
          t.value="";
          j=0;
          for(i=0;i<lm;i++){
             if(m.substr(i,1)=="#"){
                t.value+=texto.substr(j,1);
                j++;
             }else if(m.substr(i,1)!="#"){
                      t.value+=m.substr(i,1);
                    }
                    if(id!=8 && !cursorfixo)cursor++;
                    if((j)==l+1)break;
                        
          } 	
       }
    }
    if(cursorfixo && !livre)cursor--;
      t.setSelectionRange(cursor, cursor);
  }
  
document.addEventListener('DOMContentLoaded',
    function () {
        montarTabela();
    }, false);