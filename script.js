let nome = null;
let modelo1 = "";
let gola1 = "";
let tecido1 = "";
let link = "";
let numPedidos = 0;

const URL_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";

verificarNome();
function verificarNome() {
  nome = prompt("Qual seu nome?");

  while (nome === null || nome === undefined || nome === "") {
    nome = prompt("Qual seu nome?");
  }
}

function selecionarModelo(bordermodelo, modelo) {
  const elementoSelecionado = document.querySelector(
    ".bordermodelo.selecionado"
  );

  if (elementoSelecionado !== null) {
    elementoSelecionado.classList.remove("selecionado");
  } else {
    numPedidos = numPedidos + 1;
  }
  bordermodelo.classList.add("selecionado");

  modelo1 = modelo;
}

function selecionarGola(bordergola, gola) {
  const elementoSelecionado = document.querySelector(".bordergola.selecionado");

  if (elementoSelecionado !== null) {
    elementoSelecionado.classList.remove("selecionado");
  } else {
    numPedidos = numPedidos + 1;
  }

  bordergola.classList.add("selecionado");

  gola1 = gola;
}

function selecionarTecido(bordertecido, tecido) {
  const elementoSelecionado = document.querySelector(
    ".bordertecido.selecionado"
  );

  if (elementoSelecionado !== null) {
    elementoSelecionado.classList.remove("selecionado");
  } else {
    numPedidos = numPedidos + 1;
  }
  bordertecido.classList.add("selecionado");
  tecido1 = tecido;
}

function verificarLink() {
  link = document.querySelector("input").value;

  if (!link.includes("https://")) {
    alert("URL inválida");
    return;
  }
  link = link;
  validarPedido();
}

function validarPedido() {
  const botaoPedido = document.querySelector("button");
  if (numPedidos === 3) {
    botaoPedido.classList.add("ativo");
  }
}

function confirmarPedido() {
  pedido = {
    model: modelo1,
    neck: gola1,
    material: tecido1,
    image: link,
    owner: nome,
    author: nome,
  };

  const promise = axios.post(
    "https://mock-api.driven.com.br/api/v4/shirts-api/shirts",
    pedido
  );
  promise.then(tratarSucesso);
  promise.catch(tratarFalha);
}

function tratarSucesso() {
  alert("Pedido enviado");
}
function tratarFalha() {
  alert("Pedido não foi enviado");
}

function obterPedido() {
  const promise = axios.get(URL_API);
  promise.then(renderizarPedidos);
  promise.catch(() => console.log("Erro"));
}

function renderizarPedidos(response) {
  pedidos = response.data;
  allpedidos = document.querySelector(".camisetas");
  for (let i = pedidos.length - 10; i < pedidos.length; i++) {
    allpedidos.innerHTML += `<div class="camisa">
    <div class="camisa-img">
      <img src="${pedidos[i].image}">
    </div>
    <div class="criador">
      <h4>Criador: ${pedidos[i].owner}</h4>
    </div>
  </div>`;
  }
}
obterPedido();
