const gamePlay = {
    
    init: function () {
        const buttonsElmt = document.querySelectorAll('.free');
        for (const buttonElmt of buttonsElmt) {
            buttonElmt.addEventListener('click', gamePlay.handleClickPlayer);
        }
    },

    /**
     * Quand l'utilisateur clique sur une case, 
     * on fait apparaitre une croix
     */
    handleClickPlayer: function (evt) {
        evt.target.classList.add('invisible')
        evt.target.classList.remove('free')
        let caseElmt = evt.target.closest('div');
        crossUser = caseElmt.querySelector('p');
        crossUser.textContent = "X";
        crossUser.classList.remove('invisible');
        crossUser.classList.add('x');
        caseElmt.classList.add('checkX');

        // On regarde si le joueur à gagné ou non
        checkResult.checkPlayer(caseElmt);
        
        setTimeout(gamePlay.computerStrategy, 80); 
    },

    /**
     *  Algorithme mit en place pour :
     * 1- Que le PC gagne
     * 2- éviter que le joueur gagne
     * 3- Le PC choisit une case au hasard
     */
    computerStrategy : function () {
        const buttonsForPC = document.querySelectorAll('.free');

        // SI toutes les cases sont rempli et que le joueur n'a pas gagné, on considère qu'il a perdu
        if(buttonsForPC.length=== 0 && document.querySelector('.result').classList.contains('invisible')) {
            let nulCompteur = localStorage.getItem('nul');
            nulCompteur++;
            localStorage.setItem("nul", nulCompteur);
            setTimeout(checkResult.results('MATCH NUL'), 100);
        }

        buttonsx2User = [];
        buttonso2PC = [];

        // Permet de récuperer les cases sur lequel le joueur peut jouer pour gagner
        if(checkResult.classx2Array.length>0) {
            for (classSelected of checkResult.classx2Array) {
                casesElmt = document.querySelectorAll('.'+classSelected);
                for (caseTest of document.querySelectorAll('.'+classSelected)) {
                    if (caseTest.querySelector('.free')) {
                        buttonsx2User.push(caseTest.querySelector('.free'));
                    }  
                }
            }
        }

        // Permet de récuperer les cases sur lequel le PC peut jouer pour gagner
        if(checkResult.classo2Array.length>0) {
            for (classSelected of checkResult.classo2Array) {
                casesElmt = document.querySelectorAll('.'+classSelected);
                for (caseTest of document.querySelectorAll('.'+classSelected)) {
                    if (caseTest.querySelector('.free')) {
                        buttonso2PC.push(caseTest.querySelector('.free')); 
                    }
                }
            }
        }
      
        if(buttonso2PC.length>0) {
            let number = Math.floor(Math.random() *buttonso2PC.length );
            let buttonElmt = buttonso2PC[number];

            gamePlay.computerPlay(buttonElmt);   
        }

        else if(buttonsx2User.length>0) {
            let number = Math.floor(Math.random() *buttonsx2User.length );
            let buttonElmt = buttonsx2User[number];

            gamePlay.computerPlay(buttonElmt);
        }

        else if(buttonsForPC.length>0) {
            // On choisit une case au hasard
            let number = Math.floor(Math.random() * buttonsForPC.length );
            let buttonElmt = buttonsForPC[number];

            gamePlay.computerPlay(buttonElmt);
        }

    },

    /**
     * Simule le jeu du PC
     * on fait apparaitre un cercle
     */
    computerPlay : function (buttonElmt) {
        buttonElmt.classList.add('invisible')
        buttonElmt.classList.remove('free')
        let caseElmt = buttonElmt.closest('div');
        roundPC = caseElmt.querySelector('p');
        roundPC.textContent="O";
        roundPC.classList.remove('invisible');
        roundPC.classList.add('o');
        caseElmt.classList.add('checkO');

        // On regarde si le joueur à perdu ou non
        checkResult.checkPlayer(caseElmt);
    },




}