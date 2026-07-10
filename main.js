const numeroSenha = document.querySelector('.parametro-senha__texto');
let tamanhoSenha = 12;
numeroSenha.textContent = tamanhoSenha;
const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVXYWZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvxywz';
const numeros = '0123456789';
const simbolos = '!@%*?';
const botoes = document.querySelectorAll('.parametro-senha__botao');
const campoSenha = document.querySelector('#campo-senha');
const checkbox = document.querySelectorAll('.checkbox');
const forcaSenha = document.querySelector('.forca');

botoes[0].onclick = diminuiTamanho;
botoes[1].onclick = aumentaTamanho;

function diminuiTamanho() {
    if (tamanhoSenha > 1) {
        tamanhoSenha--;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

function aumentaTamanho() {
    if (tamanhoSenha < 20) {
        tamanhoSenha++;
    }
    numeroSenha.textContent = tamanhoSenha;
    geraSenha();
}

for (i = 0; i < checkbox.length; i++) {
    checkbox[i].onclick = geraSenha;
}

geraSenha();

function geraSenha() {
    let alfabeto = '';

    if (checkbox[0].checked) {
        alfabeto = alfabeto + letrasMaiusculas;
    }

    if (checkbox[1].checked) {
        alfabeto = alfabeto + letrasMinusculas;
    }

    if (checkbox[2].checked) {
        alfabeto = alfabeto + numeros;
    }

    if (checkbox[3].checked) {
        alfabeto = alfabeto + simbolos;
    }

    let senha = '';

    for (let i = 0; i < tamanhoSenha; i++) {
        let numeroAleatorio = Math.random() * alfabeto.length;
        numeroAleatorio = Math.floor(numeroAleatorio);
        senha = senha + alfabeto[numeroAleatorio];
    }

    campoSenha.value = senha;
    classificaSenha(alfabeto.length);
}

function classificaSenha(tamanhoAlfabeto) {
    let entropia = tamanhoSenha * Math.log2(tamanhoAlfabeto);
    console.log(entropia);

    forcaSenha.classList.remove('fraca', 'media', 'forte');

    if (entropia > 57) {
        forcaSenha.classList.add('forte');
    } else if (entropia > 35 && entropia < 57) {
        forcaSenha.classList.add('media');
    } else if (entropia <= 35) {
        forcaSenha.classList.add('fraca');
    }

    const valorEntropia = document.querySelector('.entropia');
    valorEntropia.textContent = "Podem levar até " + Math.floor(2 ** entropia / (100e6 * 60 * 60 * 24)) + " dias para descobrir essa senha.";
}


/* ================================
   ALTERAÇÃO DE FUNDO DINÂMICO
   ================================ */

const coresFundo = [
    "#12002B", // roxo neon
    "#001F3F", // azul profundo
    "#002B1A", // verde neon escuro
    "#2B0025", // magenta
    "#2B1600", // laranja escuro
    "#18181B", // grafite
    "#001A2B", // azul petróleo
    "#30003D"  // violeta
];

let corAtual = 0;

function mudarCorFundo() {
    document.documentElement.style.setProperty(
        "--cor-de-fundo",
        coresFundo[corAtual]
    );

    corAtual++;

    if (corAtual >= coresFundo.length) {
        corAtual = 0;
    }
}

setInterval(mudarCorFundo, 3000);
