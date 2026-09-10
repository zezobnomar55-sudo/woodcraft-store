import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../core/services/message-service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class Contact {
  contactForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _messageService: MessageService
  ) {
    this.contactForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      isTestimonial: [false]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this._messageService.sendMessage(this.contactForm.value).subscribe({
        next: () => {
          this.submitted = true;
          this.contactForm.reset();
        },
        error: (err) => console.log(err)
      });
    }
  }
}
