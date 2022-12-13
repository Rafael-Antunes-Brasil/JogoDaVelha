//Dados iniciais
var quadro = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};

var vez = '';
var aviso = '';
var jogando = false;
reset();

//Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});


//Funçoes
function reset(){
    aviso = '';
    vez = escolherJogador();
    zerarQuadro();
    jogando = true;

    rendQuadro()
    rendInfo()
}

function escolherJogador(){
    var jog = Math.floor(Math.random() * 10);
    return (jog % 2) === 0 ? 'x' : 'o';
}

function zerarQuadro(){
    for(var i in quadro){
        quadro[i] = '';
    }
}

function rendQuadro(){
    for(var i in quadro){
        var item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = quadro[i];
    }
    verJogo();
}

function rendInfo(){
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.resultado').innerHTML = aviso;
}

function itemClick(casa){
    var item = casa.target.getAttribute('data-item');
    if(jogando && quadro[item] === ''){
        quadro[item] = vez;
        rendQuadro();
        trocaVez();
    }
}

function trocaVez(){
    vez = (vez === 'x') ? 'o' : 'x';
    rendInfo();
}

function verJogo(){
    if(verGanhador('x')){
        aviso = 'O "x" venceu';
        jogando = false;
    } else if(verGanhador('o')){
        aviso = 'O "o" venceu';
        jogando = false;
    } else if(cheio()){
        aviso = 'Deu empate';
        jogando = false;
    }
}

function verGanhador(jogador){
    var pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(var j in pos){
        var a = pos[j].split(',');
        var venceu = a.every(opcao => quadro[opcao] === jogador);
        if(venceu) {
            return true;
        }
    }
}

function cheio(){
    for(var i in quadro){
        if(quadro[i] === '') {
            return false;
        }
    }
    return true;
}