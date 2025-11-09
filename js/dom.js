class GameDom {
    constructor() {
        this.searchForm = document.querySelector('.header_search');
        this.searchInput = document.querySelector('.header_input');
        
        this.gameTitle = document.querySelector('.game-title');
        this.gameImage = document.querySelector('.game-image');
        this.gameWorth = document.querySelector('.game-worth');
        this.gamePlatform = document.querySelector('.game-platform');
        this.gameType = document.querySelector('.game-type');
        this.gameDescription = document.querySelector('.game-description');
        this.gameButton = document.querySelector('.game-button');
        this.gameEndDate = document.querySelector('.game-date');

        this.gameDetails = document.querySelector('.game-details');
    }

    showGame(game) {
        try {
            console.log('Найдена игра:', game);
            if (!this.gameDetails) {
                console.error('gameDetails не найден');
                return;
            }
        this.gameDetails.classList.add('show');
        this.gameTitle.textContent = game.title || 'Название не указано';
        if(game.worth=="N/A"){this.gameWorth.textContent = 'Бесплатно';}
            else{this.gameWorth.textContent = game.worth;}
        this.gamePlatform.textContent = game.platforms || 'Платформа не указана';
        this.gameType.textContent = game.type || 'Тип не указан';
        this.gameDescription.textContent = game.description || 'Описание отсутствует';
        this.gameEndDate.textContent = game.end_date||'Дата отсутствует';
        if(this.gameButton){
            const gameUrl = game.open_giveaway_url;
            if (gameUrl) {
                this.gameButton.href = gameUrl;
                if (game.worth=="N/A"){
                this.gameButton.textContent = `Получить игру бесплатно`;    
                }
                else{this.gameButton.textContent = `Получить игру за ${game.worth}`;}
                this.gameButton.style.display = 'inline-block';
                console.log('Ссылка на игру:', gameUrl);
            } else {
                this.gameButton.style.display = 'none';
                console.log('Ссылка на игру не найдена в JSON');
            }
        }
        this.gameImage.innerHTML = `
            <img src="${game.image}" 
                 alt="${game.title}" 
                 class="game-image-img"
                 style="max-width: 100%; border-radius: 10px;"
                 onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'">`;

    } catch (error) {
        console.error('Ошибка в showGame:', error);
        this.showError('Ошибка загрузки данных об игре');
    }
    }
hideGameDetails(){
        if (this.gameDetails) {
            this.gameDetails.classList.remove('show');
        }
    }
    showError(message) {
        const errorMessage = document.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }
    

    setupSearch(handler) {
        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const gameName = this.searchInput.value.trim();
            
            if (!gameName) {
                this.showError('Введите название игры');
                return;
            }
            console.log("Ищем игру...")
            handler(gameName);
        });

        this.searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                this.searchForm.dispatchEvent(new Event('submit'));
            }
        });
    }
    
}