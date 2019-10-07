import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent{
  characters:string[]=['Iron Man', 'Captain America','Thor','Dr. Strange','Hulk'];
  show : boolean = true;
  constructor() { }
}
