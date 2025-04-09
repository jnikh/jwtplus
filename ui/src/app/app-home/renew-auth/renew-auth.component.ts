import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder , FormGroup ,Validator, Validators } from '@angular/forms';
import { AppService } from '../../app.service';


@Component({
  selector: 'app-renew-auth',
  standalone: false,
  templateUrl: './renew-auth.component.html',
  styleUrl: './renew-auth.component.scss'
})
export class RenewAuthComponent implements OnInit {
  authForm!: FormGroup;
  responseData: any = null;
  appId: string = ''; 
  constructor(private fb:FormBuilder, private appservice:AppService , private route:Router){}
  ngOnInit(): void {
    this.appId = sessionStorage.getItem('appId') || ''
    this.authForm = this.fb.group({
      refresh_token:['',Validators.required],
      ip:['',Validators.required],
      useragent:['',Validators.required]
    })
  }
  renewAuthToke():void{
     if(this.authForm.valid){
      this.appservice.renewAuthToken(this.appId,this.authForm.value).subscribe({
        next:(resp)=>{
          this.responseData = resp;
          console.log(resp)
        },
        error:(err)=>{
          console.log(err)
        }
      })
     }
  }
  gotohomePage(){
    this.route.navigate(['/app-home/'])
  }
}
