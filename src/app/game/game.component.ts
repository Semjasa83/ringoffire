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

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  games: Observable<Game[]>;

  gameId: string = '';

  constructor(
    private route: ActivatedRoute,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log('current ID', params.id); //_______CONSOLE

      this.gameId = params.id; // hinzugefügt
      onSnapshot(doc(this.firestore, 'game', params.id), (doc) => {
        const loadGame: any = doc.data();
        this.updateGameData(loadGame);
      });
    });
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    console.log('this game: ', this.game); // _________CONSOLE
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.saveGame();
      console.log('this current card: ', this.currentCard); //________CONSOLE
      this.cardAnimation();
    }
  }

  cardAnimation() {
    this.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.saveGame();
      this.pickCardAnimation = false;
    }, 1300);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }

  saveGame() {
    const coll: any = collection(this.firestore, 'games');
    setDoc(doc(coll, this.gameId), this.game.toJSON());
    console.log('gameID: ', this.gameId); //_________CONSOLE
  }

  updateGameData(loadGame: any) {
    // this.game.gameName = loadGame.gameName;
    this.game.currentPlayer = loadGame.currentPlayer;
    this.game.playedCards = loadGame.playedCards;
    this.game.players = loadGame.players;
    this.game.stack = loadGame.stack;
    // this.game.pickCardAnimation = loadGame.pickCardAnimation;
    // this.game.currentCard = loadGame.currentCard;
  }
}
