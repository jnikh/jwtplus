import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { ToasterService } from '../../shared/toaster/toaster.service';

@Component({
  selector: 'app-list-all',
  standalone: false,
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.scss'
})
export class ListAllComponent implements OnInit {
  apps: any[] = []; 

  constructor(
    private service: AppService, 
    private router: Router,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.service.getAllProjects().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.apps = response.apps || []; 
      },
      error: () => {
        this.toasterService.show("Provided key or app id is invalid.", "bg-danger text-light");
      }
    });
  }

  goToCreatApp() {
    this.router.navigate(['/root-home/create']);
  }
}
