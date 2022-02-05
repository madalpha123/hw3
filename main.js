document.addEventListener("DOMContentLoaded", () => {

    /* array containing arrays of the letters guessed so far.*/
    let guessedLetters = [[], [], [], [], [], []];

    /* The index (0-29) of the current/next square to be filled */
    let indexOfSquareToFill = 0;

    /* The number of fully guessed words so far. */
    let guessedWordCount = 0;

    //boolean to track game over or not
    let gameOver = false;

    /* The html elements for all the keyboard keys. */
    const keys = document.querySelectorAll(".keyboard-row button");

    let mostRecentGuess = "No guesses have been made!";
    let wordToGuess = "pizza";
    
    function getCurrentWordArray() {
		return guessedLetters[guessedWordCount];
    }

    function updateGuessedLetters(letter) {
	const currentWordArray = getCurrentWordArray();
		if (currentWordArray.length < 5) {
		    currentWordArray.push(letter);
		    const currentSquareElement = document.getElementById(String(indexOfSquareToFill));
		    currentSquareElement.textContent = letter;
		    indexOfSquareToFill += 1;
		}
    }

    function determineGuessColors() {
    	let guessColors = ['gray', 'gray', 'gray', 'gray', 'gray'];

    	for (let i = 0; i <= 4; i++) {
    		if (wordToGuess[i] === mostRecentGuess[i]) {
    			guessColors[i] = 'lightgreen';
    		}
    	}

    	for (let i = 0; i <= 4; i++) {
    		//don't count the green letter as part of the yellowing process
    		if (guessColors[i] !== 'lightgreen') {
				for (let j = 0; j <= 4; j++) {
					//don't allow yellow to take over green
	    			if (wordToGuess[i] === mostRecentGuess[j] && guessColors[j] !== 'lightgreen') {
	    				guessColors[j] = 'yellow';
	    			}
	    		}
	    	}
    	}

    	console.log(guessColors);
    	return guessColors;
    }

    function handleSubmitWord() {
		const currentWordArray = getCurrentWordArray();
		if (currentWordArray.length !== 5) {
		    window.alert("You must enter 5 letters before submitting!");
		} else {
	   	    mostRecentGuess = currentWordArray.join("");

	   	    if (!wordList.includes(mostRecentGuess)) {
	   	    	window.alert("Please enter a valid word.");
	   	    	return;
	   	    }

		    window.alert(`You guessed '${mostRecentGuess}'`);
	 	    guessedWordCount += 1;

	 	    if (mostRecentGuess === wordToGuess) {
	 	    	window.alert("You win!");
	 	    	gameOver = true;
	 	    }
	 	    else {
	 	    	window.alert("You guessed wrong! Letters will be colored as a hint.");
	 	    	let guessColors = determineGuessColors();

	 	    	//handle the actual setting of text color
	 	    	let indexOfSquareToColor = indexOfSquareToFill - 5;
	 	    	for (let i = 0; i <= 4; i++) {
	 	    		const squareElement = document.getElementById(indexOfSquareToColor + i);
	 	    		squareElement.style.color = guessColors[i];
	 	    	}
	 	    }
		}
    }

    function handleDelKey() {
    	const currentWordArray = getCurrentWordArray();
    	if (currentWordArray.length > 0) {
    		currentWordArray.pop();
    		indexOfSquareToFill--;
    		const squareElement = document.getElementById(indexOfSquareToFill);
    		squareElement.textContent = '';
    	}
    }

    for (let i = 0; i < keys.length; i++) {
		keys[i].onclick = (event) => {
			if (gameOver) {
				window.alert("The game is over and you already won!");
				return;
			}
		    if (guessedWordCount === 6) {
				window.alert(`Sorry, you have no more guesses! The word is ${wordToGuess}.`);
				return;
		    }
		    const keyValue = event.target.textContent;
		    if (keyValue === "Submit") {
				handleSubmitWord();
				return;
		    }
		    if (keyValue === "Del") {
		    	handleDelKey();
				return;
		    }
		    updateGuessedLetters(keyValue);
		};
    }
});
