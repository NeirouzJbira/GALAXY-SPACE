import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public computerResult: string;
  public result : string
  public results = { computer: 0, player: 0 };
  private userResult : string;


  public play(action: string): void { //so here when you click any of the buttons it will work in the console
    console.log('USER: ',action);
    this.userResult = action
    this.computer()
    this.calculateWinner();
  }
    private computer(): void {
      const randomNumber = Math.floor(Math.random() * 3);
      const options : string[] = ['rock', 'paper', 'scissors'] ; // and here you will be the user vs the computer so when you click like on button paper the computer rondomly he will choose  another option with you or the same
      console.log('COMPUTER: ',options[randomNumber])
      this.computerResult = options[randomNumber]
  }
  private calculateWinner(): void {
    if(this.userResult === this.computerResult) {
      this.result ='There was a tie / draw 🍬'
    }
    if(this.userResult === 'rock' && this.computerResult === 'paper') {
      this.results.computer++;
      this.result ='Computer win 🐒'
    }

    if(this.userResult === 'rock' && this.computerResult === 'scissors') {   // all the conditions options
      this.results.player++;                                                        
                                                                          
      this.result ='Congradulation You Win 😎 '
    }

    if(this.userResult === 'paper' && this.computerResult === 'rock') {
      this.results.player++;
      this.result ='Congradulation You Win 😎 '
    }

    if(this.userResult === 'paper' && this.computerResult === 'scissors') {
      this.results.computer++;
      this.result ='Computer win 🐒'
    }

    if(this.userResult === 'scissors' && this.computerResult === 'rock') {
      this.results.computer++;
      this.result ='Computer win 🐒 '
    }

    if(this.userResult === 'scissors' && this.computerResult === 'paper') {
      this.results.player++;
      this.result ='Congradulation You Win 😎'
    }

  }
}

