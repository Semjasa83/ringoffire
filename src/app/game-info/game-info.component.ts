import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {
      title: 'Waterfall',
      describtion:
        'To perform a waterfall, all players start drinking their beverage at the same time. No player can stop drinking until the player to their left stops.',
    },
    {
      title: 'two 4 you',
      describtion:
        'The player who drew the card gives out two drinks, either both to the same person or one to two different people.',
    },
    {
      title: 'three 4 me',
      describtion: 'The player who drew the card takes a drink.',
    },
    {
      title: 'hit the Floor',
      describtion:
        'Last person to touch the floor with their hands must take a drink.',
    },
    {
      title: 'Thumb Master',
      describtion:
        'When you put your thumb on the table everyone must follow and whoever is last must drink. You are the thumb master till someone else picks a five.',
    },
    { title: '6 is chicks', describtion: 'All women playing take a drink.' },
    {
      title: 'Heaven',
      describtion: 'Last person to raise their hand has to drink.',
    },
    {
      title: 'Mate',
      describtion:
        'The player who drew the card chooses another player who must drink at the same time as them for the rest of the game.',
    },
    {
      title: 'Nine is Rhyme',
      describtion:
        'The player who drew the card says a word, with players going clockwise each saying a word that rhyme with the original. The first person to fail to come up with a rhyming word that has not been used must drink.',
    },
    {
      title: 'Categories',
      describtion:
        'The player who drew the card chooses a category, with players going clockwise to name things that fall within the category. The first person to fail to come up with something that has not been said must drink.',
    },
    {
      title: 'Never had I ever',
      describtion:
        'Starting with the player who drew the card, everyone goes around the circle and saying "never have I ever ___." Whoever has done the action must drink.',
    },
    {
      title: 'Questions',
      describtion:
        'The player who drew the card starts by asking anyone a question. This player then asks anyone else a question. The first player who fails to ask a question must drink.',
    },
    {
      title: 'Kings Cup + Rules',
      describtion:
        'When each of the first 3 Kings are drawn, the person who drew the card puts some of their drink into the Kings Cup at the center of the table. When the 4th King is drawn, the person who drew the 4th King must drink the contents of the Kings Cup.',
    },
  ];

  title: string = '';
  description: string = '';
  @Input() card: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      //console.log('Current card is:', this.card); //_____CONSOLE
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title; //aus cardAction wird die Zahl aus den Karten genommen, wegen Array -1 um die richtige Stelle zu erwischen
      this.description = this.cardAction[cardNumber - 1].describtion;
    }
  }
}
