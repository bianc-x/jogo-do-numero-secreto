//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Digite um número de 1 a 10';

let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio(); 
let tentativas = 1;

function exibirTextoHTML(tag, texto){
    let variavel = document.querySelector(tag);
    variavel.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.25});
}

function exibirTextoInicial() {
    exibirTextoHTML('h1', 'Jogo do número secreto');
    exibirTextoHTML('p', 'Digite um número de 1 a 10');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroSecreto);
    if(chute == numeroSecreto){
        exibirTextoHTML('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoHTML('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        exibirTextoHTML('h1', 'Errou!');
        if(chute > numeroSecreto){
            exibirTextoHTML('p', 'O número é menor!');
        } else {
            exibirTextoHTML('p', 'O número é maior!');
        }
        tentativas++;
        limparChute();
    }
}


function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let qtdDeElementosNaLista = listaNumerosSorteados.length;
    if (qtdDeElementosNaLista == numeroMaximo){
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        console.log(listaNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparChute() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparChute();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
