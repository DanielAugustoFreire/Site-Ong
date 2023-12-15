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
        maxAge: 1000 * 60 * 30 //Sessão por 30 Minutos
    }
}))

app.get('/', PaginaMenu);
app.get('/paginaGerenciamento',PaginaGerenciamento);
app.get('/Quem_somos',QuemSomos);
app.get('/doar',Doar);
app.get('/seja_um_voluntario',SejaUmVoluntario);
app.get('/noticia',Noticias);



app.post('/validarLogin', (requisicao, resposta) => {
    const email = requisicao.body.email;
    const senha = requisicao.body.senha;
    if (email === 'admin@admin.adm' && senha === 'admin'){
        usuarioAutenticado = true;
        resposta.redirect('/');
    }

})

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

function PaginaMenu(requisicao, resposta) {
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
                    <a class="nav-link active" aria-current="page" href="index.html">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="noticias.html">Notícias</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="quem_somos.html">Quem Somos?</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="DOACAO_MAIN.html">Doar</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" id="voluntario" href="seja_um_voluntario.html">Seja Voluntário</a>
                  </li>
                </ul>
              </div>
              <button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button>
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
                    <p><a class="btn btn-lg btn-warning my-2" href="DOACAO_MAIN.html">Doe Agora!</a></p>
                  </div>
                </div> 
              </div>
              <div class="carousel-item"> 
                <img src="assets/images/cachorro_neve.jpg" width="100%" height="100%">
                <div class="container">
                  <div class="carousel-caption text-black">
                    <h1>Conquistas</h1>
                    <p id="shadow" class="">10.000T+ de Alimentos Arrecadados, +320 Caes Resgatados, 100+ Voluntarios</p>
                    <p><a class="btn btn-lg btn-warning my-2" href="noticias.html">Acessar</a></p>
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
                    </p><a href="quem_somos.html" class="link-light">Descubra mais sobre Nos:</a></div>
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
                    </p><a href="quem_somos.html" class="link-dark">Descubra mais sobre Nos:</a>
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
            <li class="nav-item"><a href="index.html" class="nav-link px-2 text-black">Home</a></li>
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

function PaginaGerenciamento(requisicao, resposta){
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
              <a class="nav-link" aria-current="page" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="noticias.html">Notícias</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="quem_somos.html">Quem Somos?</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="DOACAO_MAIN.html">Doar</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" id="voluntario" href="gerenciamento.html">Gerenciar Voluntario</a>
            </li>
          </ul>
        </div>
        <button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button>
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
      <li class="nav-item"><a href="index.html" class="nav-link px-2 text-black">Home</a></li>
    </ul>
  </footer>
</body>
<script src="/gerenciamento.js"></script>
<script src="/tabela.js"></script>


</html>
    `);
}

function QuemSomos(requisicao,resposta){
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
          <a class="navbar-brand" href="#"><img src="/logo3.png" width="40px" alt=""></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarCollapse">
            <ul class="navbar-nav"> 
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="index.html">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="noticias.html">Notícias</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="quem_somos.html">Quem Somos?</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="DOACAO_MAIN.html">Doar</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="voluntario" href="seja_um_voluntario.html">Seja Voluntário</a>
              </li>
            </ul>
          </div>
          <button class="btn btn-success" onclick="Sair()" id="LOGADO">LOGIN</button>
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
                  <a href="seja_um_voluntario.html" class="link-light">Voluntarie-se:</a></div>
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
        <li class="nav-item"><a href="index.html" class="nav-link px-2 text-black">Home</a></li>
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

function Doar(requisicao,resposta){
    resposta.end(``);
}

function SejaUmVoluntario(requisicao,resposta){
    resposta.end(``);
}

function Noticias(requisicao,resposta){
    resposta.end(``);
}