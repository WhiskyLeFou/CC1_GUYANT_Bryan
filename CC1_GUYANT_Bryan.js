"use strict";

const $startBtn = document.getElementById("start-btn");
const $guessBtn = document.getElementById("guess-btn");
const $cowBtn = document.getElementById("cow-btn");
const $output = document.getElementById("output");
const $numUsr = document.getElementById("num-usr");
const $maxUsr = document.getElementById("max-usr");

let secretNumber = 0;
let nbGuesses = 0;
let maxGuesses = 0;

function check_num() {        // Fonction effectuant la vérification du nombre entré par l'utilisateur
  if (isNaN(parseInt($numUsr.value)) || $numUsr.value < 0 || $numUsr.value > parseInt($maxUsr.value) || $numUsr.value % 1 !== 0) {     // Affiche un message d'erreur si l'input de l'utilisateur n'est pas un nombre valide
    $output.innerText += "\nValeur entrée invalide !";

  } else {
    if ($numUsr.value == secretNumber) {    // Le nombre secret a été trouvé, la partie est terminée
      $output.innerText += "\nOMG BG\nLe nombre secret était bien " + secretNumber + " !";
      $startBtn.disabled = false;           // Réactive le bouton pour lancer une partie
      $guessBtn.disabled = true;            // Désactive le bouton pour faire des tentatives
  
    } else if ($numUsr.value < secretNumber) {
      maxGuesses--;
      $output.innerText += "\n" + $numUsr.value + " est trop bas...";
  
    } else {
      maxGuesses--;
      $output.innerText += "\n" + $numUsr.value + " est trop haut...";
    }
  
    if (maxGuesses === 0) {             // Le nombre secret n'a pas été trouvé
      $output.innerText += "\nPerdu ! Le nombre secret était " + secretNumber + "...";
      $startBtn.disabled = false;
      $guessBtn.disabled = true;
    }
  }

  $numUsr.value = "";      // Vide le champ de texte après une tentative 
}

function launchGame(_evt) {
  secretNumber = Math.floor(Math.random() * $maxUsr.value) + 1;
  maxGuesses = Math.ceil(Math.log($maxUsr.value)) + 1;

  $output.innerText = "Partie lancée, trouvez le nombre en " + maxGuesses; 
  if (maxGuesses > 1) { 
    $output.innerText += " essais !"; 
  } 
  else { 
    $output.innerText += " essai !"; 
  }

  $guessBtn.disabled = false;
  $maxUsr.disabled = true;          // Bloque la zone pour entrer la limite du nombre à chercher
  $startBtn.disabled = true;        // Désactive le bouton pour lancer une partie
  $guessBtn.disabled = false;       // Active le bouton pour faire des tentatives

  //console.log(secretNumber);

  $guessBtn.addEventListener("click", check_num);
  
  $numUsr.onkeydown = function (k) {
    if (maxGuesses > 0 && k.key === "Enter" && $guessBtn.disabled === false) {      // La touche Entrée a été appuyée, la partie est en cours et l'utilisateur a encore des essais
      check_num();
    }
  }
}
$guessBtn.disabled = true;
$startBtn.addEventListener("click", launchGame);

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

function addCow(evt) {
  console.debug(evt.pageX, evt.pageY);

  const img = document.createElement("img")
  //img.src = "https://upload.wikimedia.org/wikipedia/commons/3/30/Cowicon.svg";
  //img.src = "https://www.pngall.com/wp-content/uploads/5/Cute-Pug-PNG-Images.png";
  img.src = "https://media2.giphy.com/media/xUOxfbuK9qc61NGiaI/200w.webp?cid=ecf05e47s2ijnsjrzfd0iee6rcpkl6f7ht3pm1n992vewz3r&ep=v1_gifs_search&rid=200w.webp&ct=g";
  img.classList.add("cow");
  img.style.left = (evt.pageX - 25) + "px";
  img.style.top = (evt.pageY - 25) + "px";
  img.style.transform = "rotate(" + Math.random() + "turn)";

  document.body.appendChild(img);
}

function toggleCow(_evt) {
  if (document.onmousedown instanceof Function) {
    document.onmousedown = null;
  } else {
    document.onmousedown = addCow;
  }
}
$cowBtn.addEventListener("click", toggleCow);
