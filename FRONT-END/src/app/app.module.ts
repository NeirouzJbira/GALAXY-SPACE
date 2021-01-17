import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';4
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { ValidateService} from './services/validate.service';
import { AuthService} from './services/auth.service';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RpsComponent } from './rps/rps.component';
import { QuizComponent } from './quiz/quiz.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { UploadImageComponent } from './upload-image/upload-image.component';



const appRoutes: Routes =[
  {path:'', component: HomepageComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'uploadImge', component:UploadImageComponent},
  {path:'profile', component: ProfileComponent},
  {path :'rpsgame', component: RpsComponent},
  {path:'quizgame', component:QuizComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Navbar2Component,
    HomepageComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    RpsComponent,
    QuizComponent,
    UploadImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, 
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [ValidateService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }