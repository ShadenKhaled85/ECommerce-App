import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertComponent } from '../../shared/components/businesss/alert/alert.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, AlertComponent, RouterLink, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  isLoading : boolean = false;

  errorMsg : string = '';

  successMsg: string = '';

  loginForm : FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,}$/)]),
  })

  submitForm(){
    if(this.loginForm.valid){
      this.isLoading = true;
      // console.log(this.loginForm);
      // console.log(this.loginForm.value);
      this.authService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          this.errorMsg = '';
          console.log(res);
          this.successMsg = res.message

          // 1) Save token to localStorage
          localStorage.setItem('myToken', res.token)

          // 2) Decode token
            this.authService.getUserData()

          // 3) Navigate to Home page
          setTimeout(() => {
            this.router.navigate(['/home'])
          }, 1000);
        },

        error:(err)=>{
          this.isLoading = false;
          // Display error
          console.log(err.message);
          this.errorMsg = err.error.message;
        }
      })
    }

    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
