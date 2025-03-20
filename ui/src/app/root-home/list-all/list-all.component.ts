import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUpdate, AppService, AppDetails } from '../../app.service';
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
  createForm: FormGroup;
  updateForm: FormGroup;

  @ViewChild('deleteModal') deleteModal!: TemplateRef<any>;
  @ViewChild('flushModal') flushModal!: TemplateRef<any>;
  @ViewChild('rotateAppKeyModal') rotateAppKeyModal!: TemplateRef<any>;
  @ViewChild('rotateAppKeyModalResponse') rotateAppKeyModalResponse!: TemplateRef<any>;
  @ViewChild('rotateAppPkiModal') rotateAppPkiModal!: TemplateRef<any>;
  @ViewChild('rotateAppPkiModalResponse') rotateAppPkiModalResponse!: TemplateRef<any>;
  @ViewChild('updateAppKeyModal') updateAppKeyModal!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private service: AppService, 
    private router: Router,
    private toasterService: ToasterService,
    private modalService: NgbModal
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      token_expire: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      token_notbefore: ['', [Validators.required, Validators.min(0), Validators.max(31536000)]],
      refresh_expire: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      refresh_notbefore: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      rotation_period: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
    });

    this.updateForm = this.fb.group({
      name: [''],
      description: [''],
      token_expire: [0],
      token_notbefore: [0],
      refresh_expire: [0],
      refresh_notbefore: [0],
      rotation_period: [0]
    });
  }

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
  
  openRotatePkiModal(appId: string) {
    this.selectedAppId = appId;
    this.modalRef = this.modalService.open(this.rotateAppPkiModal, { centered: true });
  }

  openUpdateKeyModal(app: AppDetails) {
    this.selectedAppId = app.id;
    this.updateForm.patchValue({
      name: app.name,
      description: app.description,
      token_expire: app.token_expiry,
      token_notbefore: app.token_notbefore,
      refresh_expire: app.refresh_expiry,
      refresh_notbefore: app.refresh_notbefore,
      rotation_period: app.rotation_period
    });

    this.modalRef = this.modalService.open(this.updateAppKeyModal, { centered: true });
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

  confirmRotatPki() {
    if (this.selectedAppId) {
      this.modalRef?.close();
      this.service.rotateAppPki(this.selectedAppId).subscribe({
        next: (response) => {
          this.appResponse = response;
          this.toasterService.show("App key rotated successfully.", "bg-success text-light");
          this.openRotateAppPkiModalResponse();
        },
        error: () => {
          this.toasterService.show("Failed to rotate the app Pki", "bg-danger text-light");
        }
      });
    }
  }

  confirmUpdate() {
    if (this.selectedAppId) {
      const formData: AppUpdate = {
        name: this.updateForm.get('name')?.value as string,
        description: this.updateForm.get('description')?.value as string,
        token_expire: this.updateForm.get('token_expire')?.value as number,
        token_notbefore: this.updateForm.get('token_notbefore')?.value as number,
        refresh_expire: this.updateForm.get('refresh_expire')?.value as number,
        refresh_notbefore: this.updateForm.get('refresh_notbefore')?.value as number,
        rotation_period: this.updateForm.get('rotation_period')?.value as number,
      };

      this.service.updateApp(this.selectedAppId, formData).subscribe({
        next: (response) => {
          this.appResponse = response;
          this.toasterService.show('Application updated successfully!', 'bg-success text-light');
          this.loadApps(); // Refresh the app list
          this.modalRef?.close();
        },
        error: () => {
          this.toasterService.show("Failed to update the app data", "bg-danger text-light");
        }
      });
    }
  }
   
  openRotateAppPkiModalResponse() {
    if (this.selectedAppId) {
      this.modalRef = this.modalService.open(this.rotateAppPkiModalResponse, { centered: true });
    } else {
      this.toasterService.show("Error: No App ID selected.", "bg-danger text-light");
    }
  }

  openRotateAppKeyModalResponse() {
    this.modalRef = this.modalService.open(this.rotateAppKeyModalResponse, { centered: true });
  }
}