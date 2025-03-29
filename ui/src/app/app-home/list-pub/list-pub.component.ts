import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService ,AppPubKeyData} from '../../app.service';


@Component({
  selector: 'app-list-pub',
  standalone: false,
  templateUrl: './list-pub.component.html',
  styleUrl: './list-pub.component.scss'
})
export class ListPubComponent implements OnInit {
  appdata: AppPubKeyData[] = [];
  appId: string = "";

  constructor(private appservice: AppService , private router:Router) {}

  ngOnInit(): void {
    this.appId = sessionStorage.getItem('appId') || '';
    this.getAppPubData();
  }

  getAppPubData() {
    this.appservice.getAppPubKey(this.appId).subscribe({
      next: (resp) => {
        this.appdata = resp.keys;
        console.log('App pub Key data:', this.appdata);
      },
      error: (err) => {
        console.log('Error fetching pub key data');
      }
    });
  }
  goToAppHome(){
    this.router.navigate(['/app-home/'])
  }
}
