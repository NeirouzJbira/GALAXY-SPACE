import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public play(action: string): void { //so here when you click any of the buttons it will work in the console
    console.log(action);
    this.computer()
  }
    private computer(): void {
      const randomNumber = Math.floor(Math.random() * 3);
      const options : string[] = ['rock', 'paper', 'scissors'] ; // and here when you click like on button paper the computer rondomly he will choose  another option with you
      console.log(options[randomNumber])
    
  }
}
