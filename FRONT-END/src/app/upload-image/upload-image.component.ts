import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onUploadImage() {
    

    // this.authService.  //subscribe(data => {
    //     if(data.success) {
    //       console.log('image have been upload');     
    //       this.router.navigate(['profile']);
    //     }else {
    //       this.router.navigate(['uploadImge']);
    //       console.log('please dowlond picture');
    //     }
    // });
  
  }
}
