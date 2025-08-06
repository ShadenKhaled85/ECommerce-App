import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPassService } from '../../../../core/services/forgotPass/forgot-pass.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  private readonly forgotPassService = inject(ForgotPassService)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  step : number = 1;

  forgotPassForm : FormGroup = new FormGroup({
    email : new FormControl(null, [Validators.required])
  })

  verifyCodeForm = new FormGroup({
    resetCode : new FormControl(null, [Validators.required])
  })

  resetPasswordForm = new FormGroup({
    email : new FormControl(null, [Validators.required]),
    newPassword : new FormControl(null, [Validators.required])
  })

  forgotPass(){
    let emailValue = this.forgotPassForm.get('email')?.value
    this.resetPasswordForm.get('email')?.patchValue(emailValue)
    this.forgotPassService.forgotPassword(this.forgotPassForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.statusMsg == 'success'){
          this.step = 2;
        }
      }
    })
  }

  verifyCode(){
    this.forgotPassService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status == 'Success'){
          this.step = 3;
        }
      }
    })
  }

  resetPass(){
    this.forgotPassService.resetPassword(this.resetPasswordForm.value).subscribe({
      next:(res)=>{
        console.log(res);

        // 1) Save token
        localStorage.setItem('myToken',res.token)
        // 2) Decode token
        this.authService.getUserData()
        // 3) Navigate to home
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1000);
        }
    })
  }


}
