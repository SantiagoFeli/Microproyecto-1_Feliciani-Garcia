var victorias = 0;
var derrotas = 0;

var maxErrores = 9;

var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

var blinkElements = document.getElementsByClassName("blinking");
var alertLineElements = document.getElementsByClassName("alert-line");

var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var pressAnyKeyToStart = [
	" ___                                       _                _              _               _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___   ___| |_  __ _  _ _ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\ (_-<|  _|/ _` || '_||  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/ /__/ \\__|\\__,_||_|   \\__|",
	"                                    |__/             |__/                                      "
];


var pressAnyKeyToReset = [
	" ___                                       _                _                              _   ",
	"| _ \\ _ _  ___  ___ ___  __ _  _ _  _  _  | |__ ___  _  _  | |_  ___    _ _  ___  ___ ___ | |_ ",
	"|  _/| '_|/ -_)(_-<(_-< / _` || ' \\| || | | / // -_)| || | |  _|/ _ \\  | '_|/ -_)(_-</ -_)|  _|",
	"|_|  |_|  \\___|/__//__/ \\__,_||_||_|\\_, | |_\\_\\\\___| \\_, |  \\__|\\___/  |_|  \\___|/__/\\___| \\__|",
	"                                    |__/             |__/                                      "
];

var ganaste = [
	"__  __ ____   __  __   _      __ ____ _  __",
	"\\ \\/ // __ \\ / / / /  | | /| / //  _// |/ /",
	" \\  // /_/ // /_/ /   | |/ |/ /_/ / /    / ",
	" /_/ \\____/ \\____/    |__/|__//___//_/|_/  ",
	"                                           "
];
var perdiste = [
	"__  __ ____   __  __  __   ____   ____ ____",
	"\\ \\/ // __ \\ / / / / / /  / __ \\ / __// __/",
	" \\  // /_/ // /_/ / / /__/ /_/ /_\\ \\ / _/  ",
	" /_/ \\____/ \\____/ /____/\\____//___//___/  ",
	"                                           "
];
var alertaVacia = [
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           ",
	"                                           "
];

var game = new Ahorcado();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Ahorcado();
		game.updatePageData();
	}
}

window.setInterval(function() {
	if (blinkElements.length > 0) {
		if (game.guessedLetters.length === 0 || game.gameOver) {
			if (blinkElements[0].style.opacity === "1") {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "0";
				}
			} else {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "1";
				}
			}
		} else {
			for (var i = 0; i < blinkElements.length; i++) {
				blinkElements[i].style.opacity = "0";
			}
		}
	}
}, 750);

function restartGame() {
	victorias = 0;
	derrotas = 0;
	game = new Ahorcado();
	game.updatePageData();
}

function Ahorcado() {
	this.listaPalabras = [
		"preparador",
		"profesor",
		"estudiante",
		"calculadora",
		"escritorio",
		"celular",
		"prueba",
		"bolso",
		"cartera",
		"termo",
		"lapiz",
		"cuaderno",
		"libro",
		"materia",
		"preparaduria",
		"proyecto",
		"metropolitana",
		"universidad"
	]

	this.palabra = this.listaPalabras[Math.floor(Math.random() * this.listaPalabras.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;
	this.alertLines = alertaVacia;
	for (var i = 0; i < this.palabra.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Ahorcado.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.palabra.length; i++) {
		if (this.palabra.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}
	
	if (this.errors >= maxErrores) {
		derrotas++;
		this.alertLines = perdiste;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		victorias++;
		this.alertLines = ganaste;
		this.listaPalabras = this.listaPalabras.filter(word => word !== this.palabra);
		this.gameOver = true;
	}

	game.updatePageData();
};

Ahorcado.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.palabra.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = this.errors + " / " + maxErrores;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = victorias + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = derrotas + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;

	for (var i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();
