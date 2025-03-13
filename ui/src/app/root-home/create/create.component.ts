import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppCreate, AppService } from '../../app.service';
import { ToasterService } from '../../shared/toaster/toaster.service';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  createForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    
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
  // Handle form submission
  onSubmit() {
    if (this.createForm.invalid) {
      this.toasterService.show('Please fill all required fields.', 'bg-warning text-dark');
      return;
    }
    this.isSubmitting = true;
    let formData : AppCreate ={
          name: this.createForm.get('name')?.value as string,
          description: this.createForm.get('description')?.value as string,
          token_expire: this.createForm.get('token_expire')?.value as number,
          token_notbefore: this.createForm.get('token_notbefore')?.value as  number,
          refresh_expire: this.createForm.get('refresh_expire')?.value as number,
          refresh_notbefore: this.createForm.get('refresh_notbefore')?.value as  number,
          key_type: this.createForm.get('key_type')?.value as string,
          algo: this.createForm.get('algo')?.value as string,
          rotation_period: this.createForm.get('rotation_period')?.value as number,
    }
    this.appService.createApp(formData).subscribe({
      next: (response) => {
        this.toasterService.show('Application created successfully!', 'bg-success text-light');
        this.router.navigateByUrl('/root-home');
      },
      error: (error) => {
        this.toasterService.show('Failed to create application.', 'bg-danger text-light');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}  