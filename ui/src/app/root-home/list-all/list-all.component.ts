import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { ToasterService } from '../../shared/toaster/toaster.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-all',
  standalone: false,
  templateUrl: './list-all.component.html',
  styleUrl: './list-all.component.scss'
})
export class ListAllComponent implements OnInit {
  apps: any[] = [];
  selectedAppId: string | null = null;
  modalRef: NgbModalRef | null = null;
  apiResponse: any = null;
  appResponse: any = null;
  updatedKey: string = '';

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('flushModal') flushModal!: TemplateRef<any>;
  @ViewChild('rotateAppKeyModal') rotateAppKeyModal!: TemplateRef<any>;
  @ViewChild('rotateAppKeyModalResponse') rotateAppKeyModalResponse!: TemplateRef<any>; // Add this
  @ViewChild('rotateAppPkiModal') rotateAppPkiModal!: TemplateRef<any>;
  @ViewChild('rotateAppPkiModalResponse') rotateAppPkiModalResponse!: TemplateRef<any>;
  @ViewChild('updateAppKeyModal') updateAppKeyModal!: TemplateRef<any>;
  
  constructor(
    private service: AppService, 
    private router: Router,
    private toasterService: ToasterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadApps();
  }

  loadApps() {
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

  goToHome() {
    this.router.navigate(['/root-home']);
  }

  openDeleteModal(appId: string) {
    this.selectedAppId = appId;
    this.modalRef = this.modalService.open(this.deleteModal, { centered: true });
  }

  openFlushModal(appId: string) {
    this.selectedAppId = appId;
    this.modalRef = this.modalService.open(this.flushModal, { centered: true });
  }

  openRotateAppKeyModal(appId: string) {
    this.selectedAppId = appId;
    this.modalRef = this.modalService.open(this.rotateAppKeyModal, { centered: true });
  }
  
  openRotatePkiModal(appId:string){
    this.selectedAppId = appId;
    this.modalRef= this.modalService.open(this.rotateAppPkiModal,{centered:true});
  }
  openUpdateKeyModal(appId:string){
    this.selectedAppId = appId;
    this.updatedKey=""
    this.modalRef= this.modalService.open(this.rotateAppPkiModal,{centered:true});
  }

  confirmDelete() {
    if (this.selectedAppId) {
      this.service.deleteProject(this.selectedAppId).subscribe({
        next: () => {
          this.apps = this.apps.filter(app => app.id !== this.selectedAppId);
          this.toasterService.show("Application deleted successfully.", "bg-success text-light");
          this.modalRef?.close();
        },
        error: () => {
          this.toasterService.show("Failed to delete the application.", "bg-danger text-light");
        }
      });
    }
  }

  confirmFlush() {
    if (this.selectedAppId) {
      this.service.flushProject(this.selectedAppId).subscribe({
        next: () => {
          this.apps = this.apps.filter(app => app.id !== this.selectedAppId);
          this.toasterService.show("Application flushed successfully.", "bg-success text-light");
          this.modalRef?.close();
        },
        error: () => {
          this.toasterService.show("Failed to flush the application.", "bg-danger text-light");
        }
      });
    }
  }

  confirmRotateAppKey() {
    if (this.selectedAppId) {
      this.service.rotateAppKey(this.selectedAppId).subscribe({
        next: (response) => {
          this.apiResponse = response; 
          this.toasterService.show("App key rotated successfully.", "bg-success text-light");
          this.modalRef?.close(); 
          this.openRotateAppKeyModalResponse(); 
        },
        error: () => {
          this.toasterService.show("Failed to rotate the app key.", "bg-danger text-light");
        }
      });
    }
  }

  confirmRotatPki(){
    if(this.selectedAppId){
      this.modalRef?.close();
      this.service.rotateAppPki(this.selectedAppId).subscribe({
        next:(response) => {
         this.appResponse = response;
         
         this.toasterService.show("App key rotated successfully." , "bg-success text-light");
         
         this.openRotateAppPkiModalResponse();
        },
        error: ()=>{
          this.toasterService.show("Failed to rotate the app Pki","bg-danger text-light")
        }
      })
    }
  }
  
  
  openRotateAppPkiModalResponse() {
    this.modalRef = this.modalService.open(this.rotateAppPkiModalResponse, { centered: true });
  }

  openRotateAppKeyModalResponse() {
    this.modalRef = this.modalService.open(this.rotateAppKeyModalResponse, { centered: true });
  }
}

  
