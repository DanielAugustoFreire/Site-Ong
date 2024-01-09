var voluntarios = [
    {nome: "Gustavo", email: "gustavo@gmail.com", telefone: "189812121", rua:"anna",n:5, data_nasc: "05/02/2022"},
];

function tabela(dados){
    var tabela = document.getElementById('tabela');

    let html = 
    `<tr>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">Telefone</th>
        <th scope="col">Data de Nascimento</th>
        <th scope="col">Endereço</th>
    `;

    let linha = "";
    for(let voluntarios of dados){
        linha +=`
        <tr>
            <td>${voluntarios.nome}</td>
            <td>${voluntarios.}</td>
            <td>${}</td>
            <td>${}</td>
            <td>${}</td>
        `
    }
}