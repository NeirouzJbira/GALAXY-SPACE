import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public play(action: string): void { //so here when you click any of the buttons it will work in the console
    console.log(action);
  }
}
