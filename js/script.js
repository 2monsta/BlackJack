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
	// var theDeck = freshDeck.slice();
	// var theDeck;
	$(".deal-button").click(()=>{
		var theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		// console.log(theDeck);
		// update the player and dealer hand ANGLE_instanced_arrays.apply.apply.apply.

		// 1st card to player hand
		var firstCard = theDeck.shift();
		playersHand.push(firstCard);
		// 1st card to dealer hand
		firstCard = theDeck.shift();
		dealersHand.push(firstCard);
		// 2nd card to player hand
		firstCard = theDeck.shift();
		playersHand.push(firstCard);
		// 2nd card to dealer hand
		firstCard = theDeck.shift();
		dealersHand.push(firstCard);

		placeCard("player", 1, playersHand[0]);
		// placeCard("dealer", 1, dealersHand[0]);
		placeCard("player", 2, playersHand[1]);

		placeCard("dealer", 1, dealersHand[0]);
		placeCard("dealer", 2, dealersHand[0]);
		
		
	});

	$(".hit-button").click(()=>{
		
	});

	$(".stand-button").click(()=>{
		
	});
	
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
	function shuffleDeck(deck){
		for(let i = 0; i<50000; i++){
			var rand1 = Math.floor(Math.random()* deck.length);
			var rand2 = Math.floor(Math.random()* deck.length);
			// switch the deck[rand1] with thedeck[rand2];
			var temp = deck[rand1];
			deck[rand1] = deck[rand2];
			deck[rand2] = temp;
		}
		return deck;
	}
	function placeCard(who, where, whatToPlace){
		var classSelector = `.${who}-cards .card-${where}`;
		// set the html of the div with .who-cards .card-where with the image
		$(classSelector).html(`<img src='images/cards/${whatToPlace}.png'/>`)
	}


});