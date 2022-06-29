import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle_v1';

  isDisabled = false;

  selected_letter ?: [string,number];
  static num = 0;

  onSelect(letter : string):void{
    this.selected_letter = [letter,AppComponent.num++];
  }

  disableButtons () {
    this.isDisabled = true;
  }
}
