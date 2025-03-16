import { Component, inject, signal, TemplateRef, WritableSignal, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppCreate, AppService } from '../../app.service';
import { ToasterService } from '../../shared/toaster/toaster.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  createForm: FormGroup;
  isSubmitting = false;
  apiResponse: any = null;
  closeResult: WritableSignal<string> = signal('');
  private modalService = inject(NgbModal);

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toasterService: ToasterService
  )
   {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      token_expire: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      token_notbefore: ['', [Validators.required, Validators.min(0), Validators.max(31536000)]],
      refresh_expire: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      refresh_notbefore: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
      key_type: ['', Validators.required],
      algo: ['', Validators.required],
      rotation_period: ['', [Validators.required, Validators.min(60), Validators.max(31536000)]],
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  onSubmit(content: TemplateRef<any>) {
    if (this.createForm.invalid) {
      this.toasterService.show('Please fill all required fields.', 'bg-warning text-dark');
      return;
    }
    this.isSubmitting = true;

    let formData: AppCreate = {
      name: this.createForm.get('name')?.value as string,
      description: this.createForm.get('description')?.value as string,
      token_expire: this.createForm.get('token_expire')?.value as number,
      token_notbefore: this.createForm.get('token_notbefore')?.value as number,
      refresh_expire: this.createForm.get('refresh_expire')?.value as number,
      refresh_notbefore: this.createForm.get('refresh_notbefore')?.value as number,
      key_type: this.createForm.get('key_type')?.value as string,
      algo: this.createForm.get('algo')?.value as string,
      rotation_period: this.createForm.get('rotation_period')?.value as number,
    };

    this.appService.createApp(formData).subscribe({
      next: (response) => {
        this.apiResponse = response;
        this.toasterService.show('Application created successfully!', 'bg-success text-light');
        this.open(content); // Open modal with API response
      },
      error: (error) => {
        this.toasterService.show('Failed to create application.', 'bg-danger text-light');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  goToRootApp() {
    this.router.navigate(['/root-home/']);
  }
}
