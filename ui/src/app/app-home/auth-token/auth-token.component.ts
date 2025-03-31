import { Component ,OnInit } from '@angular/core';
import { FormBuilder , FormGroup ,Validator, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-auth-token',
  standalone: false,
  templateUrl: './auth-token.component.html',
  styleUrl: './auth-token.component.scss'
})
export class AuthTokenComponent implements OnInit{
  authForm!: FormGroup;
  responseData: any = null;
  appId: string = ''; 
  constructor(private fb: FormBuilder , private appService:AppService){}
   ngOnInit(): void {
     this.appId = sessionStorage.getItem('appId') || ''
     this.authForm = this.fb.group({
      sub: ['', Validators.required],
      aud: ['', Validators.required],
      ip: ['', Validators.required],
      userAgent: ['', Validators.required] // ✅ Corrected form control name
    });
   
   }

   generateTokens():void{
    if(this.authForm.valid){
      this.appService.generateAuthTokens(this.appId, this.authForm.value).subscribe({
        next:(resp)=>{
          this.responseData = resp;
          console.log('Generated Tokens:', resp);
        },
        error:(err) =>{
          console.log(err)
        }
      })

      
    }
   }
}
