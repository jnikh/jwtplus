import { Component, OnInit } from '@angular/core';
import { AppService , Appdata} from '../../app.service';
@Component({
  selector: 'app-list-app',
  standalone: false,
  templateUrl: './list-app.component.html',
  styleUrl: './list-app.component.scss'
})
export class ListAppComponent implements OnInit{
   appdata!: Appdata;
   appId : string ="";
   app:any = {}

   constructor(private appService: AppService){}
   ngOnInit(): void {
     this.appId = sessionStorage.getItem('appId') || '';
     if(this.appId){
      this.getAppData();
     }

   }
   getAppData(){
    this.appService.getAppData(this.appId).subscribe({
      next: (res) => {
        this.appdata = res.app;
        console.log('App Data:', this.appdata);
      },
      error: (err) => {
        console.error('Error fetching app data:', err);
      }
    });
   }
}
