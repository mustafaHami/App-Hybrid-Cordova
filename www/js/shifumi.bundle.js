/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./www/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/js/controleur.js":
/*!******************************!*\
  !*** ./www/js/controleur.js ***!
  \******************************/
/*! exports provided: init */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony import */ var _modele_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modele.js */ "./www/js/modele.js");
////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

 // le contrôleur utilise le modèle

////////////////////////////////////////////////////////////////////////////////
// Session : variables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

var session = {
    playerEnCours1: null, // Le joueur 1 courant
    playerEnCours2: null, // Le joueur 1 courant
    partieEnCours: null,  // La partie en train d'être jouée
    players : _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].getAllPlayers() // tableau contenant tous les players
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

function init() {
    // On duplique Header et Footer sur chaque page (sauf la première !)
    var $header=$('#shifumiHeader');
    var $footer=$('#shifumiFooter');
    $('div[data-role="page"]').each(function (i) {
        if (i) {
            var $content = $(this).children(":first");
            $header.clone().insertBefore($content);
            $content.after($footer.clone());
        }
    });
    // On initialise les pages (attacher les "handlers" d'événements propres à chaque page)
    VueAccueilController.setEvents();
    VueJeuController.setEvents();
    VueFinController.setEvents();
    // On navigue vers la page d'accueil
    $.mobile.changePage("#vueAccueil");
}

////////////////////////////////////////////////////////////////////////////////
// Controleurs de pages : 1 contrôleur par page, qui porte le nom de la page
//  et contient les "handlers" des événements associés à cette page
////////////////////////////////////////////////////////////////////////////////

class VueAccueilController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueAccueil", function () {this.init();}.bind(this));
        $("#btnNouvellePartie").on("click", function(){this.nouvellePartie();}.bind(this));
        $("#btnPhoto1").on("click", function(){this.prendrePhoto(1);}.bind(this));
        $("#nomJoueur1").on("input", function(){this.chargeJoueur(1);}.bind(this));
        $("#btnPhoto2").on("click", function(){this.prendrePhoto(2);}.bind(this));
        $("#nomJoueur2").on("input", function(){this.chargeJoueur(2);}.bind(this));
    }

    static init() { // initialisation de la page
        $("#nomJoueur1").val("");
        $("#imgPhoto1").attr("src","");
        $("#nomJoueur2").val("");
        $("#imgPhoto2").attr("src","");
    }

    static chargeJoueur(id) {
        var nom = $("#nomJoueur"+id).val();
        var player = _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].findPlayerByNameInArray(session.players,nom); // on recherche le nom de cette personne dans le tablaeu de players
        if (player) {
            // on enregistre le player en fonction  id passer en paramètre de la personne qui à appelé cette méthode
            player.id=id;
            if(id == 1){
                session.playerEnCours1 = player
            }else{
                session.playerEnCours2 = player;
            }
            $("#imgPhoto"+id).attr("src", player.picture);
        } else {
            if(id == 1){
                session.playerEnCours1 =  new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Player"](id,nom,"");
            }else{
                session.playerEnCours2 =  new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Player"](id,nom,"");
            }
            
            $("#imgPhoto"+id).attr("src", "");
        }
        
    }

    static nouvellePartie(id) {
 
        // on récupère de l'information de la vue en cours
        var nomJoueur1 = $("#nomJoueur1").val();
        var nomJoueur2 = $("#nomJoueur2").val();

        if (nomJoueur1.trim() === "" && nomJoueur2.trim() == "") {
            plugins.toast.showShortCenter("Saisir un nom de joueur");
            console.log("Saisir un nom de joueur")
        } else {
            // On utilise le modèle pour créer une nouvelle partie
            session.partieEnCours = new _modele_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"](session.playerEnCours1,session.playerEnCours2); // charge la partie du joueur depuis le localstorage
            // On "propage" le nom du joueur1 et 2 sur toutes les vues
            $('span[data-role="nomJoueur1"]').each(function () {
                $(this).html(session.playerEnCours1.name);
            });
            $('span[data-role="nomJoueur2"]').each(function () {
                $(this).html(session.playerEnCours2.name);
            });
            // On "propage" la photo des joueur sur toutes les vues
            $('img[data-role="imgPhoto1"]').each(function () {
                $(this).attr("src",session.playerEnCours1.picture);
            });
             $('img[data-role="imgPhoto2"]').each(function () {
                $(this).attr("src",session.playerEnCours2.picture);
            });
            // Et on passe à une autre vue
            $.mobile.changePage("#vueJeu");
        }
    }

    static prendrePhoto(id) { 

        _modele_js__WEBPACK_IMPORTED_MODULE_0__["CordovaAPI"].takePicture()
            .then ( imageData => {
                if(id == 1){
                    session.playerEnCours1.picture = new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Picture"](imageData).getBase64();
                    $("#imgPhoto1").attr("src",session.playerEnCours1.picture);
                    console.log("Prise reussie")
                    _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players,session.playerEnCours1)
                    _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players)
                }else{
                    session.playerEnCours2.picture =  new _modele_js__WEBPACK_IMPORTED_MODULE_0__["Picture"](imageData).getBase64();
                    $("#imgPhoto2").attr("src",session.playerEnCours2.picture);
                    console.log("Prise reussie")
                    _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players,session.playerEnCours2)
                    _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players)
                }
                console.log("Player 1 : " + session.playerEnCours1.name + "Player 2 : " + session.playerEnCours2.name)
            })
            .catch( err => {
                if(id == 1){
                    session.playerEnCours1.picture = "";
                    $("#imgPhoto1").attr("src",session.playerEnCours1.picture);
                }else{
                    session.playerEnCours2.picture = "";
                    $("#imgPhoto2").attr("src",session.playerEnCours2.picture);
                }
                plugins.toast.showShortCenter("Echec Photo : "+err.message);
                console.log("Prise erreur");
            });
    }
}
////////////////////////////////////////////////////////////////////////////////
class VueJeuController {
  
    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueJeu", function () {this.init();}.bind(this));
        // si j'ai le temps je ferai un for, mais c'est moche je l'avoue
        $("#btnJouer1").on("click",  function(){this.jouer(1);}.bind(this));
        $("#btnJouer2").on("click",  function(){this.jouer(2);}.bind(this));
        $("#btnJouer3").on("click",  function(){this.jouer(3);}.bind(this));
        $("#btnJouer4").on("click",  function(){this.jouer(4);}.bind(this));
        $("#btnJouer5").on("click",  function(){this.jouer(5);}.bind(this));
        $("#btnJouer6").on("click",  function(){this.jouer(6);}.bind(this));
        $("#btnJouer7").on("click",  function(){this.jouer(7);}.bind(this));
        $("#btnJouer8").on("click",  function(){this.jouer(8);}.bind(this));
        $("#btnJouer9").on("click",  function(){this.jouer(9);}.bind(this));
        // création des évenements des bouton du morpion
    
        $("#btnNouveauCoup").on("click",  function(){this.nouveauCoup();}.bind(this));
        $("#btnFinPartie").on("click",    function(){this.finPartie();}.bind(this));
    }

    static init() { // initialisation de la page
        // on active et on montre tous les boutons du morpion
        $("button[id^=btnJouer]").prop('disabled', false).show();
        // on met la valeur de toutes les cases à 0
        session.partieEnCours = new _modele_js__WEBPACK_IMPORTED_MODULE_0__["TicTacToe"](session.playerEnCours1,session.playerEnCours2); // charge la partie du joueur depuis le localstorage
        $("img[id^=imgBtn]").attr("src", "../www/images/imgvide.png")
        
        $("button[id^=btnJouer]").css({'background' : 'grey'})
        // on cache toutes les réponses de la machine
        $("img[id^=machine]").hide();
        // on cache la div resultat
        $("#resultat").hide();
        if(session.partieEnCours.currentPlayer.id == 1){
            $("#infoJ").html(session.partieEnCours.currentPlayer.name).css({ 'color': 'blue'})
        }else{
            $("#infoJ").html(session.partieEnCours.currentPlayer.name).css({ 'color': 'red'})
        }
       
    }

    static jouer(idCoupJoueurCase) { // le joueur a choisi son coup
        
        // récupération de la case cliqué
        var caseClique = $("#btnJouer"+idCoupJoueurCase)
        // on donne l'image du joueur à la case et à l'emplacement dans le tablaeu
        session.partieEnCours.play(idCoupJoueurCase - 1)
        $("#imgBtn"+idCoupJoueurCase).attr('src', session.partieEnCours.currentPlayer.picture) 
        caseClique.prop('disabled', true)
        
        if(session.partieEnCours.currentPlayer.id == 1){
            caseClique.css({'background' : 'blue'})
        }else{
            caseClique.css({'background' : 'red'})
        }
        // un joueur à joué, vérification si la partie est finie
        if(session.partieEnCours.isWin()){
            alert("Partie fini victoir de " + session.partieEnCours.currentPlayer.name)
            // on vérifie la personne qui est train de jouer et en fonction de sa on attribut les points
            if(session.partieEnCours.currentPlayer.id == session.playerEnCours1.id){
                session.playerEnCours1.nbWin += 1
                session.playerEnCours2.nbLoss += 1
            }else{
                session.playerEnCours2.nbWin += 1
                session.playerEnCours1.nbLoss += 1
            }
            this.finPartie()
        }else if (session.partieEnCours.isDrawn()){
            alert("Partie finie null")
            session.playerEnCours1.nbDrawn += 1;
            session.playerEnCours2.nbDrawn += 1;
            this.finPartie()
        }else{
            // changement de joueur
            session.partieEnCours.switchCurrentPlayer()
            if(session.partieEnCours.currentPlayer.id == 1){
                $("#infoJ").html(session.partieEnCours.currentPlayer.name).css({ 'color': 'blue'})
            }else{
                $("#infoJ").html(session.partieEnCours.currentPlayer.name).css({ 'color': 'red'})
            }
        }
        // 3. on enregistre les resultats
        // msj du tableau
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players,session.playerEnCours1) 
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersUtils"].addOrUpdatePlayerInArray(session.players,session.playerEnCours2)
        //save dans le local storage
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players)
    }

    static nouveauCoup() {
        this.init();
    }

    static finPartie() {
        $.mobile.changePage("#vueFin");
    }
}

////////////////////////////////////////////////////////////////////////////////
class VueFinController {

    static setEvents() { // définition des "handlers" d'événements sur la page
        $(document).on("pagebeforeshow", "#vueFin", function () {this.init();}.bind(this));
        $("#btnRetourJeu").on("click", function(){this.retourJeu();}.bind(this));
        $("#btnSupprimer1").on("click", function(){this.supprimerJoueur(1);}.bind(this));
        $("#btnSupprimer2").on("click", function(){this.supprimerJoueur(2);}.bind(this));
        $("#btnSupprimer3").on("click", function(){this.supprimerJoueur(3);}.bind(this));
        $("#btnRetourAccueil").on("click", function(){this.retourAccueil();}.bind(this));
        console.log(session.playerEnCours1)
        console.log(session.playerEnCours2)
    }

    static init() { // initialisation de la page
        $("#nbVictoires1").html(session.playerEnCours1.nbWin);
        $("#nbNuls1").html(session.playerEnCours1.nbDrawn);
        $("#nbDefaites1").html(session.playerEnCours1.nbLoss);
        $("#nbVictoires2").html(session.playerEnCours2.nbWin);
        $("#nbNuls2").html(session.playerEnCours2.nbDrawn);
        $("#nbDefaites2").html(session.playerEnCours2.nbLoss);
    }

    static retourJeu() {
        $.mobile.changePage("#vueJeu");
    }

    static supprimerJoueur(id) {
       
        
        if(id == 1){
            session.players = session.players.filter(item => item.name !== session.playerEnCours1.name)
        }else if (id == 2){
            session.players = session.players.filter(item => item.name !== session.playerEnCours2.name)
        }else{
            session.players = session.players.filter(item => item.name !== session.playerEnCours1.name)
            session.players = session.players.filter(item => item.name !== session.playerEnCours2.name)
        }
        _modele_js__WEBPACK_IMPORTED_MODULE_0__["PlayersDao"].savePlayers(session.players)
        this.retourAccueil();
    }

    static retourAccueil() {
        $.mobile.changePage("#vueAccueil");
    }
}

/***/ }),

/***/ "./www/js/index.js":
/*!*************************!*\
  !*** ./www/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controleur_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controleur.js */ "./www/js/controleur.js");
// on importe uniquement le module contrôleur


var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        _controleur_js__WEBPACK_IMPORTED_MODULE_0__["init"]();
    }
};

app.initialize();


/***/ }),

/***/ "./www/js/modele.js":
/*!**************************!*\
  !*** ./www/js/modele.js ***!
  \**************************/
/*! exports provided: Picture, Player, TicTacToe, PlayersDao, PlayersUtils, CordovaAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Picture", function() { return Picture; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Player", function() { return Player; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TicTacToe", function() { return TicTacToe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersDao", function() { return PlayersDao; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersUtils", function() { return PlayersUtils; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CordovaAPI", function() { return CordovaAPI; });
// Classe pour représenter une image
class Picture {
    
    constructor(data) {
        this.data = data;
    }

    // Renvoie l'image au format Base64 avec en-tête MIME
    getBase64() {
        return "data:image/jpeg;base64,"+this.data;
    }
      
};

// Classe pour représenter un joueur
class Player {
  
    constructor(id, name, picture, nbWin = 0, nbLoss = 0, nbDrawn = 0) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.nbWin = nbWin;
        this.nbLoss = nbLoss;
        this.nbDrawn = nbDrawn;
    }
}

// Classe pour représenter une partie de TicTacToe
class TicTacToe {

    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = [0,0,0,0,0,0,0,0,0]; 
        this.currentPlayer = Math.random() < 0.5 ?  player1 : player2; // Le premier joueur est choisi aléatoirement
    }

    // Changer de joueur courant
    switchCurrentPlayer(){
        if(this.currentPlayer === this.player1) this.currentPlayer = this.player2;
        else this.currentPlayer = this.player1;
    }
    
    // Le joueur courant joue en caseId
    play(caseId) {
      this.board[caseId]=this.currentPlayer.id;
    }

    // Renvoie vrai si le joueur courant a gagné (on vérifie "brut force" toutes les possibilités)
    isWin() { 
        const id = this.currentPlayer.id;
        return( this.board[0] == id && this.board[1] == id && this.board[2] == id ||
                this.board[3] == id && this.board[4] == id && this.board[5] == id ||
                this.board[6] == id && this.board[7] == id && this.board[8] == id || 
                this.board[0] == id && this.board[3] == id && this.board[6] == id || 
                this.board[1] == id && this.board[4] == id && this.board[7] == id ||
                this.board[2] == id && this.board[5] == id && this.board[8] == id || 
                this.board[0] == id && this.board[4] == id && this.board[8] == id || 
                this.board[2] == id && this.board[4] == id && this.board[6] == id 
        );
    }

    // Renvoie vrai s'il y a match nul (aucune case)
    isDrawn(){
        return this.board.find(element => element === 0) === undefined;
    }
}

// Classe pour gérer la persistance d'un tableau de joueurs
class PlayersDao {
  
    // Sauvegarde le tableau de joueurs dans le local storage
        static savePlayers(players){
            window.localStorage.setItem("players", JSON.stringify(players));
        }

    // Récupère le tableau de joueurs dans le local storage
    static getAllPlayers(){
        const stringPlayers = window.localStorage.getItem("players");
        // Si tableau non stocké, on renvoie un tableau vide
        if(stringPlayers === null)
            return new Array();
        else 
            return JSON.parse(stringPlayers);       
    }

}

// Classe pour manipuler un tableau de joueurs
class PlayersUtils {

    // Recherche un joueur par son nom dans un tableau de joueurs
    static findPlayerByNameInArray(players, playerName){
        return players.find(element => element.name == playerName);
    }
     
    // Met à jour ou ajoute un joueur dans le tableau de joueurs
    static addOrUpdatePlayerInArray(players, player) {
        const {id, ...partialPlayer} = player; // partialPlayer = player moins l'id qu'on ne veut pas enregistrer
        const playerIndex = players.findIndex(element => element.name == player.name);
        if (playerIndex != -1) {                       
            players[playerIndex] = partialPlayer; // Si le joueur existe déjà, on le met à jour
        } else { 
            players.push(partialPlayer); // Sinon on l'ajoute à la fin
        }  
    }
}
// La classe CordovaAPI est un service permettant d'uiliser l'API de cordova sous forme de promesses
class CordovaAPI {
    static takePicture() {
        return new Promise((resolve, reject) => {
                navigator.camera.getPicture(
                    imageData => resolve(imageData),
                    err => reject(err),
                    {   // qualité encodage 50%, format base64 (et JPEG par défaut)
                        quality: 50,
                        destinationType: navigator.camera.DestinationType.DATA_URL,
                        encodingType: navigator.camera.EncodingType.JPEG,
                        mediaType: navigator.camera.MediaType.PICTURE,
                        correctOrientation: true,
                        sourceType: navigator.camera.PictureSourceType.CAMERA,
                        cameraDirection: navigator.camera.Direction.FRONT
                    }
                );
            }
        );
    }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2NvbnRyb2xldXIuanMiLCJ3ZWJwYWNrOi8vLy4vd3d3L2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3d3dy9qcy9tb2RlbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNDOztBQUV0QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHFEQUFpQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7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QUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwiZmlsZSI6ImpzL3NoaWZ1bWkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi93d3cvanMvaW5kZXguanNcIik7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gTW9kdWxlIENvbnRyb2xldXIgY29udGllbnQgOlxuLy8gLSB1biBvYmpldCBzZXNzaW9uIGNvbnRlbmFudCBsZXMgZG9ubsOpZXMgbW9kw6lsaXNhbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLyAtIHVuZSBmb25jdGlvbiBcImluaXRcIiBwb3VyIGluaXRpYWxpc2VyIGwnYXBwbGljYXRpb25cbi8vIC0gdW5lIGNsYXNzZSBcImNvbnRyb2xsZXJcIiBhYnN0cmFpdGUgcG91ciBjaGFxdWUgcGFnZVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuaW1wb3J0ICogYXMgbW9kZWxlIGZyb20gXCIuL21vZGVsZS5qc1wiOyAvLyBsZSBjb250csO0bGV1ciB1dGlsaXNlIGxlIG1vZMOobGVcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNlc3Npb24gOiB2YXJpYWJsZXMgcXVpIHJlcHLDqXNlbnRlbnQgbCfDqXRhdCBkZSBsJ2FwcGxpY2F0aW9uXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG52YXIgc2Vzc2lvbiA9IHtcbiAgICBwbGF5ZXJFbkNvdXJzMTogbnVsbCwgLy8gTGUgam91ZXVyIDEgY291cmFudFxuICAgIHBsYXllckVuQ291cnMyOiBudWxsLCAvLyBMZSBqb3VldXIgMSBjb3VyYW50XG4gICAgcGFydGllRW5Db3VyczogbnVsbCwgIC8vIExhIHBhcnRpZSBlbiB0cmFpbiBkJ8OqdHJlIGpvdcOpZVxuICAgIHBsYXllcnMgOiBtb2RlbGUuUGxheWVyc0Rhby5nZXRBbGxQbGF5ZXJzKCkgLy8gdGFibGVhdSBjb250ZW5hbnQgdG91cyBsZXMgcGxheWVyc1xufTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIGluaXQgOiBleMOpY3V0w6llIGF1IGTDqW1hcnJhZ2UgZGUgbCdhcHBsaWNhdGlvbiAodm9pciBmaWNoaWVyIGluZGV4LmpzKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgLy8gT24gZHVwbGlxdWUgSGVhZGVyIGV0IEZvb3RlciBzdXIgY2hhcXVlIHBhZ2UgKHNhdWYgbGEgcHJlbWnDqHJlICEpXG4gICAgdmFyICRoZWFkZXI9JCgnI3NoaWZ1bWlIZWFkZXInKTtcbiAgICB2YXIgJGZvb3Rlcj0kKCcjc2hpZnVtaUZvb3RlcicpO1xuICAgICQoJ2RpdltkYXRhLXJvbGU9XCJwYWdlXCJdJykuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgICBpZiAoaSkge1xuICAgICAgICAgICAgdmFyICRjb250ZW50ID0gJCh0aGlzKS5jaGlsZHJlbihcIjpmaXJzdFwiKTtcbiAgICAgICAgICAgICRoZWFkZXIuY2xvbmUoKS5pbnNlcnRCZWZvcmUoJGNvbnRlbnQpO1xuICAgICAgICAgICAgJGNvbnRlbnQuYWZ0ZXIoJGZvb3Rlci5jbG9uZSgpKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIE9uIGluaXRpYWxpc2UgbGVzIHBhZ2VzIChhdHRhY2hlciBsZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHByb3ByZXMgw6AgY2hhcXVlIHBhZ2UpXG4gICAgVnVlQWNjdWVpbENvbnRyb2xsZXIuc2V0RXZlbnRzKCk7XG4gICAgVnVlSmV1Q29udHJvbGxlci5zZXRFdmVudHMoKTtcbiAgICBWdWVGaW5Db250cm9sbGVyLnNldEV2ZW50cygpO1xuICAgIC8vIE9uIG5hdmlndWUgdmVycyBsYSBwYWdlIGQnYWNjdWVpbFxuICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoXCIjdnVlQWNjdWVpbFwiKTtcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnRyb2xldXJzIGRlIHBhZ2VzIDogMSBjb250csO0bGV1ciBwYXIgcGFnZSwgcXVpIHBvcnRlIGxlIG5vbSBkZSBsYSBwYWdlXG4vLyAgZXQgY29udGllbnQgbGVzIFwiaGFuZGxlcnNcIiBkZXMgw6l2w6luZW1lbnRzIGFzc29jacOpcyDDoCBjZXR0ZSBwYWdlXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5jbGFzcyBWdWVBY2N1ZWlsQ29udHJvbGxlciB7XG5cbiAgICBzdGF0aWMgc2V0RXZlbnRzKCkgeyAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZWJlZm9yZXNob3dcIiwgXCIjdnVlQWNjdWVpbFwiLCBmdW5jdGlvbiAoKSB7dGhpcy5pbml0KCk7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5Ob3V2ZWxsZVBhcnRpZVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7dGhpcy5ub3V2ZWxsZVBhcnRpZSgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuUGhvdG8xXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnByZW5kcmVQaG90bygxKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI25vbUpvdWV1cjFcIikub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpe3RoaXMuY2hhcmdlSm91ZXVyKDEpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuUGhvdG8yXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnByZW5kcmVQaG90bygyKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI25vbUpvdWV1cjJcIikub24oXCJpbnB1dFwiLCBmdW5jdGlvbigpe3RoaXMuY2hhcmdlSm91ZXVyKDIpO30uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKSB7IC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAgICAgJChcIiNub21Kb3VldXIxXCIpLnZhbChcIlwiKTtcbiAgICAgICAgJChcIiNpbWdQaG90bzFcIikuYXR0cihcInNyY1wiLFwiXCIpO1xuICAgICAgICAkKFwiI25vbUpvdWV1cjJcIikudmFsKFwiXCIpO1xuICAgICAgICAkKFwiI2ltZ1Bob3RvMlwiKS5hdHRyKFwic3JjXCIsXCJcIik7XG4gICAgfVxuXG4gICAgc3RhdGljIGNoYXJnZUpvdWV1cihpZCkge1xuICAgICAgICB2YXIgbm9tID0gJChcIiNub21Kb3VldXJcIitpZCkudmFsKCk7XG4gICAgICAgIHZhciBwbGF5ZXIgPSBtb2RlbGUuUGxheWVyc1V0aWxzLmZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KHNlc3Npb24ucGxheWVycyxub20pOyAvLyBvbiByZWNoZXJjaGUgbGUgbm9tIGRlIGNldHRlIHBlcnNvbm5lIGRhbnMgbGUgdGFibGFldSBkZSBwbGF5ZXJzXG4gICAgICAgIGlmIChwbGF5ZXIpIHtcbiAgICAgICAgICAgIC8vIG9uIGVucmVnaXN0cmUgbGUgcGxheWVyIGVuIGZvbmN0aW9uICBpZCBwYXNzZXIgZW4gcGFyYW3DqHRyZSBkZSBsYSBwZXJzb25uZSBxdWkgw6AgYXBwZWzDqSBjZXR0ZSBtw6l0aG9kZVxuICAgICAgICAgICAgcGxheWVyLmlkPWlkO1xuICAgICAgICAgICAgaWYoaWQgPT0gMSl7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMSA9IHBsYXllclxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMiA9IHBsYXllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICQoXCIjaW1nUGhvdG9cIitpZCkuYXR0cihcInNyY1wiLCBwbGF5ZXIucGljdHVyZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihpZCA9PSAxKXtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnBsYXllckVuQ291cnMxID0gIG5ldyBtb2RlbGUuUGxheWVyKGlkLG5vbSxcIlwiKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIHNlc3Npb24ucGxheWVyRW5Db3VyczIgPSAgbmV3IG1vZGVsZS5QbGF5ZXIoaWQsbm9tLFwiXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKFwiI2ltZ1Bob3RvXCIraWQpLmF0dHIoXCJzcmNcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIG5vdXZlbGxlUGFydGllKGlkKSB7XG4gXG4gICAgICAgIC8vIG9uIHLDqWN1cMOocmUgZGUgbCdpbmZvcm1hdGlvbiBkZSBsYSB2dWUgZW4gY291cnNcbiAgICAgICAgdmFyIG5vbUpvdWV1cjEgPSAkKFwiI25vbUpvdWV1cjFcIikudmFsKCk7XG4gICAgICAgIHZhciBub21Kb3VldXIyID0gJChcIiNub21Kb3VldXIyXCIpLnZhbCgpO1xuXG4gICAgICAgIGlmIChub21Kb3VldXIxLnRyaW0oKSA9PT0gXCJcIiAmJiBub21Kb3VldXIyLnRyaW0oKSA9PSBcIlwiKSB7XG4gICAgICAgICAgICBwbHVnaW5zLnRvYXN0LnNob3dTaG9ydENlbnRlcihcIlNhaXNpciB1biBub20gZGUgam91ZXVyXCIpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYWlzaXIgdW4gbm9tIGRlIGpvdWV1clwiKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT24gdXRpbGlzZSBsZSBtb2TDqGxlIHBvdXIgY3LDqWVyIHVuZSBub3V2ZWxsZSBwYXJ0aWVcbiAgICAgICAgICAgIHNlc3Npb24ucGFydGllRW5Db3VycyA9IG5ldyBtb2RlbGUuVGljVGFjVG9lKHNlc3Npb24ucGxheWVyRW5Db3VyczEsc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMik7IC8vIGNoYXJnZSBsYSBwYXJ0aWUgZHUgam91ZXVyIGRlcHVpcyBsZSBsb2NhbHN0b3JhZ2VcbiAgICAgICAgICAgIC8vIE9uIFwicHJvcGFnZVwiIGxlIG5vbSBkdSBqb3VldXIxIGV0IDIgc3VyIHRvdXRlcyBsZXMgdnVlc1xuICAgICAgICAgICAgJCgnc3BhbltkYXRhLXJvbGU9XCJub21Kb3VldXIxXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKHNlc3Npb24ucGxheWVyRW5Db3VyczEubmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJ3NwYW5bZGF0YS1yb2xlPVwibm9tSm91ZXVyMlwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuaHRtbChzZXNzaW9uLnBsYXllckVuQ291cnMyLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBPbiBcInByb3BhZ2VcIiBsYSBwaG90byBkZXMgam91ZXVyIHN1ciB0b3V0ZXMgbGVzIHZ1ZXNcbiAgICAgICAgICAgICQoJ2ltZ1tkYXRhLXJvbGU9XCJpbWdQaG90bzFcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJzcmNcIixzZXNzaW9uLnBsYXllckVuQ291cnMxLnBpY3R1cmUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgJCgnaW1nW2RhdGEtcm9sZT1cImltZ1Bob3RvMlwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcInNyY1wiLHNlc3Npb24ucGxheWVyRW5Db3VyczIucGljdHVyZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIEV0IG9uIHBhc3NlIMOgIHVuZSBhdXRyZSB2dWVcbiAgICAgICAgICAgICQubW9iaWxlLmNoYW5nZVBhZ2UoXCIjdnVlSmV1XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHByZW5kcmVQaG90byhpZCkgeyBcblxuICAgICAgICBtb2RlbGUuQ29yZG92YUFQSS50YWtlUGljdHVyZSgpXG4gICAgICAgICAgICAudGhlbiAoIGltYWdlRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoaWQgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucGxheWVyRW5Db3VyczEucGljdHVyZSA9IG5ldyBtb2RlbGUuUGljdHVyZShpbWFnZURhdGEpLmdldEJhc2U2NCgpO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2ltZ1Bob3RvMVwiKS5hdHRyKFwic3JjXCIsc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5waWN0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcmlzZSByZXVzc2llXCIpXG4gICAgICAgICAgICAgICAgICAgIG1vZGVsZS5QbGF5ZXJzVXRpbHMuYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHNlc3Npb24ucGxheWVycyxzZXNzaW9uLnBsYXllckVuQ291cnMxKVxuICAgICAgICAgICAgICAgICAgICBtb2RlbGUuUGxheWVyc0Rhby5zYXZlUGxheWVycyhzZXNzaW9uLnBsYXllcnMpXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucGxheWVyRW5Db3VyczIucGljdHVyZSA9ICBuZXcgbW9kZWxlLlBpY3R1cmUoaW1hZ2VEYXRhKS5nZXRCYXNlNjQoKTtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbWdQaG90bzJcIikuYXR0cihcInNyY1wiLHNlc3Npb24ucGxheWVyRW5Db3VyczIucGljdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJpc2UgcmV1c3NpZVwiKVxuICAgICAgICAgICAgICAgICAgICBtb2RlbGUuUGxheWVyc1V0aWxzLmFkZE9yVXBkYXRlUGxheWVySW5BcnJheShzZXNzaW9uLnBsYXllcnMsc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMilcbiAgICAgICAgICAgICAgICAgICAgbW9kZWxlLlBsYXllcnNEYW8uc2F2ZVBsYXllcnMoc2Vzc2lvbi5wbGF5ZXJzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciAxIDogXCIgKyBzZXNzaW9uLnBsYXllckVuQ291cnMxLm5hbWUgKyBcIlBsYXllciAyIDogXCIgKyBzZXNzaW9uLnBsYXllckVuQ291cnMyLm5hbWUpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCBlcnIgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGlkID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnBsYXllckVuQ291cnMxLnBpY3R1cmUgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAkKFwiI2ltZ1Bob3RvMVwiKS5hdHRyKFwic3JjXCIsc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5waWN0dXJlKTtcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMi5waWN0dXJlID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgJChcIiNpbWdQaG90bzJcIikuYXR0cihcInNyY1wiLHNlc3Npb24ucGxheWVyRW5Db3VyczIucGljdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBsdWdpbnMudG9hc3Quc2hvd1Nob3J0Q2VudGVyKFwiRWNoZWMgUGhvdG8gOiBcIitlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcmlzZSBlcnJldXJcIik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgVnVlSmV1Q29udHJvbGxlciB7XG4gIFxuICAgIHN0YXRpYyBzZXRFdmVudHMoKSB7IC8vIGTDqWZpbml0aW9uIGRlcyBcImhhbmRsZXJzXCIgZCfDqXbDqW5lbWVudHMgc3VyIGxhIHBhZ2VcbiAgICAgICAgJChkb2N1bWVudCkub24oXCJwYWdlYmVmb3Jlc2hvd1wiLCBcIiN2dWVKZXVcIiwgZnVuY3Rpb24gKCkge3RoaXMuaW5pdCgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgIC8vIHNpIGonYWkgbGUgdGVtcHMgamUgZmVyYWkgdW4gZm9yLCBtYWlzIGMnZXN0IG1vY2hlIGplIGwnYXZvdWVcbiAgICAgICAgJChcIiNidG5Kb3VlcjFcIikub24oXCJjbGlja1wiLCAgZnVuY3Rpb24oKXt0aGlzLmpvdWVyKDEpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuSm91ZXIyXCIpLm9uKFwiY2xpY2tcIiwgIGZ1bmN0aW9uKCl7dGhpcy5qb3VlcigyKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkpvdWVyM1wiKS5vbihcImNsaWNrXCIsICBmdW5jdGlvbigpe3RoaXMuam91ZXIoMyk7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5Kb3VlcjRcIikub24oXCJjbGlja1wiLCAgZnVuY3Rpb24oKXt0aGlzLmpvdWVyKDQpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuSm91ZXI1XCIpLm9uKFwiY2xpY2tcIiwgIGZ1bmN0aW9uKCl7dGhpcy5qb3Vlcig1KTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkpvdWVyNlwiKS5vbihcImNsaWNrXCIsICBmdW5jdGlvbigpe3RoaXMuam91ZXIoNik7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5Kb3VlcjdcIikub24oXCJjbGlja1wiLCAgZnVuY3Rpb24oKXt0aGlzLmpvdWVyKDcpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuSm91ZXI4XCIpLm9uKFwiY2xpY2tcIiwgIGZ1bmN0aW9uKCl7dGhpcy5qb3Vlcig4KTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkpvdWVyOVwiKS5vbihcImNsaWNrXCIsICBmdW5jdGlvbigpe3RoaXMuam91ZXIoOSk7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgLy8gY3LDqWF0aW9uIGRlcyDDqXZlbmVtZW50cyBkZXMgYm91dG9uIGR1IG1vcnBpb25cbiAgICBcbiAgICAgICAgJChcIiNidG5Ob3V2ZWF1Q291cFwiKS5vbihcImNsaWNrXCIsICBmdW5jdGlvbigpe3RoaXMubm91dmVhdUNvdXAoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0bkZpblBhcnRpZVwiKS5vbihcImNsaWNrXCIsICAgIGZ1bmN0aW9uKCl7dGhpcy5maW5QYXJ0aWUoKTt9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHN0YXRpYyBpbml0KCkgeyAvLyBpbml0aWFsaXNhdGlvbiBkZSBsYSBwYWdlXG4gICAgICAgIC8vIG9uIGFjdGl2ZSBldCBvbiBtb250cmUgdG91cyBsZXMgYm91dG9ucyBkdSBtb3JwaW9uXG4gICAgICAgICQoXCJidXR0b25baWRePWJ0bkpvdWVyXVwiKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKS5zaG93KCk7XG4gICAgICAgIC8vIG9uIG1ldCBsYSB2YWxldXIgZGUgdG91dGVzIGxlcyBjYXNlcyDDoCAwXG4gICAgICAgIHNlc3Npb24ucGFydGllRW5Db3VycyA9IG5ldyBtb2RlbGUuVGljVGFjVG9lKHNlc3Npb24ucGxheWVyRW5Db3VyczEsc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMik7IC8vIGNoYXJnZSBsYSBwYXJ0aWUgZHUgam91ZXVyIGRlcHVpcyBsZSBsb2NhbHN0b3JhZ2VcbiAgICAgICAgJChcImltZ1tpZF49aW1nQnRuXVwiKS5hdHRyKFwic3JjXCIsIFwiLi4vd3d3L2ltYWdlcy9pbWd2aWRlLnBuZ1wiKVxuICAgICAgICBcbiAgICAgICAgJChcImJ1dHRvbltpZF49YnRuSm91ZXJdXCIpLmNzcyh7J2JhY2tncm91bmQnIDogJ2dyZXknfSlcbiAgICAgICAgLy8gb24gY2FjaGUgdG91dGVzIGxlcyByw6lwb25zZXMgZGUgbGEgbWFjaGluZVxuICAgICAgICAkKFwiaW1nW2lkXj1tYWNoaW5lXVwiKS5oaWRlKCk7XG4gICAgICAgIC8vIG9uIGNhY2hlIGxhIGRpdiByZXN1bHRhdFxuICAgICAgICAkKFwiI3Jlc3VsdGF0XCIpLmhpZGUoKTtcbiAgICAgICAgaWYoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIuaWQgPT0gMSl7XG4gICAgICAgICAgICAkKFwiI2luZm9KXCIpLmh0bWwoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIubmFtZSkuY3NzKHsgJ2NvbG9yJzogJ2JsdWUnfSlcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkKFwiI2luZm9KXCIpLmh0bWwoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIubmFtZSkuY3NzKHsgJ2NvbG9yJzogJ3JlZCd9KVxuICAgICAgICB9XG4gICAgICAgXG4gICAgfVxuXG4gICAgc3RhdGljIGpvdWVyKGlkQ291cEpvdWV1ckNhc2UpIHsgLy8gbGUgam91ZXVyIGEgY2hvaXNpIHNvbiBjb3VwXG4gICAgICAgIFxuICAgICAgICAvLyByw6ljdXDDqXJhdGlvbiBkZSBsYSBjYXNlIGNsaXF1w6lcbiAgICAgICAgdmFyIGNhc2VDbGlxdWUgPSAkKFwiI2J0bkpvdWVyXCIraWRDb3VwSm91ZXVyQ2FzZSlcbiAgICAgICAgLy8gb24gZG9ubmUgbCdpbWFnZSBkdSBqb3VldXIgw6AgbGEgY2FzZSBldCDDoCBsJ2VtcGxhY2VtZW50IGRhbnMgbGUgdGFibGFldVxuICAgICAgICBzZXNzaW9uLnBhcnRpZUVuQ291cnMucGxheShpZENvdXBKb3VldXJDYXNlIC0gMSlcbiAgICAgICAgJChcIiNpbWdCdG5cIitpZENvdXBKb3VldXJDYXNlKS5hdHRyKCdzcmMnLCBzZXNzaW9uLnBhcnRpZUVuQ291cnMuY3VycmVudFBsYXllci5waWN0dXJlKSBcbiAgICAgICAgY2FzZUNsaXF1ZS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpXG4gICAgICAgIFxuICAgICAgICBpZihzZXNzaW9uLnBhcnRpZUVuQ291cnMuY3VycmVudFBsYXllci5pZCA9PSAxKXtcbiAgICAgICAgICAgIGNhc2VDbGlxdWUuY3NzKHsnYmFja2dyb3VuZCcgOiAnYmx1ZSd9KVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNhc2VDbGlxdWUuY3NzKHsnYmFja2dyb3VuZCcgOiAncmVkJ30pXG4gICAgICAgIH1cbiAgICAgICAgLy8gdW4gam91ZXVyIMOgIGpvdcOpLCB2w6lyaWZpY2F0aW9uIHNpIGxhIHBhcnRpZSBlc3QgZmluaWVcbiAgICAgICAgaWYoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmlzV2luKCkpe1xuICAgICAgICAgICAgYWxlcnQoXCJQYXJ0aWUgZmluaSB2aWN0b2lyIGRlIFwiICsgc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIubmFtZSlcbiAgICAgICAgICAgIC8vIG9uIHbDqXJpZmllIGxhIHBlcnNvbm5lIHF1aSBlc3QgdHJhaW4gZGUgam91ZXIgZXQgZW4gZm9uY3Rpb24gZGUgc2Egb24gYXR0cmlidXQgbGVzIHBvaW50c1xuICAgICAgICAgICAgaWYoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIuaWQgPT0gc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5pZCl7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5uYldpbiArPSAxXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMi5uYkxvc3MgKz0gMVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMi5uYldpbiArPSAxXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5uYkxvc3MgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5maW5QYXJ0aWUoKVxuICAgICAgICB9ZWxzZSBpZiAoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmlzRHJhd24oKSl7XG4gICAgICAgICAgICBhbGVydChcIlBhcnRpZSBmaW5pZSBudWxsXCIpXG4gICAgICAgICAgICBzZXNzaW9uLnBsYXllckVuQ291cnMxLm5iRHJhd24gKz0gMTtcbiAgICAgICAgICAgIHNlc3Npb24ucGxheWVyRW5Db3VyczIubmJEcmF3biArPSAxO1xuICAgICAgICAgICAgdGhpcy5maW5QYXJ0aWUoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIC8vIGNoYW5nZW1lbnQgZGUgam91ZXVyXG4gICAgICAgICAgICBzZXNzaW9uLnBhcnRpZUVuQ291cnMuc3dpdGNoQ3VycmVudFBsYXllcigpXG4gICAgICAgICAgICBpZihzZXNzaW9uLnBhcnRpZUVuQ291cnMuY3VycmVudFBsYXllci5pZCA9PSAxKXtcbiAgICAgICAgICAgICAgICAkKFwiI2luZm9KXCIpLmh0bWwoc2Vzc2lvbi5wYXJ0aWVFbkNvdXJzLmN1cnJlbnRQbGF5ZXIubmFtZSkuY3NzKHsgJ2NvbG9yJzogJ2JsdWUnfSlcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICQoXCIjaW5mb0pcIikuaHRtbChzZXNzaW9uLnBhcnRpZUVuQ291cnMuY3VycmVudFBsYXllci5uYW1lKS5jc3MoeyAnY29sb3InOiAncmVkJ30pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gMy4gb24gZW5yZWdpc3RyZSBsZXMgcmVzdWx0YXRzXG4gICAgICAgIC8vIG1zaiBkdSB0YWJsZWF1XG4gICAgICAgIG1vZGVsZS5QbGF5ZXJzVXRpbHMuYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHNlc3Npb24ucGxheWVycyxzZXNzaW9uLnBsYXllckVuQ291cnMxKSBcbiAgICAgICAgbW9kZWxlLlBsYXllcnNVdGlscy5hZGRPclVwZGF0ZVBsYXllckluQXJyYXkoc2Vzc2lvbi5wbGF5ZXJzLHNlc3Npb24ucGxheWVyRW5Db3VyczIpXG4gICAgICAgIC8vc2F2ZSBkYW5zIGxlIGxvY2FsIHN0b3JhZ2VcbiAgICAgICAgbW9kZWxlLlBsYXllcnNEYW8uc2F2ZVBsYXllcnMoc2Vzc2lvbi5wbGF5ZXJzKVxuICAgIH1cblxuICAgIHN0YXRpYyBub3V2ZWF1Q291cCgpIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGZpblBhcnRpZSgpIHtcbiAgICAgICAgJC5tb2JpbGUuY2hhbmdlUGFnZShcIiN2dWVGaW5cIik7XG4gICAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuY2xhc3MgVnVlRmluQ29udHJvbGxlciB7XG5cbiAgICBzdGF0aWMgc2V0RXZlbnRzKCkgeyAvLyBkw6lmaW5pdGlvbiBkZXMgXCJoYW5kbGVyc1wiIGQnw6l2w6luZW1lbnRzIHN1ciBsYSBwYWdlXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZWJlZm9yZXNob3dcIiwgXCIjdnVlRmluXCIsIGZ1bmN0aW9uICgpIHt0aGlzLmluaXQoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0blJldG91ckpldVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7dGhpcy5yZXRvdXJKZXUoKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0blN1cHByaW1lcjFcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe3RoaXMuc3VwcHJpbWVySm91ZXVyKDEpO30uYmluZCh0aGlzKSk7XG4gICAgICAgICQoXCIjYnRuU3VwcHJpbWVyMlwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7dGhpcy5zdXBwcmltZXJKb3VldXIoMik7fS5iaW5kKHRoaXMpKTtcbiAgICAgICAgJChcIiNidG5TdXBwcmltZXIzXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXt0aGlzLnN1cHByaW1lckpvdWV1cigzKTt9LmJpbmQodGhpcykpO1xuICAgICAgICAkKFwiI2J0blJldG91ckFjY3VlaWxcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe3RoaXMucmV0b3VyQWNjdWVpbCgpO30uYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb24ucGxheWVyRW5Db3VyczEpXG4gICAgICAgIGNvbnNvbGUubG9nKHNlc3Npb24ucGxheWVyRW5Db3VyczIpXG4gICAgfVxuXG4gICAgc3RhdGljIGluaXQoKSB7IC8vIGluaXRpYWxpc2F0aW9uIGRlIGxhIHBhZ2VcbiAgICAgICAgJChcIiNuYlZpY3RvaXJlczFcIikuaHRtbChzZXNzaW9uLnBsYXllckVuQ291cnMxLm5iV2luKTtcbiAgICAgICAgJChcIiNuYk51bHMxXCIpLmh0bWwoc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMS5uYkRyYXduKTtcbiAgICAgICAgJChcIiNuYkRlZmFpdGVzMVwiKS5odG1sKHNlc3Npb24ucGxheWVyRW5Db3VyczEubmJMb3NzKTtcbiAgICAgICAgJChcIiNuYlZpY3RvaXJlczJcIikuaHRtbChzZXNzaW9uLnBsYXllckVuQ291cnMyLm5iV2luKTtcbiAgICAgICAgJChcIiNuYk51bHMyXCIpLmh0bWwoc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMi5uYkRyYXduKTtcbiAgICAgICAgJChcIiNuYkRlZmFpdGVzMlwiKS5odG1sKHNlc3Npb24ucGxheWVyRW5Db3VyczIubmJMb3NzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmV0b3VySmV1KCkge1xuICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUpldVwiKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgc3VwcHJpbWVySm91ZXVyKGlkKSB7XG4gICAgICAgXG4gICAgICAgIFxuICAgICAgICBpZihpZCA9PSAxKXtcbiAgICAgICAgICAgIHNlc3Npb24ucGxheWVycyA9IHNlc3Npb24ucGxheWVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IHNlc3Npb24ucGxheWVyRW5Db3VyczEubmFtZSlcbiAgICAgICAgfWVsc2UgaWYgKGlkID09IDIpe1xuICAgICAgICAgICAgc2Vzc2lvbi5wbGF5ZXJzID0gc2Vzc2lvbi5wbGF5ZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0ubmFtZSAhPT0gc2Vzc2lvbi5wbGF5ZXJFbkNvdXJzMi5uYW1lKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHNlc3Npb24ucGxheWVycyA9IHNlc3Npb24ucGxheWVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IHNlc3Npb24ucGxheWVyRW5Db3VyczEubmFtZSlcbiAgICAgICAgICAgIHNlc3Npb24ucGxheWVycyA9IHNlc3Npb24ucGxheWVycy5maWx0ZXIoaXRlbSA9PiBpdGVtLm5hbWUgIT09IHNlc3Npb24ucGxheWVyRW5Db3VyczIubmFtZSlcbiAgICAgICAgfVxuICAgICAgICBtb2RlbGUuUGxheWVyc0Rhby5zYXZlUGxheWVycyhzZXNzaW9uLnBsYXllcnMpXG4gICAgICAgIHRoaXMucmV0b3VyQWNjdWVpbCgpO1xuICAgIH1cblxuICAgIHN0YXRpYyByZXRvdXJBY2N1ZWlsKCkge1xuICAgICAgICAkLm1vYmlsZS5jaGFuZ2VQYWdlKFwiI3Z1ZUFjY3VlaWxcIik7XG4gICAgfVxufSIsIi8vIG9uIGltcG9ydGUgdW5pcXVlbWVudCBsZSBtb2R1bGUgY29udHLDtGxldXJcbmltcG9ydCAqIGFzIGNvbnRyb2xldXIgZnJvbSBcIi4vY29udHJvbGV1ci5qc1wiO1xuXG52YXIgYXBwID0ge1xuICAgIC8vIEFwcGxpY2F0aW9uIENvbnN0cnVjdG9yXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsIHRoaXMub25EZXZpY2VSZWFkeS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgfSxcblxuICAgIC8vIGRldmljZXJlYWR5IEV2ZW50IEhhbmRsZXJcbiAgICAvL1xuICAgIC8vIEJpbmQgYW55IGNvcmRvdmEgZXZlbnRzIGhlcmUuIENvbW1vbiBldmVudHMgYXJlOlxuICAgIC8vICdwYXVzZScsICdyZXN1bWUnLCBldGMuXG4gICAgb25EZXZpY2VSZWFkeTogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb250cm9sZXVyLmluaXQoKTtcbiAgICB9XG59O1xuXG5hcHAuaW5pdGlhbGl6ZSgpO1xuIiwiLy8gQ2xhc3NlIHBvdXIgcmVwcsOpc2VudGVyIHVuZSBpbWFnZVxyXG5leHBvcnQgY2xhc3MgUGljdHVyZSB7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGRhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbnZvaWUgbCdpbWFnZSBhdSBmb3JtYXQgQmFzZTY0IGF2ZWMgZW4tdMOqdGUgTUlNRVxyXG4gICAgZ2V0QmFzZTY0KCkge1xyXG4gICAgICAgIHJldHVybiBcImRhdGE6aW1hZ2UvanBlZztiYXNlNjQsXCIrdGhpcy5kYXRhO1xyXG4gICAgfVxyXG4gICAgICBcclxufTtcclxuXHJcbi8vIENsYXNzZSBwb3VyIHJlcHLDqXNlbnRlciB1biBqb3VldXJcclxuZXhwb3J0IGNsYXNzIFBsYXllciB7XHJcbiAgXHJcbiAgICBjb25zdHJ1Y3RvcihpZCwgbmFtZSwgcGljdHVyZSwgbmJXaW4gPSAwLCBuYkxvc3MgPSAwLCBuYkRyYXduID0gMCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMucGljdHVyZSA9IHBpY3R1cmU7XHJcbiAgICAgICAgdGhpcy5uYldpbiA9IG5iV2luO1xyXG4gICAgICAgIHRoaXMubmJMb3NzID0gbmJMb3NzO1xyXG4gICAgICAgIHRoaXMubmJEcmF3biA9IG5iRHJhd247XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENsYXNzZSBwb3VyIHJlcHLDqXNlbnRlciB1bmUgcGFydGllIGRlIFRpY1RhY1RvZVxyXG5leHBvcnQgY2xhc3MgVGljVGFjVG9lIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIxLCBwbGF5ZXIyKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5ZXIxID0gcGxheWVyMTtcclxuICAgICAgICB0aGlzLnBsYXllcjIgPSBwbGF5ZXIyO1xyXG4gICAgICAgIHRoaXMuYm9hcmQgPSBbMCwwLDAsMCwwLDAsMCwwLDBdOyBcclxuICAgICAgICB0aGlzLmN1cnJlbnRQbGF5ZXIgPSBNYXRoLnJhbmRvbSgpIDwgMC41ID8gIHBsYXllcjEgOiBwbGF5ZXIyOyAvLyBMZSBwcmVtaWVyIGpvdWV1ciBlc3QgY2hvaXNpIGFsw6lhdG9pcmVtZW50XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhbmdlciBkZSBqb3VldXIgY291cmFudFxyXG4gICAgc3dpdGNoQ3VycmVudFBsYXllcigpe1xyXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFBsYXllciA9PT0gdGhpcy5wbGF5ZXIxKSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjI7XHJcbiAgICAgICAgZWxzZSB0aGlzLmN1cnJlbnRQbGF5ZXIgPSB0aGlzLnBsYXllcjE7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIExlIGpvdWV1ciBjb3VyYW50IGpvdWUgZW4gY2FzZUlkXHJcbiAgICBwbGF5KGNhc2VJZCkge1xyXG4gICAgICB0aGlzLmJvYXJkW2Nhc2VJZF09dGhpcy5jdXJyZW50UGxheWVyLmlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbnZvaWUgdnJhaSBzaSBsZSBqb3VldXIgY291cmFudCBhIGdhZ27DqSAob24gdsOpcmlmaWUgXCJicnV0IGZvcmNlXCIgdG91dGVzIGxlcyBwb3NzaWJpbGl0w6lzKVxyXG4gICAgaXNXaW4oKSB7IFxyXG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5jdXJyZW50UGxheWVyLmlkO1xyXG4gICAgICAgIHJldHVybiggdGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzFdID09IGlkICYmIHRoaXMuYm9hcmRbMl0gPT0gaWQgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbM10gPT0gaWQgJiYgdGhpcy5ib2FyZFs0XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzVdID09IGlkIHx8XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkWzZdID09IGlkICYmIHRoaXMuYm9hcmRbN10gPT0gaWQgJiYgdGhpcy5ib2FyZFs4XSA9PSBpZCB8fCBcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbMF0gPT0gaWQgJiYgdGhpcy5ib2FyZFszXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzZdID09IGlkIHx8IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFsxXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbN10gPT0gaWQgfHxcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9hcmRbMl0gPT0gaWQgJiYgdGhpcy5ib2FyZFs1XSA9PSBpZCAmJiB0aGlzLmJvYXJkWzhdID09IGlkIHx8IFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2FyZFswXSA9PSBpZCAmJiB0aGlzLmJvYXJkWzRdID09IGlkICYmIHRoaXMuYm9hcmRbOF0gPT0gaWQgfHwgXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvYXJkWzJdID09IGlkICYmIHRoaXMuYm9hcmRbNF0gPT0gaWQgJiYgdGhpcy5ib2FyZFs2XSA9PSBpZCBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbnZvaWUgdnJhaSBzJ2lsIHkgYSBtYXRjaCBudWwgKGF1Y3VuZSBjYXNlKVxyXG4gICAgaXNEcmF3bigpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50ID09PSAwKSA9PT0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBDbGFzc2UgcG91ciBnw6lyZXIgbGEgcGVyc2lzdGFuY2UgZCd1biB0YWJsZWF1IGRlIGpvdWV1cnNcclxuZXhwb3J0IGNsYXNzIFBsYXllcnNEYW8ge1xyXG4gIFxyXG4gICAgLy8gU2F1dmVnYXJkZSBsZSB0YWJsZWF1IGRlIGpvdWV1cnMgZGFucyBsZSBsb2NhbCBzdG9yYWdlXHJcbiAgICAgICAgc3RhdGljIHNhdmVQbGF5ZXJzKHBsYXllcnMpe1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwbGF5ZXJzXCIsIEpTT04uc3RyaW5naWZ5KHBsYXllcnMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgLy8gUsOpY3Vww6hyZSBsZSB0YWJsZWF1IGRlIGpvdWV1cnMgZGFucyBsZSBsb2NhbCBzdG9yYWdlXHJcbiAgICBzdGF0aWMgZ2V0QWxsUGxheWVycygpe1xyXG4gICAgICAgIGNvbnN0IHN0cmluZ1BsYXllcnMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwbGF5ZXJzXCIpO1xyXG4gICAgICAgIC8vIFNpIHRhYmxlYXUgbm9uIHN0b2Nrw6ksIG9uIHJlbnZvaWUgdW4gdGFibGVhdSB2aWRlXHJcbiAgICAgICAgaWYoc3RyaW5nUGxheWVycyA9PT0gbnVsbClcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBBcnJheSgpO1xyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0cmluZ1BsYXllcnMpOyAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIENsYXNzZSBwb3VyIG1hbmlwdWxlciB1biB0YWJsZWF1IGRlIGpvdWV1cnNcclxuZXhwb3J0IGNsYXNzIFBsYXllcnNVdGlscyB7XHJcblxyXG4gICAgLy8gUmVjaGVyY2hlIHVuIGpvdWV1ciBwYXIgc29uIG5vbSBkYW5zIHVuIHRhYmxlYXUgZGUgam91ZXVyc1xyXG4gICAgc3RhdGljIGZpbmRQbGF5ZXJCeU5hbWVJbkFycmF5KHBsYXllcnMsIHBsYXllck5hbWUpe1xyXG4gICAgICAgIHJldHVybiBwbGF5ZXJzLmZpbmQoZWxlbWVudCA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyTmFtZSk7XHJcbiAgICB9XHJcbiAgICAgXHJcbiAgICAvLyBNZXQgw6Agam91ciBvdSBham91dGUgdW4gam91ZXVyIGRhbnMgbGUgdGFibGVhdSBkZSBqb3VldXJzXHJcbiAgICBzdGF0aWMgYWRkT3JVcGRhdGVQbGF5ZXJJbkFycmF5KHBsYXllcnMsIHBsYXllcikge1xyXG4gICAgICAgIGNvbnN0IHtpZCwgLi4ucGFydGlhbFBsYXllcn0gPSBwbGF5ZXI7IC8vIHBhcnRpYWxQbGF5ZXIgPSBwbGF5ZXIgbW9pbnMgbCdpZCBxdSdvbiBuZSB2ZXV0IHBhcyBlbnJlZ2lzdHJlclxyXG4gICAgICAgIGNvbnN0IHBsYXllckluZGV4ID0gcGxheWVycy5maW5kSW5kZXgoZWxlbWVudCA9PiBlbGVtZW50Lm5hbWUgPT0gcGxheWVyLm5hbWUpO1xyXG4gICAgICAgIGlmIChwbGF5ZXJJbmRleCAhPSAtMSkgeyAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHBsYXllcnNbcGxheWVySW5kZXhdID0gcGFydGlhbFBsYXllcjsgLy8gU2kgbGUgam91ZXVyIGV4aXN0ZSBkw6lqw6AsIG9uIGxlIG1ldCDDoCBqb3VyXHJcbiAgICAgICAgfSBlbHNlIHsgXHJcbiAgICAgICAgICAgIHBsYXllcnMucHVzaChwYXJ0aWFsUGxheWVyKTsgLy8gU2lub24gb24gbCdham91dGUgw6AgbGEgZmluXHJcbiAgICAgICAgfSAgXHJcbiAgICB9XHJcbn1cclxuLy8gTGEgY2xhc3NlIENvcmRvdmFBUEkgZXN0IHVuIHNlcnZpY2UgcGVybWV0dGFudCBkJ3VpbGlzZXIgbCdBUEkgZGUgY29yZG92YSBzb3VzIGZvcm1lIGRlIHByb21lc3Nlc1xyXG5leHBvcnQgY2xhc3MgQ29yZG92YUFQSSB7XHJcbiAgICBzdGF0aWMgdGFrZVBpY3R1cmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5jYW1lcmEuZ2V0UGljdHVyZShcclxuICAgICAgICAgICAgICAgICAgICBpbWFnZURhdGEgPT4gcmVzb2x2ZShpbWFnZURhdGEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGVyciA9PiByZWplY3QoZXJyKSxcclxuICAgICAgICAgICAgICAgICAgICB7ICAgLy8gcXVhbGl0w6kgZW5jb2RhZ2UgNTAlLCBmb3JtYXQgYmFzZTY0IChldCBKUEVHIHBhciBkw6lmYXV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWFsaXR5OiA1MCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25UeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLkRlc3RpbmF0aW9uVHlwZS5EQVRBX1VSTCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5jb2RpbmdUeXBlOiBuYXZpZ2F0b3IuY2FtZXJhLkVuY29kaW5nVHlwZS5KUEVHLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZWRpYVR5cGU6IG5hdmlnYXRvci5jYW1lcmEuTWVkaWFUeXBlLlBJQ1RVUkUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcnJlY3RPcmllbnRhdGlvbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlVHlwZTogbmF2aWdhdG9yLmNhbWVyYS5QaWN0dXJlU291cmNlVHlwZS5DQU1FUkEsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVyYURpcmVjdGlvbjogbmF2aWdhdG9yLmNhbWVyYS5EaXJlY3Rpb24uRlJPTlRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=