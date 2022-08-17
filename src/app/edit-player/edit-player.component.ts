import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allAvatarPictures = ['1.png', '2.png', '3.png', '4.png'];

  constructor() { }

  ngOnInit(): void {
  }

}
