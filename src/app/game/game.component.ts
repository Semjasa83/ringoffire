import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { doc, setDoc } from "firebase/firestore";

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

  constructor(private firestore: Firestore, public dialog: MatDialog) {}

  coll = collection(this.firestore, 'games');
  games$ = collectionData(this.coll);

  ngOnInit(): void {
    this.newGame();
    this
      .games$
      .subscribe((game) => {
        console.log('gameupdate', game);
    });
    ;
  }

  newGame() {
    this.game = new Game();
    setDoc(doc(this.coll), this.game.toJSON());
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;
      //console.log('Game is', this.game);            //__CONSOLE
      this.game.currentPlayer++;
      this.game.currentPlayer =
        this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
        //console.log('New Card: ' + this.currentCard); //__CONSOLE
      }, 1300);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
