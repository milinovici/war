let deck = [];

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
console.log("------------------------------");
console.log("Shuffled deck:");
console.log(deck);
console.log("------------------------------");
