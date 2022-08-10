import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
// Collection speichern
  constructor(private router: Router) {
    // Collection holen
  }

  ngOnInit(): void {
  }

  newGame() {
    // Start Game
    // document zu collection hinzufügen
    let id = 'ID von Firebase';
    this.router.navigateByUrl('/game/' + id);
  }

}
