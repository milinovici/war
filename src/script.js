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
        cardElement.id = `${deck[i].value}-${deck[i].type}-${deckElementID}`;
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

let disablePlayBtnTimeoutHandle;

function dealCards() {
    clearTimeout(disablePlayBtnTimeoutHandle);

    document.getElementsByClassName("play-btn")[0].disabled = true;
    document.getElementsByClassName("play-btn")[0].classList.add('btn--disabled');

    deck = createDeck();
    opponentDeck = createDeck();

    deck = shuffleDeck(deck);
    opponentDeck = shuffleDeck(opponentDeck);

    renderCards(deck, "deck");
    renderCards(opponentDeck, "opponent-deck");

    var cardElements = document.getElementsByClassName("card");
    for (var i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.add('card--anim')
    }

    disablePlayBtnTimeoutHandle = setTimeout(function() {
        document.getElementsByClassName("play-btn")[0].disabled = false;
        document.getElementsByClassName("play-btn")[0].classList.remove('btn--disabled');
    }, 2000);
}

function play () {
    var cardElements = document.getElementsByClassName("card");
    for (var i = 0; i < cardElements.length; i++) {
        cardElements[i].classList.remove('card--anim')
    }

    document.getElementsByClassName("play-btn")[0].disabled = true;
    document.getElementsByClassName("play-btn")[0].classList.toggle('btn--disabled');
    document.getElementsByClassName("deal-btn")[0].disabled = true;
    document.getElementsByClassName("deal-btn")[0].classList.toggle('btn--disabled');

    let firstCardElement = document.getElementById(`${deck[0].value}-${deck[0].type}-deck`);
    let firstOpponentCardElement = document.getElementById(`${opponentDeck[0].value}-${opponentDeck[0].type}-opponent-deck`);

    firstCardElement.style.transform = "rotateY(0)";
    firstOpponentCardElement.style.transform = "rotateY(0)";

    if (deck[0].value > opponentDeck[0].value) {
        deck.push(opponentDeck[0]);
        opponentDeck.splice(0, 1);
        deck.push(deck.shift());
        document.getElementById("deck").classList.toggle('play-board--flash');
    } else if (deck[0].value < opponentDeck[0].value) {
        opponentDeck.push(deck[0]);
        deck.splice(0, 1);
        opponentDeck.push(opponentDeck.shift());
        document.getElementById("opponent-deck").classList.toggle('play-board--flash');
    } else if (deck[0].value === opponentDeck[0].value) {
        deck.push(deck.shift());
        opponentDeck.push(opponentDeck.shift());
    }

    setTimeout(function() {
        document.getElementById("deck").classList.remove('play-board--flash');
        document.getElementById("opponent-deck").classList.remove('play-board--flash');

        renderCards(deck, "deck");
        renderCards(opponentDeck, "opponent-deck");

        document.getElementsByClassName("play-btn")[0].disabled = false;
        document.getElementsByClassName("play-btn")[0].classList.toggle('btn--disabled');
        document.getElementsByClassName("deal-btn")[0].disabled = false;
        document.getElementsByClassName("deal-btn")[0].classList.toggle('btn--disabled');
    }, 1000);
}
