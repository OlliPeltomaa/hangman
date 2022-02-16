class HangmanWord {
    constructor(hint, word) {
        this.hint = hint;
        this.word = word;
    }
}

const rdj = new HangmanWord('Iron Manin näyttelijä', 'Robert Downey Jr');
const elon = new HangmanWord('Etelä-Afrikkalainen miljardööri', 'Elon Musk');
const lauri = new HangmanWord('Jyväskyläläinen koripalloilija', 'Lauri Markkanen');
const js = new HangmanWord('Eräs ohjelmointikieli', 'Javascript');
const stack = new HangmanWord('Ohjelmoijan apu', 'Stack Overflow');
const mersu = new HangmanWord('Automerkki', 'Mercedes Bentz');
const hese = new HangmanWord('Pikaruokala', 'Hesburger');
const nyc = new HangmanWord('Iso omena', 'New York City');
const jobs = new HangmanWord('Edesmennyt amerikkalainen visionääri', 'Steve Jobs');
const nf = new HangmanWord('Striimauspalvelu', 'Netflix');


const words = [rdj, elon, lauri, js, stack, mersu, hese, nyc, jobs, nf];
const imgs = ['hang2.jpg', 'hang3.jpg', 'hang4.jpg', 'hang5.jpg'];
let points = 0;


const newWord = document.getElementById('newWord');
const result = document.getElementById('result');
const canvas = document.getElementById('canvas');
const menu = document.getElementById('menu');
const hint = document.getElementById('hint');
const start = document.getElementById('start');
const letters = document.getElementById('letters');
let container = document.getElementById('container');
let randWord;
let image = document.getElementById('image');

function startGame() {
    result.style.display ='none';
    points = 0;
    image.src = 'hang1.jpg';
    canvas.style.display='block';
    hint.style.display = 'block';
    start.textContent = 'Uusi sana';
    menu.style.display = 'none';
    letters.style.display = 'block';
    randWord = words[Math.floor(Math.random() * words.length)];
    hint.textContent = randWord.hint;
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    for (i = 0; i < randWord.word.length; i++) {
        let letter = document.createElement('div');
        if (randWord.word[i] === ' ') {
            letter.setAttribute('class', 'space');
        } else {
            letter.setAttribute('class', 'letter');
            letter.textContent = '?';
        }
        container.appendChild(letter);
    }
}

function handleClick(x) {
    if (!checkLetter(x)) {
        image.src = imgs[points];
        points++ 
        if (points == 4) {
            showResults('Hävisit pelin!')
        }
    }
    if (gameOver()) {
        showResults('Voitit pelin!')
    }
}

function showResults(x) {
    result.style.display = 'block';
    result.textContent = x;
    letters.style.display ='none';
    hint.style.display = 'none';
    start.textContent = 'Pelaa';
}

function checkLetter(x) {
    let bool = false;
    for (i = 0; i < randWord.word.length; i++) {
        if (randWord.word.charAt(i).toUpperCase() === x) {
            container.childNodes[i].textContent = x;
            bool = true;
        }
    }
    return bool;
}

function gameOver() {
    for (i = 0; i < container.childNodes.length; i++) {
        if (container.childNodes[i].textContent === '?') {
            return false;
        }
    }
    return true;
}