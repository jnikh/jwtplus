import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-retrive-activesessio',
  standalone: false,
  templateUrl: './retrive-activesessio.component.html',
  styleUrls: ['./retrive-activesessio.component.scss']  // ✅ Fixed Typo
})
export class RetriveActivesessioComponent implements OnInit {
  authForm!: FormGroup;
  responseData: any = [];
  appId: string = ''; 

  constructor(private fb: FormBuilder, private appservice: AppService) {}

  ngOnInit(): void {
    this.appId = sessionStorage.getItem('appId') || '';
    this.authForm = this.fb.group({
      sub: ['', Validators.required]  // ✅ Empty default value instead of "sub"
    });
  }

  retriveActiveToken(): void {
    if (this.authForm.valid) {
      this.appservice.retriveActiveSession(this.appId, this.authForm.value).subscribe({
        next: (resp) => {
          this.responseData = resp?.sessions || []; // ✅ Handle array response
          console.log('Response:', this.responseData);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
    } else {
      console.warn('Form is invalid:', this.authForm.errors);
    }
  }
}
