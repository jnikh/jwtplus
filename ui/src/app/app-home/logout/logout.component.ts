import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'; 
import { AppService } from '../../app.service';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent implements OnInit {
   authForm!: FormGroup;
   responseData: any = [];
   appId: string = ''; 
   constructor(private fb:FormBuilder, private appservice:AppService){}
   ngOnInit(): void {
     this.appId = sessionStorage.getItem('appId') || '';
     this.authForm  = this.fb.group({
      token:['',Validators.required],
     
     })
   }
   logooutToken():void{
    if(this.authForm.valid){
      this.appservice.logoutTokens(this.appId,this.authForm.value).subscribe({
        next:(resp) =>{
          this.responseData = resp
          console.log(resp)
        },
        error:(error)=>{
          console.log(error)
        }
      })
    }
   }
}
