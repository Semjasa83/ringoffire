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
import { Firestore, collectionData, docData } from '@angular/fire/firestore';

import { Injectable } from '@angular/core';
import { elementAt, Observable } from 'rxjs';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

// Collection speichern
private gameComponent: CollectionReference<DocumentData>;
  constructor(private router: Router, firestore: Firestore) {
    // pull Collection
    this.gameComponent = collection(firestore, 'games');
    //console.log('comp:', this.gameComponent); ____CONSOLE
  }

  ngOnInit(): void {
  }

  async newGame() {
    // Start Game
    let elem = await addDoc(this.gameComponent, {'test':'test'})
    console.log('va', elem);
    console.log('va ID', elem.id);

    // document zu collection hinzufügen
    //id = 'ID von Firebase';
    this.router.navigateByUrl('/game/' + elem.id);
  }

}
