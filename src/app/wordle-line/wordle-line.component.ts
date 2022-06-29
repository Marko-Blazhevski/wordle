import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {EventEmitter} from "@angular/core";

import * as $ from 'jquery';
import {WordleService} from "../wordle.service";

@Component({
  selector: 'app-wordle-line',
  templateUrl: './wordle-line.component.html',
  styleUrls: ['./wordle-line.component.css']
})
export class WordleLineComponent implements OnInit , OnChanges {

  num_rows = 6;
  num_letters = 5;
  static num_items = 30;
  WORD! : string;

  @Input() letter? : [string , number];

  @Output() buttonDisabled = new EventEmitter();

  constructor(private wordleService : WordleService) { }

  ngOnInit(): void {
    this.WORD = this.wordleService.getWord();
  }

  ngOnChanges(): void {
    if(this.letter == undefined){
    }
    else{
      document.getElementsByClassName('wordle_letter')!.item(30 - WordleLineComponent.num_items)!
        .innerHTML = this.letter[0];
      WordleLineComponent.num_items--;
      if(WordleLineComponent.num_items % 5 == 0){
        WordleLineComponent.num_items++;
      }
    }
  }

  check() {
    WordleLineComponent.num_items--;
    let word = "";
    let elems = document.getElementsByClassName('wordle_letter');
    let counter : number = 0;
    for(let i = 30 - WordleLineComponent.num_items - 5;i < 30 - WordleLineComponent.num_items; i++){
      word += elems.item(i)!.innerHTML;
      if(elems.item(i)!.innerHTML == this.WORD.charAt(counter)){
        $(elems.item(i)!).css('background-color','lightgreen');
      }
      else if (this.WORD.indexOf(elems.item(i)!.innerHTML) > -1){
        $(elems.item(i)!).css('background-color','lightyellow');
      }
      else{
        $(elems.item(i)!).css('background-color','lightgray');
      }
      counter++;
    }
    if(word == this.WORD){
      alert('YOU WON');
      this.buttonDisabled.emit(null);
      if(window.confirm('Start again?')){
        location.reload();
      }
    }
    if(WordleLineComponent.num_items == 0){
      alert('GAME FINISHED');
      window.confirm('End');
    }
  }

  delete() {
    if(30 - WordleLineComponent.num_items > 0){
      WordleLineComponent.num_items++;
    }
    document.getElementsByClassName('wordle_letter')!.item(30 - WordleLineComponent.num_items)!
      .innerHTML = ' ';
  }
}
