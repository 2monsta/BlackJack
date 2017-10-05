$(document).ready(()=>{
	//TODO: blackjack deal function
	//TODO: create deck function
	//TODO: shuffle deck function
	//TODO: Add card[0] and card[2] to player hand, 1 and 3 to dealer
	//TODO: place card function
	//TODO: push card onto player array
	var playersHand = [];
	var dealersHand = [];
	const freshDeck = createDeck();
	// make a full copy of the deck using slice, don't point at it
	var theDeck = freshDeck.slice();


	function createDeck(){
		var newDeck = [];
		// card = suit + value;o
		// outer loop for suit
		// 		inner loop for value
		// suits is a constant, it cannot be changed
		const suits = ["h", "s", "d", "c"];
		for(let s = 0; s<suits.length; s++){
			for(let c = 1; c<=13; c++){
				newDeck.push(c + suits[s]);
			}
		}
		// console.log(newDeck);
		return newDeck;
	}
	function shuffleDeck(){
		for(let i = 0; i<50000; i++){
			var rand1 = Math.floor(Math.random()* theDeck.length);
			var rand2 = Math.floor(Math.random()* theDeck.length);
			// switch the deck[rand1] with thedeck[rand2];
			var temp = theDeck[rand1];
			theDeck[rand1] = theDeck[rand2];
			theDeck[rand2] = temp;
		}
	}
});