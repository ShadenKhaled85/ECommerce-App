import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AlertComponent } from "../../shared/components/businesss/alert/alert.component";
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, AlertComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  isLoading : boolean = false;

  errorMsg : string = '';

  successMsg: string = '';

  registerForm : FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, {validators : this.confirmPassword})

  confirmPassword(group: AbstractControl){
    const password = group.get('password')?.value
    const rePassword = group.get('rePassword')?.value

    if(password === rePassword){
      console.log('Password confirmed');
      return null
    }
    else{
      console.log('Password not matched');
      return {mismatch:true}
    }
  }

  submitForm(){
    if(this.registerForm.valid){
      this.isLoading = true;
      console.log(this.registerForm);
      console.log(this.registerForm.value);
      this.authService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this.errorMsg = '';
          console.log(res);
          this.successMsg = res.message
          // Navigate to Login page
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000);
        },

        error:(err)=>{
          this.isLoading = false;
          // Display error
          console.log(err.error.message);
          this.errorMsg = err.error.message;
        }
      })
    }

    else{
      this.isLoading = false;
    }
  }
}
