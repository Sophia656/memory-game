const body = document.querySelector('body');
let title = document.getElementById('title');
let box = document.getElementById('box');
let winner = document.getElementById('winner');
let buttonsBox = document.querySelector('.size');
buttonsBox.style.display = 'none';

box.style.display = 'none';
winner.style.display = 'none';


// preloading
let showTitle = () => {
    title.style.opacity = 1;
    let interTitle = setInterval(() => {
        title.style.opacity -= 0.01;
        if (title.style.opacity <= 0.01){
            clearInterval(interTitle);
            title.style.display = 'none';
            buttonsBox.style.display = '';
        };
    }, 20);
};

window.onload = () => {
    setTimeout(() => showTitle(title), 800);
};


// шафлим карточки
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
};


// создаем карточки
let cardsBox = [];
let isAllOpen = 0;

const openCards = {
    first: null,
    second: null,
}

const createCards = (size) => {
    box.style.gridTemplate = `repeat(${size}, auto) / repeat(${size}, auto)`;

    for (let i = 0; i < size * size; i++){
        const card = document.createElement('div');
        card.classList.add('card');
        const frontSide = document.createElement('img');
        frontSide.classList.add('cover');
        frontSide.src = '../img/chef.png';
        
        const backSide = document.createElement('img');
        backSide.classList.add('reverse');
        if (i < size * size / 2) {
            backSide.src = `../img/${i}.png`;
        } else {
            backSide.src = `../img/${i - (size * size / 2)}.png`;
        };

        card.appendChild(frontSide);
        card.appendChild(backSide);
        cardsBox.push(card);
    };


    buttonsBox.style.display = 'none';
    box.style.display = '';
    shuffle(cardsBox);

        
    // проверка на пару
    const checkPair = () => {

        if (openCards.first.childNodes[1].src !== openCards.second.childNodes[1].src){ 
            openCards.first.childNodes[0].classList.remove('hidden');
            openCards.second.childNodes[0].classList.remove('hidden');        
        } else {
            // все карты открыты
            isAllOpen += 1;
            if (isAllOpen === (size * size / 2)){
                box.style.display = "none";
                winner.style.display = '';
            }
        }

        openCards.first = null;
        openCards.second = null;
        box.style.pointerEvents = '';
    }

    cardsBox.forEach((card) => {

        card.addEventListener('click', () => {
    
            card.firstChild.classList.add('hidden');
            if (openCards.first === null){
                openCards.first = card;
            } else {
                openCards.second = card;
                box.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    checkPair();
                }, 1000);
            }
        });
    });

    cardsBox.forEach(function (element, index, array) {
        box.appendChild(element);
    });
}


//выбираем размера поля
const sizes = [2, 4, 6];

sizes.forEach((size, index) => {
    const buttonFor = document.createElement('button');
    buttonFor.classList.add('size_button');
    buttonFor.innerText = `${size}X${size}`;
    buttonFor.addEventListener('click', () => createCards(size));
    buttonsBox.appendChild(buttonFor);
});


// play again
const winnerText = document.createElement('h2');
winnerText.innerHTML = 'YOU ARE WIN!';
winnerText.classList.add('winnerText');
const winnerButton = document.createElement('button');
winnerButton.innerHTML = 'LET\'S PLAY AGAIN!';
winnerButton.classList.add('winnerButton');

winner.appendChild(winnerText);
winner.appendChild(winnerButton);

winnerButton.addEventListener('click', () => {
    cardsBox.forEach((card) => {
        card.firstChild.classList.remove('hidden');
        card.innerHTML = '';
    });

    box.innerHTML = '';
    cardsBox = [];
    isAllOpen = 0;
    winner.style.display = 'none';
    buttonsBox.style.display = '';
});
