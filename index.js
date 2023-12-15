import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = '0.0.0.0';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'paginas')));
app.use(express.static(path.join(process.cwd(), 'paginas/assets')));
app.use(express.static(path.join(process.cwd(), 'paginas/assets/css')));
app.use(express.static(path.join(process.cwd(), 'paginas/assets/images')));
app.use(express.static(path.join(process.cwd(), 'paginas/assets/js')));

app.use(cookieParser());
app.use(session({
    secret: "OngS1VePets",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //Sessão por 1 Dia
    }
}))

app.get('/', PaginaMenu);//certo
app.get('/paginaGerenciamento',autenticar,PaginaGerenciamento);//certo
app.get('/Quem_somos',QuemSomos);//certo
app.get('/doar',Doar);//certo
app.get('/seja_um_voluntario',SejaUmVoluntario);//certo
app.get('/noticia',Noticias);//certo

//metodos de doação
app.get('/cartao',cartao);//certo
app.get('/pix',pix);//certo
app.get('/boleto',boleto);//certo

//deslogar
app.get('/sair', Logout);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
})

function autenticar(requisicao, resposta, next) {
    if (requisicao.session.usuarioAutenticado) {
        next();
    }
    else {
        resposta.redirect("/login.html");
    }
}

function Logout(requisicao, resposta) {
    requisicao.session.usuarioAutenticado = false;
    resposta.redirect('/login.html');
}

app.post('/validarLogin', (requisicao, resposta) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    if (email === 'admin@admin.adm' && senha === 'admin'){
        requisicao.session.usuarioAutenticado = true;
        resposta.redirect('/');
    }

})



function PaginaMenu(requisicao, resposta) {//feito
    const dataUltimoAcesso = requisicao.cookies.DataUltimoAcesso;
    const data = new Date();
    resposta.cookie("DataUltimoAcesso", data.toLocaleDateString() + " " + data.toLocaleTimeString(), {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true
    });

    resposta.end(`<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Bootstrap demo</title>
        <link rel="icon" href="/logo3.png" type="icon">
        <link rel="stylesheet" href="/style.css">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
      </head>
      <body class="bg-white">
    
        <header>
          <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
            <div class="container">
              <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
                <ul class="navbar-nav"> 
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/noticia">Notícias</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/Quem_somos">Quem Somos?</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/doar">Doar</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
                  </li>
                </ul>
              </div>
              <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button></a>
            </div>
          </nav>
        </header>
        
        
        
    
        <hr>
    
        <main>
    
          <div id="myCarousel" class="carousel slide mb-7" data-bs-ride="carousel">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="assets/images/abandonado.jpg" width="100%" height="100%">
                <div class="container">
                  <div class="carousel-caption text-start text-black">
                    <h1>Save Pets.</h1>
                    <p id="shadow" class="opacity-75">Juntos, podemos fazer a diferenca nas vidas dos nossos fieis amigos de quatro patas!</p>
                    <p><a class="btn btn-lg btn-warning my-2" href="/doar">Doe Agora!</a></p>
                  </div>
                </div> 
              </div>
              <div class="carousel-item"> 
                <img src="assets/images/cachorro_neve.jpg" width="100%" height="100%">
                <div class="container">
                  <div class="carousel-caption text-black">
                    <h1>Conquistas</h1>
                    <p id="shadow" class="">10.000T+ de Alimentos Arrecadados, +320 Caes Resgatados, 100+ Voluntarios</p>
                    <p><a class="btn btn-lg btn-warning my-2" href="/noticia">Acessar</a></p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <img src="assets/images/vacina.jpg" width="100%" height="100%">
                <div class="container">
                  <div class="carousel-caption text-end text-black" >
                    <h1>Siga-nos no Instagram.</h1>
                    <p id="shadow">Aqui você acompanha nosso dia a dia como ONG.</p>
                    <p><a class="btn btn-lg btn-warning my-2" target="_blank" href="https://www.instagram.com">Instagram</a></p>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
    
          <div class="bg-black bg-opacity-75 p-5">
            
            <div class="container px-4 text-center">
              <div class="row gx-5">
                <div class="col">
                 <div class="p-3"><img src="assets/images/quadrado.jpg"  class="rounded-circle" width="300px" height="300px"></div>
                </div>
                <div class="col">
                  <div class="p-3 text-white"><h2>Amor Pelos Animais</h2><br>
                    <p>A ONG Save Pets personifica o amor pelos animais, resgatando, cuidando e encontrando lares para eles. <br>
                      <br> Sua dedicação demonstra compaixão genuína e promove a conscientização sobre adoção responsável e direitos dos animais, transformando vidas peludas com esperança e cuidado.
                    </p><a href="/Quem_somos" class="link-light">Descubra mais sobre Nos:</a></div>
                </div>
              </div>
            </div>
    
          </div>
    
          <div class=" p-5" id="warn" style="background-image: url('textura.jpg'); ">
            
            <div class="container px-4 text-center">
              <div class="row gx-5 table table-dark">
                <div class="col table table-warning" id="coll">
                  <div class="p-3 text-black"><h2>Amor Pelos Animais</h2>
                    <p>A ONG Save Pets personifica o amor pelos animais, resgatando, cuidando e encontrando lares para eles. <br>
                      <br> Sua dedicação demonstra compaixão genuína e promove a conscientização sobre adoção responsável e direitos dos animais, transformando vidas peludas com esperança e cuidado.
                    </p><a href="/Quem_somos" class="link-dark">Descubra mais sobre Nos:</a>
                  </div>
                </div>
                <div class="col" id="colll">
                 <div class="p-3"><img src="assets/images/agua.jpg"  class="rounded-circle" width="300px" height="300px"></div>
                </div>
              </div>
            </div>
    
          </div>
    
    
    
    
        </main>
    
    
    
    
    
    
    
    
    
    
        <footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5">
          <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>
    
          <ul class="nav col-md-4 mx-4 justify-content-end">
            <li class="nav-item"><a href="/" class="nav-link px-2 text-black">Home</a></li>
          </ul>
        </footer>
    
    
    
          
          
    
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
          <script>
    
            document.addEventListener("DOMContentLoaded", function() {
              var myCarousel = new bootstrap.Carousel(document.querySelector("#myCarousel"), {
                interval: 4000
              });
            }); 
        
            </script>
            <script src="/logado.js"></script>
    
    
    
    
    
        </body>
    
    </html>`);
}

function PaginaGerenciamento(requisicao, resposta){//feito
    resposta.end(`
    <!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerenciar Voluntários</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link href="/logo3.png" rel="icon">
  <style>
    .container-a {
      display: flex;
      flex-wrap: wrap;
      /* Permite que os elementos quebrem para a próxima linha em telas menores */
      justify-content: space-between;
    }
    main {
      width: 100%;
      position: relative;
      background: var(--color-primary);
      padding: 60px 0 0 0;
    }
  </style>
  <script src="/logado.js"></script>
</head>

<body>
<header>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
      <ul class="navbar-nav"> 
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/noticia">Notícias</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Quem_somos">Quem Somos?</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/doar">Doar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
        </li>
      </ul>
    </div>
    <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button></a>
  </div>
</nav>
</header>



  <main>

    <div>
      <h1 style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: black;text-align: center;">
        Sistema de Voluntários</h1>
    </div>
    <div class="container container-a">


      <div class="esquerda border border-dark rounded" style="width: 650px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top: 390px ;">
        <p
          style="font-family: Verdana, Geneva, Tahoma, sans-serif; color: white; background-color: #212529; text-align: center;">
          Dados do Voluntário</p>
        <form action="#" style="margin-left:10px" class="form-group">
          <label for="txtnome">Nome:</label><br>
          <input class="form-control" type="text" id="nome" name="nome" maxlength="65" size="50"
            placeholder="Nome"><br>
            <p id="namexin" style="color: red;"></p>
          <label for="txtemail">Endereço de E-mail:</label><br>
          <input class="form-control" type="text" id="email"  name="email" maxlength="75" size="50"
            placeholder="Endereço de E-mail"><br>
            <p id="emailxin" style="color: red;"></p>
          <label for="tel">Telefone:</label><br>
          <input class="form-control" type="tel" id="tel" name="tel" maxlength="18" size="50"
    placeholder="+00 (00)00000-0000" onkeypress="mascara('+## (##)#####-####',this,event)">

            <p id="telefonexin" style="color: red;"></p>
          <label for="txtnome">Endereço:</label><br>
          <input class="form-control" type="text"  id="end" name="end" maxlength="65" size="40" placeholder="Rua">
          <p id="ruaxin" style="color: red;"></p>
          <input class="form-control" type="text"  id="n" name="n" maxlength="10" size="3" placeholder="N°"><br>
          <p id="numxin" style="color: red;"></p>
          <input type="reset" name="limpar" id="limpar" class="btn btn-danger" value="Limpar">
          <input class="btn btn-success" type="button" name="cadastrar"
            id="cadastrar" value="Cadastrar" onclick="adicionarItem()">
        </form>
      </div>
      <div class="direita" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); margin-top:950px;">
        <table style="width: 700px; border-radius: 10px; border: 1px solid black;" id="tabela" class="table table-striped table-sm table-dark direita table-bordered">
          <thead>
              <tr>
                <th class="coluna"><input type="checkbox" id="checkTodos" onchange="selecionarTodos()"></th>
                <th class="coluna">Nome</th>
                <th class="coluna">Email</th>
                <th class="coluna">Telefone</th>
                <th class="coluna"></th>
              </tr>
          </thead>
          <tbody id="tb-body">
           
          </tbody>
        </table>
        <input type="button" name="limpar" id="limpar" class="btn btn-danger" value="Excluir Selecionados" onclick="excluirSelecionados()">
      </div>

    </div>
    <hr>
  </main>

  <footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5" style="margin-top:1250px" >
    <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>

    <ul class="nav col-md-4 mx-4 justify-content-end">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-black">Home</a></li>
    </ul>
  </footer>
</body>
<script src="/gerenciamento.js"></script>
<script src="/tabela.js"></script>


</html>
    `);
}

function QuemSomos(requisicao,resposta){//feito
    resposta.end(`
    <!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <script src="/logado.js"></script>
    <link rel="stylesheet" href="/style.css">
    <link rel="icon" href="/logo3.png" type="icon">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  </head>

  <body class="bg-white">
    
  <header>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
        <ul class="navbar-nav"> 
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/noticia">Notícias</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/Quem_somos">Quem Somos?</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/doar">Doar</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
          </li>
        </ul>
      </div>
      <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button></a>
    </div>
  </nav>
</header>
    
        <div class="bg-black bg-opacity-75 p-5 mt-5">
          
          <div class="container px-4 text-center">
            <div class="row gx-5">
              <div class="col">
               <div class="p-3"><img src="assets/images/cachorro-emocionado.jpg"  class="rounded-circle" width="300px" height="300px"></div>
              </div>
              <div class="col">
                <div class="p-3 text-white"><h2>Quem Somos?</h2><br>
                  <p>Desde 2018, a ONG Save Pets dedica-se ao resgate de animais na localidade de Presidente Prudente e região.</p>
                  <p>Com uma equipe de trabalho voluntário dedicada, nossa missão é proporcionar amor, cuidado e novos lares para os animais em necessidade.</p>
                  <a href="/seja_um_voluntario" class="link-light">Voluntarie-se:</a></div>
              </div>
            </div>
          </div>
    
        </div>





    <div class="bg-body-secondary">
      <div class="p-3 pb-md-4 mx-auto text-center mb-0">
        <h1 style="text-shadow: 3px 2px 2px rgb(184, 184, 184); padding-top: 50px;" class="display-4 fw-normal text-body-emphasis text-black">Sobre nós</h1>
        <p style="font-weight: bolder; text-shadow: 1px 1px 2px rgb(184, 184, 184);" class="fs-5 text-black">
          Aqui apresentamos nossa Visão, Missão e Valores: A essência que nos guia.</p>
      </div>

      <div class="container mx-auto text-center text-black">
        <div class="row">
            <div class="col-lg-4">
                <img src="assets/images/mission.png" class="rounded-circle" width="140px" height="140px" alt="">
                <h2 style="font-weight: 700; text-shadow: 1px 1px 2px rgb(184, 184, 184);" class="fw-normal">Missão</h2>
                <p style="font-weight: bolder;">A SavePet's busca proteger e cuidar dos animais domésticos, oferecendo
                    abrigo, tratamento médico e combate ao abuso e negligência desses animais.
                </p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <img src="assets/images/eye.gif" class="rounded-circle" width="140px" height="100px" alt="">
                <h2 style="font-weight: 700; text-shadow: 1px 1px 2px rgb(184, 184, 184);" class="fw-normal">Visão</h2>
                <p style="font-weight: bolder;">A ONG visa um mundo onde todos os animais são tratados com respeito,
                    compaixão e cuidado independentemente de sua espécie, raça, idade ou condição. Tendo em vista, proteger seus habitats naturais e oferecer lares.
                </p>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-4">
                <img src="assets/images/valores.png" class="rounded-circle" width="140px" height="140px" alt="">
                <h2 style="font-weight: 700; text-shadow: 1px 1px 2px rgb(184, 184, 184);" class="fw-normal">Valores</h2>
                <p style="font-weight: bolder;">Responsabilidade, Transparência, Natureza, Vida, Comprometimento, Solidariedade,
                    Empatia, Sustentabilidade, Inclusão e Educação.
                </p>
                <br><br><br><br>  
            </div><!-- /.col-lg-4 -->
        </div>
    </div>
    
              </div><!-- /.col-lg-4 -->
            </div><!-- /.row -->
      </div>
    </div>










    <footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5">
      <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>

      <ul class="nav col-md-4 mx-4 justify-content-end">
        <li class="nav-item"><a href="/" class="nav-link px-2 text-black">Home</a></li>
      </ul>
    </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
      <script>

        document.addEventListener("DOMContentLoaded", function() {
          var myCarousel = new bootstrap.Carousel(document.querySelector("#myCarousel"), {
            interval: 4000
          });
        }); 
    
        </script>
    </body>

</html>
    `)
}

function Doar(requisicao,resposta){//feito
    resposta.end(
        `
        <!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Doação</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
  <link href="/DOACAO_MAIN.css" rel="stylesheet" type="text/css">
  <link href="/logo3.png" rel="icon">
  <script src="/logado.js"></script>
</head>

<body>
<header>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
      <ul class="navbar-nav"> 
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/noticia">Notícias</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Quem_somos">Quem Somos?</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" href="/doar">Doar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
        </li>
      </ul>
    </div>
    <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button><a>
  </div>
</nav>
</header>

  <section id="hero" class="hero">
    <div style="background-image: url('assets/images/orsrc16192.jpg');">
    <div class="container position-relative">
      <div class="row gy-5" data-aos="fade-in">
        <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
          <h2>Bem Vindo a <span>Doações</span></h2>
          <p>Ao fazer uma doação para a ONG Save Pets, você estará contribuindo para abrigar animais de rua, fornecer
            vacinas,
            cuidados médicos e muito mais. Sua generosidade faz a diferença na vida desses animais.</p>
          <div class="d-flex justify-content-center justify-content-lg-start">
          </div>
        </div>
        <div class="col-lg-6 order-1 order-lg-2">
          <img src="assets/images/Dinheiro.png" class="img-fluid mt-5" alt="" data-aos="zoom-out" data-aos-delay="100"
            width="75%">
        </div>
      </div>
    </div>

    <div class="icon-boxes position-relative">
      <div class="container position-relative">
        <div class="row gy-4 mt-5">
          <h2 class="title">Meios de Doação:</h2>


          <div class="col-xl-3 col-md-6 div_center" data-aos="fade-up" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-gem"></i></div>
              <a href="/pix" class="stretched-link"></a><!--Link Pix-->
              <img src="assets/images/pix232.png" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="120"
                style="margin-top: 20px;">
            </div>
          </div><!--End Icon Box -->

          <div class="col-xl-3 col-md-6 div_center" data-aos="fade-up" data-aos-delay="100">
            <div class="icon-box icon-box1">
              <div class="icon"><i class="bi bi-easel"></i></div>
              <a href="/boleto" class="stretched-link"></a><!--Link Boleto-->
              <img src="assets/images/Boleto.png" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="120"
                style="margin-top: 20px;">
            </div>
          </div><!--End Icon Box -->

          <div class="col-xl-3 col-md-6 div_center" data-aos="fade-up" data-aos-delay="300">
            <div class="icon-box">
              <div class="icon"><i class="bi bi-geo-alt"></i></div>
              <a href="/cartao" class="stretched-link"></a><!--Link Cartão-->
              <img src="assets/images/cartaoacess.png" class="img-fluid" alt="" data-aos="zoom-out" data-aos-delay="120"
                style="margin-top: 20px;">
            </div>
          </div><!--End Icon Box -->
        </div>
      </div>
    </div>
  </div>
  <hr>

    <div style="background-color: white;" class="container-fluid">
      <div style="background-color: white;display: flex;justify-content: space-between;" class="">
        <div class="container-fluid position-relative">
          <div>
            <h2 class="text-center" style="color: black;">Doar de Outra Maneira:</h2>
            <h4 class="text-center">Um produto, rações entre outros.</h4>
            <div class="centro">
              <img style="max-width: 100%; height: auto;padding-bottom: 5px;" class="imagem"
                src="assets/images/seta.png" width="150px" class="" alt="">
            </div>
          </div>

          <!--Inicio Forms-->
          <div class="container position-relative border border-dark rounded " style="color:white; background-color: gray;background-image: url('assets/images/orsrc53752_edited.jpg');background-size: cover;background-repeat: no-repeat;padding-top: 25px;">
            <h4 style="color:white; text-align: center;font-weight: bolder;">Preencha esse formulário corretamente e selecionando as opções corretas para sua doação:</h2>
              <div class="container position-relative">
                <form name="cadastro" action="" method="">

                  <label for="tnome" style="font-weight: bolder;">Nome:</label><br>
                  <input type="text" name="txtnome" size="40" maxlength="30" required="required"
                    placeholder="Insira seu Nome"><br>

                  <label for="temail" style="font-weight: bolder;">Digite seu e-mail:</label></br>
                  <input type="text" name="txte-mail" size="40" maxlength="30" required="required"
                    placeholder="Insira seu e-mail"></br>

                  <label for="ttelefone" style="font-weight: bolder;">Digite seu telefone:</label></br>
                  <input type="tel" id="tcelular" title="(99) 99999-9999" placeholder="(99) 99999-9999"
                    pattern="\(\d{2}\)\s\d{5}-\d{4}"  required="required" onkeypress="mascara('+## (##)#####-####',this,event)" /></br>

                  <label for="tnome" style="font-weight: bolder;">CPF:</label><br>
                  <input type="text" name="txtnome" size="40" maxlength="30" required="required"
                    placeholder="000.000.000-00" pattern="\d{3}.\d{3}.\d{3}-\d{2}" onkeypress="mascara(' ###.###.###-##',this,event)"><br>

                  <label for="tdoacao" style="font-weight: bolder;">Meio de Doação:</label></br>
                  <input type="radio" name="opcao1" value="1" required="required" />Presencial
                  <input type="radio" name="opcao1" value="1" required="required" />Correios <br>

                  <label for="arquivo" style="font-weight: bolder;">Caso seja Correios por favor,<br>
                  </label> <br>
                  <input type="file" text="Procurar" name="bfile" /><br>


                  <br />
                  <input class="btn btn-danger" type="reset" name="Cancelar" value="Limpar" />
                  <input class="btn btn-primary" type="submit" name="Enviar" value="Enviar">
                </form>
              </div>
              <br>
          </div>
        </div>
      </div>

    </div>

    </div>


  </section>
  <br><br><br>
  <footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5">
    <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>

    <ul class="nav col-md-4 mx-4 justify-content-end">
      <li class="nav-item"><a href="/" class="nav-link px-2 text-black">Home</a></li>
    </ul>
  </footer>
</body>
<script src="Doacao_main.js"></script>
</html>
        `);
}

function SejaUmVoluntario(requisicao,resposta){// feito
    resposta.end(`
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8" />
    <script src="assets/js/logado.js"></script>
    <title>Voluntário</title>
    <link rel="stylesheet" type="text/css" href="/stilo_igor.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
</head>

<body class="form-background p-5"> 
<header>
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
      <ul class="navbar-nav"> 
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/noticia">Notícias</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Quem_somos">Quem Somos?</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/doar">Doar</a>
        </li>
        <li class="nav-item">
          <a class="nav-link active" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
        </li>
      </ul>
    </div>
    <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button></a>
  </div>
</nav>
</header>


    <div id="j" class="p-3">
        <br><br><br>
        <div class=" pb-md-4 mx-auto text-center mb-0">
            <h1 class="display-4 fw-normal text-body-emphasis text-black">Cadastro para voluntariado</h1>
            <p class="fs-5 text-black"> 
            </p>
        </div>

        <div class="container mt-5" id="asdf">
            
            <div class="row justify-content-center opacity-100" >
                <div>
                    <form action="seja_um_voluntario.html" method="POST" class="custom-form-box">
                        <h1 class="text-center">Formulário de Contato</h1>
                        <div class="form-group">
                            <label for="nome">Nome:</label>
                            <input type="text" class="form-control" id="nome" name="nome" required>
                        </div>
    
                        <div class="form-group">
                            <label for="numero">Data de Nascimento:</label>
                  
                            <input type="date" class="form-control" id="datanas" name="datanas" placeholder="00/00/0000" required>
                          
                        </div>
    
                        <div class="form-group">
                          <label for="email">Email:</label>
                          <input type="email" class="form-control" id="email" name="email" required placeholder="Digite seu e-mail">
                      </div>
                      
    
                        <div class="form-group">
                            <label for="telefone">Telefone:</label>
                            <input type="text" class="form-control" id="telefone" name="telefone" placeholder="(00)00000-0000" onkeypress="mascara(' +## (##) #####-####',this,event)" required>
                            
                        </div>
    
                        <div class="form-group">
                            <label for="sobre_voce">Conte mais sobre você:</label>
                            <textarea class="form-control" id="sobre_voce" name="sobre_voce" rows="4"></textarea>
                        </div>
                        <br><br>
    
                        <button class="btn btn-success" type="button" onclick="validarCadastro() ">Enviar</button>
                    </form>
            </div>
        </div>
    </div>

    <footer class="d-flex flex-wrap justify-content-between align-items-center py-5 mx-4">
    <p class="col-md-4 mb-0">&copy; 2023 Company, Inc</p>

    <ul class="nav col-md-4 justify-content-end">
        <li class="nav-item"><a href="#" class="nav-link px-2 text-black">Home</a></li>
    </ul>
</footer>

</body>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
<script src="seja_um_voluntario.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</html>
    `);
}

function Noticias(requisicao,resposta){//feito
    resposta.end(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="icon" href="/logo3.png" type="icon">

    <link rel="stylesheet" href="/estilos.css" type="text/css">
    <script src="assets/js/logado.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <title>Document</title>
</head>
<body class="bg-secondary">
    <!--HEADER(NAVEGAÇÃO)-->
    <header>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#"><img src="assets/images/logo3.png" width="40px" alt=""></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
          <ul class="navbar-nav"> 
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/noticia">Notícias</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/Quem_somos">Quem Somos?</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/doar">Doar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="voluntario" href="/seja_um_voluntario">Seja Voluntário</a>
            </li>
          </ul>
        </div>
        <a href="/sair"><button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button></a>
      </div>
    </nav>
  </header>

      <div class="bg-black bg-opacity-75 p-5 my-5">
        
        <div class="container px-4 text-center">
          <div class="row gx-5">
            <div class="col">
             <div class="p-3"><img src="/cachorro-emocionado.jpg"  class="rounded-circle" width="300px" height="300px"></div>
            </div>
            <div class="col">
              <div class="p-5 text-white" ><h2 id="ultimas">ULTIMAS NOTICIAS</h2><br>
                <p>A ONG Save Pets personifica o amor pelos animais, resgatando, cuidando e encontrando lares para eles. <br>
                  <br> Sua dedicação demonstra compaixão genuína e promove a conscientização sobre adoção responsável e direitos dos animais, transformando vidas peludas com esperança e cuidado.
                </p><a href="('/Quem_somos" class="link-light">Descubra mais sobre Nos:</a></div>
            </div>
          </div>
        </div>
      </div>
     <!--CONTEUDO DAS NOTICIAS-->
     <div class="container" id="coll">
        <div>
          <div class=" d-inline-block" style="margin-top: 2%; margin-right: 11px;">
            <div class="card bg-dark" id="iso" style="color: white;">
                <img class="card-img-top" src="/cao6.jpg" alt="Imagem de capa do card">
                <div class="card-body">
                    <h5 class="card-title">Cachorros Resgatados</h5>
                    <p class="card-text">SP: prefeitura resgata 51 cães entre animais mortos em canil ilegal... </p>
                    <a href="https://noticias.uol.com.br/cotidiano/ultimas-noticias/2023/03/29/resgate-cachorros-ribeirao-pires.htm" target="_blank" class="btn btn-success">Ler mais</a>
                </div>
            </div>
        </div>
            <div class=" d-inline-block">
                <div class="card bg-dark" id="iso" style=" color: white;">
                    <img class="card-img-top" src="assets/images/cao5.jpg" alt="Imagem de capa do card">
                    <div class="card-body">
                        <h5 class="card-title">Vacinação</h5>
                        <p class="card-text">A ong SavePets promove uma campanha de vacinação...</p>
                        <a href="https://g1.globo.com/rj/rio-de-janeiro/noticia/2023/08/18/campanha-de-vacinacao-antirrabica-no-rio-comeca-no-proximo-sabado.ghtml" target="_blank" class="btn btn-success">Ler mais</a>
                    </div>
                </div>
            </div>
            <div class=" d-inline-block">
                <div class="card bg-dark" id="iso" style=" color: white; margin-right: 11px;">
                    <img class="card-img-top" src="assets/images/cao4.jpg" alt="Imagem de capa do card">
                    <div class="card-body">
                        <h5 class="card-title">Maltratos </h5>
                        <p class="card-text">A ong SavePets acionou as autoridades apos identificar...</p>
                        <a href="https://g1.globo.com/fantastico/noticia/2021/02/14/veja-como-denunciar-maus-tratos-ou-crueldade-contra-animais.ghtml" target="_blank" class="btn btn-success">Ler mais</a>
                    </div>
                </div>
            </div>
            <div class=" d-inline-block" style="margin-top: 9%;">
                <div class="card bg-dark" id="iso" style=" color: white;">
                    <img class="card-img-top" src="assets/images/cao3.jpg" alt="Imagem de capa do card">
                    <div class="card-body">
                        <h5 class="card-title">Doaçoes</h5>
                        <p class="card-text">A ong SavePets realizou algumas doaçoes para a ONG petlove</p>
                        <a href="https://www.petlove.com.br/doacoes" target="_blank" class="btn btn-success">Ler mais</a>
                    </div>
                </div>
            </div>
            <div class=" d-inline-block" style="margin-top: 9%;">
                <div class="card bg-dark" id="iso" style=" color: white; margin-right: 11px;">
                    <img class="card-img-top" src="assets/images/cao5.jpg" alt="Imagem de capa do card">
                    <div class="card-body">
                        <h5 class="card-title">Adoção</h5>
                        <p class="card-text">A ong SavePets realizou uma campanha de adoção de....</p>
                        <a href="https://www.osindefesos.com.br/adote" target="_blank" class="btn btn-success">Ler mais</a>
                    </div>
                </div>
            </div>
            <div class=" d-inline-block" style="margin-top: 9%;">
                <div class="card bg-dark" id="iso" style="color: white;">
                    <img class="card-img-top" src="assets/images/cao6.jpg" alt="Imagem de capa do card">
                    <div class="card-body">
                        <h5 class="card-title">Cuide do seu cão</h5>
                        <p class="card-text">Nós promovemos uma palestra dando dicas de como cuidar do....</p>
                        <a href="https://www.ecycle.com.br/como-cuidar-de-um-cachorro/" target="_blank" class="btn btn-success">Ler mais</a>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <hr>
<!--FOOTER-->
<footer class="bg-secondary d-flex flex-wrap justify-content-between align-items-center py-5">
  <p class="col-md-4 mb-0 mx-4">&copy; 2023 Company, Inc</p>

  <ul class="nav col-md-4 mx-4 justify-content-end">
    <li class="nav-item"><a href="/" class="nav-link px-2 text-black">Home</a></li>
  </ul>
</footer>









  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>

<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>
</html>
    `);
}

function cartao(requisicao,resposta){// feito
    resposta.end(`
    <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cartão</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="/DOACAO_CARTAO.css">
    <link rel="icon" href="/cartaoicon.png">
    <style>
        .container1 {
            display: flex;
            justify-content: center;
            /* Alinhar os itens horizontalmente ao centro */
            align-items: center;
            /* Alinhar os itens verticalmente ao centro */
            gap: 10px;
        }
    </style>
</head>

<body>
    <header class="container1">
        <div class="container1">
        <div >
            <img src="assets/images/todas_as_bandeiras.png">
        </div>
        <div class="container-fluid">
            <div>
                <h1 style="font-weight: bold;"><u>Doação Via Cartão</u></h1>
            </div>
        </div>
    </div>
    </header>



    <div class="container-fluid border border-info rounded mid ">
        <div>
            <h1>Dados</h1>
            <form action="/doar" method="POST">
                <div class="form-group">
                    <label for="nome">Nome:</label><br>
                    <input type="text" name="nome" size="40" class="form-control" required>
                </div>

                <div class="form-group">
                    <label for="CPF/CNPJ">CPF:</label><br>
                    <input type="text" id="cpf-input" name="CPF/CNPJ" placeholder="000.000.000-00" size="13"
                    maxlength="14" required class="form-control" onkeypress="mascaraCPF(event)"
                    pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"><br>
                    <label for="Data">Data de Nascimento:</label><br>
                    <input type="date" name="Data" size="13" maxlength="14" required class="form-control">
                </div>

                <div class="form-check">
                    <label for="opção de cartao">Selecione a opção de cartão:</label>
                    <br>
                    <input class="form-check-input" type="radio" name="opcao1" value="1" id="inlineRadio1" /> <label
                        class="form-check-label" for="opcao1">Crédito</label><br>
                    <input class="form-check-input" type="radio" name="opcao1" value="2" id="inlineRadio2" /><label
                        class="form-check-label" for="opcao1">Débito</label>
                    <br>
                </div>

                <div>
                    <label for="cartão">Selecione a bandeira do cartão:</label>
                    <select name=“selOpcao” class="form-control">
                        <option value=“0”></option>
                        <option value=“1”>MasterCard</option>
                        <option value=“2”>VISA</option>
                        <option value=“3”>Maestro</option>
                        <option value=“4”>Elo</option>
                        <option value=“5”>Alelo</option>
                        <option value=“6”>Hipercard</option>
                        <option value=“7”>Banco do Brasil</option>
                        <option value=“8”>Diners Club International</option>
                        <option value=“9”>American Express</option>
                        <option value=“10”>VISA Electron</option>
                    </select>
                    <label for="valor">Valor:</label>
                    <input type="text" name="valor" size="13" maxlength="17" class="form-control" required onkeypress="mascara(' R$###.###.###,##',this,event)">
                </div>

                <div class="form-group">
                    <label for="numcartao">Numero do cartão:</label><br>
                    <input type="text" name="numcartao" maxlength="14" required class="form-control" onkeypress="mascara('#### #### ####',this,event)">
                    <p><strong>somente numeros, sem pontos</strong></p>
                    <label for="numcartao">Código CVV:</label><br>

                    <input type="text" name="cvv" size="3" maxlength="3" required class="form-control" onkeypress="mascara('###',this,event)">
                    <p class="peq2"><strong>localizado atrás do cartão</strong></p>
                </div>

                <div class="form-group">
                    <button class="btn btn-outline-danger" style="margin-left: 100px;" type="button"
                        onclick="location.reload()">Apagar</button>
                    <input class="btn btn-outline-success" type="submit" value="Enviar" return false;>
                </div>

                <a href="/doar" class="voltar">Voltar para a página inicial</a>
            </form>
            
        </div>
    </div>
</body>
<script src="/cartao.js"></script>
</html>
    
    `);
}

function boleto(requisicao,resposta){//feito
    resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    
    <head>
        <meta charset="UTF-8">
        <title>Gerador de Boletos</title>
    
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
        <link rel="stylesheet" href="/DOACAO_BOLETO.css">
        <link href="/Boleto.png" rel="icon">
    </head>
    
    <body>
        <img src="/Boleto.png" alt="Logo Boleto" style="position: absolute; top: 0; left: 0; max-width: 150px;">
        <div class="container">
            <h1 class="mt-5">Pagamento Boleto</h1>
            <p>Gerador de boletos:</p>
            <img src="/Qrlogo.png" alt="QR Code Pix" style="max-width: 200px;" class="img-fluid">
            <p>ou</p>
            <form class="mt-4">
                <div class="mb-3">
                    <p>Clique aqui para gerar seu Boleto:</p>
                    <button type="button" class="btn btn-primary" onclick="redirecionarParaOutraPagina()">Gerar Boleto</button>
                    <script>
                        // Função JavaScript para redirecionar para outra página
                        function redirecionarParaOutraPagina() {
                            window.open("https://www.guiamuriae.com.br/wp-content/uploads/2017/01/Boleto-bancario-Foto-WC.jpg", "_blank");
                            window.location.href = '/doar'
                        }
                    </script>
                </div>
            </form><br><br> 
            <a href="/" class="text-black" style="font-size: 30px;">Voltar</a>
        </div>
    </body>
    
    </html>
        `);
}

function pix(requisicao,resposta){//feito
    resposta.end(`
    <!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Pagamento Pix</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/DOACAO_PIX.css">
    <link href="assets/images/pix2.png" rel="icon">

</head>

<body class="bg-secondary text-white">

    <img src="assets/images/pix2.png" alt="Logo Pix" style="position: absolute; top: 0; left: 0; max-height: 100px;">
    <div class="container">
        <h1 class="mt-5">Pagamento Pix</h1>
        <p>Escaneie o QR code abaixo com o seu aplicativo Pix para fazer o pagamento:</p>
        <img src="assets/images/pixdiff.png" alt="QR Code Pix" style="max-width: 180px;" class="img-fluid">
        <p>ou</p>
        <h5>Email: SavePets@org.br</h5>
        <h5>Numero de Telefone: (18) 99887-7665</h5>

        <br><br><br><br>
        <a href="/doar" class="text-black" style="font-size: 30px;">Voltar</a>
    </div>
</body>

</html>
    `);
}