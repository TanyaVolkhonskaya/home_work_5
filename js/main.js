class Gaming{
    constructor(){
        this.api=new GamingApi();
        this.dom = new GameDom();
        this.init();
    }
    init(){
        this.dom.setupSearch(this.Searcher.bind(this));
        this.dom.hideGameDetails();
    }

async Searcher(game){
    try{
            const gameData = await this.api.getAllData(game);
            
            if (!gameData) {
                this.dom.showError('Данная игра сейчас не в раздаче');
                this.dom.hideGameDetails();
                return;
            }
            this.dom.showGame(gameData);
            
        } catch (error){
            this.dom.showError(error.message);
            this.dom.hideGameDetails();
        }
}
}
document.addEventListener('DOMContentLoaded', ()=>{
    new Gaming();
})