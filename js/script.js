$(document).ready(()=>{
	//TODO: make sure K, Q , J all equal to 10
	//TODO: make ace equal to 1 or 11 depends on bust
	//TODO: make a delay on showing the dealer's card
	//TODO: add a bet system or win systsem/ play for multiple hands
	//TODO: the game should stop when the game is over
	//TODO: 
	var playersHand = [];
	var dealersHand = [];
	const freshDeck = createDeck();
	// make a full copy of the deck using slice, don't point at it
	// var theDeck = freshDeck.slice();
	var theDeck;
	$(".deal-button").click(()=>{
		theDeck = freshDeck.slice();
		theDeck = shuffleDeck(theDeck);
		playersHand = [];
		dealersHand = [];
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
		console.log(dealersHand);
		console.log(playersHand);
		// placeCard image to the screen
		placeCard("player", 1, playersHand[0]);
		placeCard("player", 2, playersHand[1]);
		placeCard("dealer", 1, dealersHand[0]);
		placeCard("dealer", 2, dealersHand[1]);
		
		// calculate the total
		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, "dealer");
		
	});

	$(".hit-button").click(()=>{
		// 1. get the top card
		// 2. push to the players hand
		// 3.put the card in the DOM
		// 4. calculate the total

		var topCard = theDeck.shift();
		playersHand.push(topCard);
		placeCard("player", playersHand.length, topCard /* playersHand[playersHand.length-1] */)
		calculateTotal(playersHand, "player");

	});

	$(".stand-button").click(()=>{
		var dealerTotal = calculateTotal(dealersHand, "dealer");
		while(dealerTotal<17){
			var topCard = theDeck.shift();
			dealersHand.push(topCard);
			placeCard("dealer", dealersHand.length, topCard);
			dealerTotal = calculateTotal(dealersHand, "dealer");
		}
		checkWin();
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

	function calculateTotal(hand, who){
		// purpose:
		// 1. find out the number and return it;
		// 2. update the DOM with the right number for the right player
		var handTotal = 0;
		// as we loop through the hand, we need a var for each cards value
		var thisCardsValue = 0;
		for(let i = 0; i<hand.length; i++){
			// copy onto this cardsvalue the entire string except for the last character
			thisCardsValue = Number(hand[i].slice(0,-1));
			handTotal +=thisCardsValue;
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}
	function checkWin(){
		var playersTotal = calculateTotal(playersHand, "player");
		var dealersTotal = calculateTotal(dealersHand, "dealer");

		// If the player has > 21, player busts and loses
		// if the dealer has > 21, dealer busts and loses;
		// if playerhand.length == 2 and players total ==21 then BLACKJACK
		// if dealersHand.length == 2 and dealerTotal == 32 ....Blackjack
		// if player > dealer 
		if(playersTotal > 21){
			console.log("you lose");
		}else if(playersTotal == 21 && playersHand.length == 2){
			console.log("blackjack");
		}else if(dealersTotal > 21){
			console.log("dealer loses");
		}else if(playersTotal < dealersTotal){
			console.log("you lose to dealer");
		}else if (playersTotal > dealersTotal){
			console.log("you win");
		}else{
			console.log("TIE");
		}
	}
});