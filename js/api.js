class GamingApi {
    constructor() {
        this.proxyURL = 'https://api.allorigins.win/raw?url='; 
        this.baseUrl = "https://www.gamerpower.com/api/giveaways";
    }
    
    async getAllData(gameName) {
        if (!gameName) return;
        try {
            const response = await fetch(`${this.proxyURL}${encodeURIComponent(this.baseUrl)}`);
            if (!response.ok) throw new Error('Ошибка загрузки данных');
            const result = await response.json();
            
            const foundGames = result.filter(game => 
                game.title.toLowerCase().includes(gameName.toLowerCase())
            );
            
            if (foundGames.length === 0) throw new Error('Игра не найдена');
            return foundGames[0];
        } catch (error) {
            throw new Error('Не удалось найти игру: ' + error.message);
        }
    }
}