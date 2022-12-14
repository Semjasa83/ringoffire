export class Game {
    public players: string[] = []; //permit only string in the Array //public for all File access
    public avatars: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';

    constructor() {
        for(let i = 1; i < 14; i++) { //for all 13 Cards per Sort
            this.stack.push('spade_' + i); //Pics spade_1... spade_2...
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
            this.stack.push('hearts_' + i);
        }

        shuffle(this.stack);

    }

    public toJSON(){
      return {
        players: this.players,
        avatars: this.avatars,
        stack: this.stack,
        playedCards: this.playedCards,
        currentPlayer: this.currentPlayer,
        pickCardAnimation: this.pickCardAnimation,
        currentCard: this.currentCard
      };
    }
}



function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  // Used like so
  var arr = [2, 11, 37, 42];
  shuffle(arr);
  //console.log(arr);  //______CONSOLE
