// Verifique se há uma entrada no Local Storage indicando que o usuário está logado
var estaLogado = localStorage.getItem('estaLogado') === 'true';

document.addEventListener("DOMContentLoaded", function() {
    // Se o usuário estiver logado, altere o texto do botão para "SAIR"
    if (estaLogado) {
        var val = document.getElementById("LOGADO");
        val.innerHTML = "SAIR";
        var vol = document.getElementById("voluntario");
        vol.textContent = "Gerenciar Voluntarios";
        vol.href = "gerenciamento.html"
    }

    // Resto do seu código
});

function Sair() {
    estaLogado = false;
    localStorage.setItem('estaLogado', 'false');
    // Redirecione o usuário para a página de login ou onde desejar
    location.href = "login.html"; // Substitua "login.html" pela página desejada
}

function Validar() {
    var email;
    var senha;

    email = document.getElementById("typeEmailX").value;
    senha = document.getElementById("typePasswordX").value;

    if (email == "admin@admin.adm" && senha == "admin") {
        // Defina o estado de login no Local Storage como verdadeiro
        localStorage.setItem('estaLogado', 'true');

        location.href = "index.html";
        alert("Sucesso");

        // Após o redirecionamento, altere o texto do botão para "SAIR"
        var val = document.getElementById("LOGADO");
        val.innerHTML = "SAIR";
    } else {
        alert("ERROU A SENHA");
    }
}