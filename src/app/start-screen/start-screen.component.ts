import { GameComponent } from './../game/game.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData, setDoc } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { elementAt, Observable } from 'rxjs';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

// Collection speichern
private gameComponent: CollectionReference<DocumentData>;
  constructor(private router: Router, private firestore: Firestore) {
    // pull Collection
    this.gameComponent = collection(firestore, 'game');
  }

  ngOnInit(): void {
  }

  async newGame() {
    let game = new Game();

    const gameInfo = await addDoc(collection(this.firestore, "games"), game.toJSON());
    console.log('va', gameInfo);
    console.log('va ID', gameInfo.id);

    // document add to collection
    //id = 'ID from Firebase';
    this.router.navigateByUrl('/game/' + gameInfo.id);
  }

}
