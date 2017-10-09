$(document).ready(()=>{
	const freshDeck = createDeck();
	var theDeck = [];
	var playersHand = [];
	var dealersHand = [];

	function createDeck(){
		var newDeck = [];
		const suits = ["h", "s", "d", "c"];
		for(let s = 0; s< suits.length; s++){
			for(let c=1; c<=13; c++){
				newDeck.push(c + suits[s]);
			}
		}
		return newDeck;
	}
	function shuffleDeck(theDeck){
		for(let i = 0; i<50000; i++){
			var rand1 = Math.floor(Math.random()*theDeck.length);
			var rand2 = Math.floor(Math.random()*theDeck.length);
			var temp = theDeck[rand1];
			theDeck[rand1] = theDeck[rand2];
			theDeck[rand2] = temp;
		}
		return theDeck;
	}
	/*  who is player or dealer, where is what cards being grabbed */
	// card is referring to the images located in the image folder
	function placeCard(who, where, card){
		var classSelector = `.${who}-cards .card-${where}`;
		$(classSelector).html(`<img src = "images/cards/${card}.png">`)
	}
	// hand is the array to total up and who is which players hand that we need to caluclate
	function calculateTotal(hand, who){
		var handTotal = 0;
		// this part gets rid of the suits
		var thisCardsValue = 0;
		for(let i = 0; i<hand.length; i++){
			// this cuts off the last character
			thisCardsValue = Number(hand[i].slice(0,-1));
			if(thisCardsValue == 1){
				if(handTotal > 10){
					thisCardsValue = 1;
				}else{
					thisCardsValue = 11;
				}
			}else if(thisCardsValue>10){
				thisCardsValue = 10;
			}
			handTotal += thisCardsValue;
		}
		var classSelector = `.${who}-total`;
		$(classSelector).html(handTotal);
		return handTotal;
	}

	$(".deal-button").click(()=>{
		// console.log("user clicked me");
		playersHand = [];
		dealersHand = [];
		theDeck = freshDeck.slice();
		shuffleDeck(theDeck);
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		playersHand.push(theDeck.shift());
		dealersHand.push(theDeck.shift());
		console.log(playersHand);
		console.log(dealersHand);
		placeCard("player", 1, playersHand[0]);
		placeCard("player", 2, playersHand[1]);
		placeCard("dealer", 1, dealersHand[0]);
		placeCard("dealer", 2, dealersHand[1]);


		calculateTotal(playersHand, "player");
		calculateTotal(dealersHand, "dealer");
	});
	$(".hit-button").click(()=>{
		console.log("user clicked me");
	});
	$(".stand-button").click(()=>{
		console.log("user clicked me");
	});
});