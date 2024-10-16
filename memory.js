const animals = [
    { name: 'leão', img: 'imagens/leao.webp' },
    { name: 'elefante', img: 'imagens/elefante.webp' },
    { name: 'macaco', img: 'imagens/macaco.png' },
    { name: 'tigre', img: 'imagens/tigre.png' },
    { name: 'pavão', img: 'imagens/pavao.png' },
    { name: 'zebra', img: 'imagens/zebra.png' },
    { name: 'girafa', img: 'imagens/girafa.png' },
    { name: 'cobra', img: 'imagens/cobra.png' }
];

// Duplica os animais para criar os pares
const cardValues = [...animals, ...animals]
    .sort(() => Math.random() - 0.5); // Embaralha os cards

const grid = document.getElementById('grid');
let flippedCards = [];
let matchedCards = [];

const createCardElement = (card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.setAttribute('data-name', card.name);

    // Adiciona a imagem
    const imgElement = document.createElement('img');
    imgElement.src = card.img;
    imgElement.alt = card.name;

    cardElement.appendChild(imgElement);
    cardElement.addEventListener('click', () => flipCard(cardElement, card));
    return cardElement;
};

const flipCard = (cardElement, card) => {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && !cardElement.classList.contains('matched')) {
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        const imgElement = cardElement.querySelector('img');
        imgElement.style.display = 'block'; // Mostra a imagem

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
};

const checkForMatch = () => {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.getAttribute('data-name') === secondCard.getAttribute('data-name')) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.querySelector('img').style.display = 'none'; // Esconde a imagem
            secondCard.classList.remove('flipped');
            secondCard.querySelector('img').style.display = 'none'; // Esconde a imagem
        }, 1000);
    }

    flippedCards = [];

    if (matchedCards.length === cardValues.length) {
        setTimeout(() => {
            showWinnerMessage();
        }, 500);
    }
};

const showWinnerMessage = () => {
    // Exibe a mensagem de vitória
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.style.display = 'block';

    // Inicia a animação de confete
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });
};

const initGame = () => {
    grid.innerHTML = '';
    matchedCards = []; // Reseta os cards correspondidos
    flippedCards = []; // Reseta os cards virados
    cardValues.sort(() => Math.random() - 0.5); // Embaralha novamente
    document.getElementById('winnerMessage').style.display = 'none'; // Esconde a mensagem de vitória

    cardValues.forEach((card) => {
        const cardElement = createCardElement(card);
        grid.appendChild(cardElement);
    });
};

document.getElementById('restart').addEventListener('click', initGame);
initGame();
