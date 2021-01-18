import { Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rps',
  templateUrl: './rps.component.html',
  styleUrls: ['./rps.component.css']
})
export class RpsComponent  {
  constructor(
    private router: Router,
  ) { }

  public computerResult: string;
  public result: string;
  public results = { computer: 0, player: 0 };

  private userResult: string;

  public play(action: string): void {
    // console.log('USER: ', action);
    this.userResult = action;
    this.computer();
    this.calculateWinner();
  }

  private computer(): void {
    const randomNumber = Math.floor(Math.random() * 3);
    const options: string[] = [ 'rock', 'paper', 'scissors' ];

    // console.log('COMPUTER: ', options[randomNumber]);
    this.computerResult = options[randomNumber];
  }

  private calculateWinner(): void {
    if (this.userResult === this.computerResult) {
      this.result = '🍭 There was a tie / draw 🍭';
    }

    if (this.userResult === 'rock' && this.computerResult === 'paper') {
      this.results.computer++;
      this.result = '🐒 🐖 𝘾𝙤𝙢𝙥𝙪𝙩𝙚𝙧 𝙬𝙞𝙣𝙨 🐖 🐒';
    }
    if (this.userResult === 'rock' && this.computerResult === 'scissors') {
      this.results.player++;
      this.result = '🏆 😈 𝙔𝙤𝙪 𝙬𝙞𝙣 😈 🏆';
    }
    if (this.userResult === 'paper' && this.computerResult === 'rock') {
      this.results.player++;
      this.result = '🏆 😈 𝙔𝙤𝙪 𝙬𝙞𝙣 😈 🏆';
    }
    if (this.userResult === 'paper' && this.computerResult === 'scissors') {
      this.results.computer++;
      this.result = '🐒 🐖 𝘾𝙤𝙢𝙥𝙪𝙩𝙚𝙧 𝙬𝙞𝙣𝙨 🐖 🐒';
    }
    if (this.userResult === 'scissors' && this.computerResult === 'rock') {
      this.results.computer++;
      this.result = '🐒 🐖 𝘾𝙤𝙢𝙥𝙪𝙩𝙚𝙧 𝙬𝙞𝙣𝙨 🐖 🐒';
    }
    if (this.userResult === 'scissors' && this.computerResult === 'paper') {
      this.results.player++;
     this.result = '🏆 😈 𝙔𝙤𝙪 𝙬𝙞𝙣 😈 🏆';
    }
    
  };

  next(){
    if(this.result === "You win")
    console.log('quiz game ')
    this.router.navigate(['/quizgame']);
  }
};