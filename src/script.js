let deck = [];

let cardTypes = ["hearts", "spades", "diamonds", "clubs"];

let cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
    let deck = [];

    for (let i = 0; i < cardTypes.length; i++) {
        console.log(cardTypes[i]);
        for (let j = 0; j < cardValues.length; j++) {
            console.log(cardValues[j]);
            deck.push({value: cardValues[j], type: cardTypes[i]});
        }
    }

    return deck;
}

deck = createDeck();
console.log(deck);
console.log("------------------------------");
console.log("------------------------------");
console.log("------------------------------");

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// https://bost.ocks.org/mike/shuffle/
function shuffleDeck() {
    let shuffledDeck = deck.slice(),
        searchLength = shuffledDeck.length -1,
        randomNr,
        randomCard;

    for (searchLength; searchLength > 0; searchLength--) {
        console.log(`searchLength: ${searchLength}`);

        // Random number between 0 and searchLength:
        randomNr = Math.floor(Math.random() * (searchLength + 1));

        randomCard = shuffledDeck[randomNr];
        shuffledDeck[randomNr] = shuffledDeck[searchLength];
        shuffledDeck[searchLength] = randomCard;
    }

    return shuffledDeck;
}

deck = shuffleDeck();
console.log("------------------------------");
console.log("Shuffled deck:");
console.log(deck);
console.log("------------------------------");

function renderCards() {
    let deckElement = document.getElementById("deck");
    deckElement.innerHTML = "";

    for (let i = 0; i < deck.length; i++) {
        let cardContainerElement = document.createElement("div");
        cardContainerElement.className = 'card-container';

        let cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.id = `card-${i+1}`;
        cardContainerElement.appendChild(cardElement);

        let cardFaceElement = document.createElement("div");
        cardFaceElement.className = 'card-face';

        let cardFaceValueElement = document.createElement("div");
        cardFaceValueElement.className = 'card-value';
        cardFaceValueElement.innerHTML = deck[i].value;
        cardFaceElement.appendChild(cardFaceValueElement);

        let cardFaceTypeElement = document.createElement("div");
        cardFaceElement.appendChild(cardFaceTypeElement);
        switch (deck[i].type) {
            case "hearts":
                cardFaceTypeElement.className = 'card-type-hearts';
                break;
            case "spades":
                cardFaceTypeElement.className = 'card-type-spades';
                break;
            case "diamonds":
                cardFaceTypeElement.className = 'card-type-diamonds';
                break;
            case "clubs":
                cardFaceTypeElement.className = 'card-type-clubs';
                break;
            default:
                break;
        }

        let cardBackElement = document.createElement("div");
        cardBackElement.className = 'card-back';

        cardElement.appendChild(cardFaceElement);
        cardElement.appendChild(cardBackElement);
        deckElement.appendChild(cardContainerElement);
    }
}

function dealCards() {
    deck = shuffleDeck();
    renderCards();
}
