const checkResult = {

    classx2Array : [],
    classo2Array : [],

    /**
     * Permet de vérifier si l'utilisateur à gagné ou perdu
     * à chaque tour de jeu
     */
    checkPlayer: function (caseElmt) {
        const listClass=caseElmt.className;
        
        let winCompteur = localStorage.getItem('win');
        let classArray = listClass.split(" ");
        for (let nb =0; nb < classArray.length-1; nb++ ) {
            divSameClassElmt = document.querySelectorAll("."+classArray[nb]);

            let compteurX = 0;
            let compteurO = 0;
            for (const divElmt of divSameClassElmt) {
                let listClass =divElmt.className.split(" ");
                
                if(listClass[listClass.length-1] === "checkX") {
                    compteurX ++;
                }
                if(listClass[listClass.length-1] === "checkO") {
                    compteurO ++;
                }
            }

            if (compteurX===3) {
                // on enregistre le nb de partie gagnée grâce à local storage
                winCompteur++;
                localStorage.setItem("win", winCompteur);

                setTimeout(checkResult.results('BRAVO'), 100);
            } 
            
            if (compteurO===3) {
                setTimeout(checkResult.results('GAME OVER !'), 100);
            }  

            // Permet de voir si le PC peut gagné au prochain coup
            if (compteurO===2) {
                if (!checkResult.classo2Array.includes(classArray[nb])) {
                  checkResult.classo2Array.push(classArray[nb]); 
                }               
            } 

            // Pour essayer d'empecher la victoire du joueur
            if (compteurX===2) {
                if (!checkResult.classx2Array.includes(classArray[nb])) {
                  checkResult.classx2Array.push(classArray[nb]); 
                }               
            }   
        } 
        
    },

    /**
     * Affichage du résultat final
     * 
     */
    results: function (final) {
        // on enregistre le nb de partie joué grâce à local storage
        let playCompteur = localStorage.getItem('play');
        playCompteur++;
        localStorage.setItem("play", playCompteur);

        buttonsElmt = document.querySelectorAll('.free');
        for (const buttonElmt of buttonsElmt) {
            buttonElmt.classList.add('invisible');
            buttonElmt.classList.remove('free');
        }
  
        document.querySelector('.result').classList.remove('invisible');
        document.querySelector('.result h2').textContent = final;

        // On met a jour le tableau des stats
        statistiques.init();

    },   
}