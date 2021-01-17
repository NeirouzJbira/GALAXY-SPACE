import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  buttonName = "🚀 𝙎𝙩𝙖𝙧𝙩 𝙩𝙝𝙚 𝙌𝙪𝙞𝙯 🚀";
  begin = false;
  complete = false;
  questions: any;
  currentQuestion: any;
  currentIndex: number;
  score: any;
  noAnswer: any;
  constructor(private router: Router ) {
    this.questions = [
      {
        id: 1,
        question: ' 📝 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 1: 𝙒𝙝𝙞𝙘𝙝 𝙞𝙨 𝙩𝙝𝙚 𝙡𝙖𝙧𝙜𝙚𝙨𝙩 𝙘𝙤𝙪𝙣𝙩𝙧𝙮 𝙞𝙣 𝙩𝙝𝙚 𝙬𝙤𝙧𝙡𝙙 𝙗𝙮 𝙥𝙤𝙥𝙪𝙡𝙖𝙩𝙞𝙤𝙣?',
        option: [
          {optionid: 1, name: 'India'},
          {optionid: 2, name: 'USA'},
          {optionid: 3, name: 'China'},
          {optionid: 4, name: 'Russia'}
        ],
        answer: 3,
        selected: 0
      },
      {
        id: 2,
        question: '📝 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 2: 𝙒𝙝𝙚𝙣 𝙙𝙞𝙙 𝙩𝙝𝙚 𝙨𝙚𝙘𝙤𝙣𝙙 𝙬𝙤𝙧𝙡𝙙 𝙬𝙖𝙧 𝙚𝙣𝙙?',
        option: [
          {optionid: 1, name: '1945'},
          {optionid: 2, name: '1939'},
          {optionid: 3, name: '1944'},
          {optionid: 4, name: '1942'}
        ],
        answer: 1,
        selected: 0
      },
      {
        id: 3,
        question: '📝 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 3: 𝙒𝙝𝙞𝙘𝙝 𝙬𝙖𝙨 𝙩𝙝𝙚 𝙛𝙞𝙧𝙨𝙩 𝙘𝙤𝙪𝙣𝙩𝙧𝙮 𝙩𝙤 𝙞𝙨𝙨𝙪𝙚 𝙥𝙖𝙥𝙚𝙧 𝙘𝙪𝙧𝙧𝙚𝙣𝙘𝙮?',
        option: [
          {optionid: 1, name: 'USA'},
          {optionid: 2, name: 'France'},
          {optionid: 3, name: 'Italy'},
          {optionid: 4, name: 'China'}
        ],
        answer: 4,
        selected: 0
      },
      {
        id: 4,
        question: '📝 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 4: 𝙒𝙝𝙞𝙘𝙝 𝙘𝙞𝙩𝙮 𝙝𝙤𝙨𝙩𝙚𝙙 𝙩𝙝𝙚 1996 𝙎𝙪𝙢𝙢𝙚𝙧 𝙊𝙡𝙮𝙢𝙥𝙞𝙘𝙨?',
        option: [
          {optionid: 1, name: 'Atlanta'},
          {optionid: 2, name: 'Sydney'},
          {optionid: 3, name: 'Athens'},
          {optionid: 4, name: 'Beijing'}
        ],
        answer: 1,
        selected: 0
      },
      {
        id: 5,
        question: '📝 𝙌𝙪𝙚𝙨𝙩𝙞𝙤𝙣 5: 𝙒𝙝𝙤 𝙞𝙣𝙫𝙚𝙣𝙩𝙚𝙙 𝙩𝙚𝙡𝙚𝙥𝙝𝙤𝙣𝙚?',
        option: [
          {optionid: 1, name: 'Albert Einstein'},
          {optionid: 2, name: 'Alexander Graham Bell'},
          {optionid: 3, name: 'Isaac Newton'},
          {optionid: 4, name: 'Marie Curie'}
        ],
        answer: 2,
        selected: 0
      }
    ]
    this.currentIndex = 0;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  ngOnInit(): void {
  }
  next(){
    this.currentIndex++;
    this.currentQuestion = this.questions[this.currentIndex];
  }

  submit(){
    this.buttonName = "Play Again?";
    if (this.currentIndex + 1 == this.questions.length){
      this.complete = true;
      this.begin = false;
      this.score = 0;
      this.noAnswer = 0;
      this.questions.map(x => {
        if (x.selected != 0){
          if (x.selected == x.answer) {
            this.score++;
          }
        }
        else {
          this.noAnswer++;
        }
        
        x.selected = 0;
      });
    } 
  }
  // this.router.navigate(['/rpsgame']);
  
  start(){
    this.complete = false;
    this.currentIndex = 0;
    this.currentQuestion = this.questions[this.currentIndex];
    this.begin = true;
  }

}
