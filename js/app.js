const app = {
    init: function () {
        gamePlay.init();
        statistiques.init();
    },
};

document.addEventListener('DOMContentLoaded', app.init);