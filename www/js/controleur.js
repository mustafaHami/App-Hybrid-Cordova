////////////////////////////////////////////////////////////////////////////////
// Module Controleur contient :
// - un objet session contenant les données modélisant l'état de l'application
// - une fonction "init" pour initialiser l'application
// - une classe "controller" abstraite pour chaque page
////////////////////////////////////////////////////////////////////////////////

import * as modele from "./modele.js"; // le contrôleur utilise le modèle

////////////////////////////////////////////////////////////////////////////////
// Session : variables qui représentent l'état de l'application
////////////////////////////////////////////////////////////////////////////////

var session = {
    playerEnCours1: null, // Le joueur 1 courant
    playerEnCours2: null, // Le joueur 1 courant
    partieEnCours: null,  // La partie en train d'être jouée
    players : modele.PlayersDao.getAllPlayers() // tableau contenant tous les players
};

////////////////////////////////////////////////////////////////////////////////
// init : exécutée au démarrage de l'application (voir fichier index.js)
////////////////////////////////////////////////////////////////////////////////

export function init() {
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
        var player = modele.PlayersUtils.findPlayerByNameInArray(session.players,nom); // on recherche le nom de cette personne dans le tablaeu de players
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
                session.playerEnCours1 =  new modele.Player(id,nom,"");
            }else{
                session.playerEnCours2 =  new modele.Player(id,nom,"");
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
            session.partieEnCours = new modele.TicTacToe(session.playerEnCours1,session.playerEnCours2); // charge la partie du joueur depuis le localstorage
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

        modele.CordovaAPI.takePicture()
            .then ( imageData => {
                if(id == 1){
                    session.playerEnCours1.picture = new modele.Picture(imageData).getBase64();
                    $("#imgPhoto1").attr("src",session.playerEnCours1.picture);
                    console.log("Prise reussie")
                    modele.PlayersUtils.addOrUpdatePlayerInArray(session.players,session.playerEnCours1)
                    modele.PlayersDao.savePlayers(session.players)
                }else{
                    session.playerEnCours2.picture =  new modele.Picture(imageData).getBase64();
                    $("#imgPhoto2").attr("src",session.playerEnCours2.picture);
                    console.log("Prise reussie")
                    modele.PlayersUtils.addOrUpdatePlayerInArray(session.players,session.playerEnCours2)
                    modele.PlayersDao.savePlayers(session.players)
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
        session.partieEnCours = new modele.TicTacToe(session.playerEnCours1,session.playerEnCours2); // charge la partie du joueur depuis le localstorage
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
        modele.PlayersUtils.addOrUpdatePlayerInArray(session.players,session.playerEnCours1) 
        modele.PlayersUtils.addOrUpdatePlayerInArray(session.players,session.playerEnCours2)
        //save dans le local storage
        modele.PlayersDao.savePlayers(session.players)
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
        modele.PlayersDao.savePlayers(session.players)
        this.retourAccueil();
    }

    static retourAccueil() {
        $.mobile.changePage("#vueAccueil");
    }
}