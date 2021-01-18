import {  Component, Input,OnInit,  ElementRef,  ViewChild} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @ViewChild("fileInput") fileInput: ElementRef;
  loading: boolean = false;
  valid: boolean = false;
  message: string = "";
  Image: File;
  constructor(
    private authService: AuthService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
  }
  onUploadImage() {
    

    /*this.authService.getimage.apply(data => {
        if(data.success) {
          console.log('image have been upload');     
          this.router.navigate(['profile']);
         }else {
         this.router.navigate(['uploadImge']);
           console.log('please dowlond picture');
         }
     });*/
  
  }
  onFileChange(event) { //Method to set the value of the file to the selected file by the user
    this.Image = event.target.files[0]; //To get the image selected by the user
    this.valid = true;
 }

  onSubmit(event) { //Method to send the request to the server
    var image = new FormData(); //FormData creation
    image.append('Imagefile', this.Image); //Adding the image to the form data to be sent
    this.authService //Sending the rquest from the service function
      .getimage(image)
      .subscribe((res: any) => {
        console.log(res);
     });

   this.loading = true;
   setTimeout(() => {
     this.loading = false;
   }, 1000);

   this.message = "Uploaded"; //Message to be viewed in App page
 }

  clearFile() { // Method to clear the selected file
    this.valid = false;
    this.message = "Cleared";
   this.fileInput.nativeElement.value = "";
 }
}
