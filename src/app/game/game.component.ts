import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  collectionData,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game: Game;
  games: Observable<Game[]>;
  gameId: string = '';
  baseUrl: string = '';
  host: string = '';
  gameOver = false;

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      //console.log('current ID', params.id); //_______CONSOLE
      this.gameId = params.id; // hinzugefügt
      onSnapshot(doc(this.firestore, 'games', params.id), (doc) => {
        const loadGame: any = doc.data();
        this.updateGameData(loadGame);
      });
    });
    this.baseUrl = window.location.origin;
  }

  newGame() {
    this.game = new Game();
  }

  restartGame() {
    this.gameOver = false;
    this.newGame();
  }

  takeCard() {
    console.log('this game: ', this.game); // _________CONSOLE
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation && this.game.players.length > 0) {
      this.game.pickCardAnimation = true;
      this.playerChange();
      this.popCurrentCard();
      this.playedCards();
      //console.log('this current card 3: ', this.game.currentCard); //________CONSOLE
    }
    if (this.game.players.length == 0){
      this.openDialog();
    }
  }

  playerChange() {
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    this.saveGame();
  }

  popCurrentCard() {
    this.game.currentCard = this.game.stack.pop();
    //console.log('this current card 1: ', this.game.currentCard); //________CONSOLE
    this.saveGame();
  }

  playedCards() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      //console.log('this current card 2: ', this.game.currentCard); //________CONSOLE
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1300);
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.avatars.splice(playerId, 1)
          this.game.players.splice(playerId, 1)
        } else {
          this.game.avatars[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.avatars.push(String('1.png'));
        this.saveGame();
      }
    });
  }

  getBaseURL() {
    var baseURL = window.location.origin;
    var host = window.location.host;
    //console.log(baseURL + '/game/' + this.gameId); //_____CONSOLE
    //console.log(host);//_____CONSOLE
  }

  openGameUrl() {
    var gameUrlDialog = document.getElementById('GameID');
    gameUrlDialog.classList.remove('d-none');
  }

  closeGameUrl() {
    var gameUrlDialog = document.getElementById('GameID');
    gameUrlDialog.classList.add('d-none');
  }

  saveGame() {
    const coll: any = collection(this.firestore, 'games');
    setDoc(doc(coll, this.gameId), this.game.toJSON());
    //console.log('gameID: ', this.gameId); //_________CONSOLE
  }

  updateGameData(loadGame: any) {
    this.game.currentPlayer = loadGame.currentPlayer;
    this.game.playedCards = loadGame.playedCards;
    this.game.players = loadGame.players;
    this.game.avatars = loadGame.avatars;
    this.game.stack = loadGame.stack;
    this.game.pickCardAnimation = loadGame.pickCardAnimation;
    this.game.currentCard = loadGame.currentCard;
  }
}
