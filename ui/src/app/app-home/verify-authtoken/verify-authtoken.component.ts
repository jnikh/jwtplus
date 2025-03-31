import { Component , OnInit} from '@angular/core';
import { FormBuilder , FormGroup ,Validator, Validators } from '@angular/forms';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-verify-authtoken',
  standalone: false,
  templateUrl: './verify-authtoken.component.html',
  styleUrl: './verify-authtoken.component.scss'
})
export class VerifyAuthtokenComponent implements OnInit {
  appId: string = ''; 
 responseData:any  = null;
 authForm! : FormGroup
  constructor(private fb: FormBuilder , private appService:AppService){}
  
  ngOnInit(): void {
    this.appId = sessionStorage.getItem('appId') || ''
    this.authForm = this.fb.group({
      token:['', Validators.required]
    })
  }
  verifyAuthToken():void{
      if(this.authForm.valid){
        this.appService.verifyAuthToken(this.appId, this.authForm.value).subscribe({
          next:(resp)=>{
            this.responseData = resp
            console.log(resp)
          },
          error:(err)=>{
            console.log('error ',err)
          }
          
        })
      }
  }
}
