let deck = [];
let opponentDeck = [];

let cardTypes = ["hearts", "spades", "diamonds", "clubs"];

let cardValues = [];
for (let i = 2; i <= 14; i++) {
    cardValues.push(i);
}
console.log("cardValues: ", cardValues);
console.log("------------------------------");

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
opponentDeck = createDeck();
console.log(deck);
console.log("------------------------------");
console.log("------------------------------");
console.log("------------------------------");

// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
// https://bost.ocks.org/mike/shuffle/
function shuffleDeck(deck) {
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

deck = shuffleDeck(deck);
opponentDeck = shuffleDeck(opponentDeck);
console.log("------------------------------");
console.log("Shuffled deck:");
console.log(deck);
console.log("------------------------------");

function renderCards(deck, deckElementID) {
    let deckElement = document.getElementById(deckElementID);
    deckElement.innerHTML = "";

    for (let i = 0; i < deck.length; i++) {
        let cardContainerElement = document.createElement("div");
        cardContainerElement.className = 'card-container';

        let cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.setAttribute('cardValue', deck[i].value);
        cardContainerElement.appendChild(cardElement);

        let cardFaceElement = document.createElement("div");
        cardFaceElement.className = 'card-face';

        let cardFaceValueElement = document.createElement("div");
        cardFaceValueElement.className = 'card-value';
        switch (deck[i].value) {
            case 11:
                cardFaceValueElement.innerHTML = "J";
                break;
            case 12:
                cardFaceValueElement.innerHTML = "Q";
                break;
            case 13:
                cardFaceValueElement.innerHTML = "K";
                break;
            case 14:
                cardFaceValueElement.innerHTML = "A";
                break;
            default:
                cardFaceValueElement.innerHTML = deck[i].value;
        }
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
    deck = createDeck();
    opponentDeck = createDeck();

    deck = shuffleDeck(deck);
    opponentDeck = shuffleDeck(opponentDeck);

    renderCards(deck, "deck");
    renderCards(opponentDeck, "opponent-deck");
}

function play () {
    if (deck[0].value > opponentDeck[0].value) {
        deck.push(opponentDeck[0]);
        opponentDeck.splice(0, 1);
        deck.push(deck.shift());
    } else if (deck[0].value < opponentDeck[0].value) {
        opponentDeck.push(deck[0]);
        deck.splice(0, 1);
        opponentDeck.push(opponentDeck.shift());
    } else if (deck[0].value === opponentDeck[0].value) {
        deck.push(deck.shift());
        opponentDeck.push(opponentDeck.shift());
    }

    renderCards(deck, "deck");
    renderCards(opponentDeck, "opponent-deck");
}

// for (let i = 1; i <= 10000; i++) {
//     play();
// }
