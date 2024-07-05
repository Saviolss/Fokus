const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const musicaPlay = new Audio('sons/play.wav');
const musicaPausar = new Audio('sons/pause.mp3');
const musicaFinalizado = new Audio('sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');
const tempoNaTela = document.querySelector('#timer');
const botao = document.querySelector('#start-pause span');
const botaoIcone = document.querySelector('.app__card-primary-butto-icon');

let contagemDecorridoSegundos = 1500;
let intervaloId = null;

focoBt.addEventListener('click', () => {
    contagemDecorridoSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    contagemDecorridoSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click' ,() => {
    contagemDecorridoSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto (contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    switch (contexto) {
        case "foco":
            titulo.innerHTML =`Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML =`Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML =`Hora de voltar à superficie.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

const contagemRegressiva = () => {
    if (contagemDecorridoSegundos <= 0){
        musicaFinalizado.play()
        botaoIcone.setAttribute('src',`/imagens/play_arrow.png`);
        botao.textContent = 'Começar'
        const focoAtivado = html.getAttribute('data-contexto') == 'foco';
        if (focoAtivado) {
            const focoFinalizado = new CustomEvent ('focoFinalizado')
            document.dispatchEvent(focoFinalizado);
        }
        zerar();
        return;
    }
    contagemDecorridoSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarPausar);

function iniciarPausar () {
    if(intervaloId){
        botaoIcone.setAttribute('src',`/imagens/play_arrow.png`);
        botao.textContent = 'Continuar'
        musicaPausar.play()
        zerar()
        return
    }
    intervaloId = setInterval (contagemRegressiva, 1000);
    musicaPlay.play()
    botaoIcone.setAttribute('src',`/imagens/pause.png`);
    botao.textContent = 'Pausar'
}

function zerar () {
    clearInterval(intervaloId)
    intervaloId=null;
}

function mostrarTempo () {
    const tempo = new Date (contagemDecorridoSegundos *1000);
     tempoCalculado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}),
    tempoNaTela.innerHTML = `${tempoCalculado}`;
}

mostrarTempo();