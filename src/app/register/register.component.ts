
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public user = new User();//ici on va enregistrer tous les champs de user 
confirmPassword?:string;
myForm!: FormGroup;
loading :boolean =false;
err :any;
constructor(private formBuilder: FormBuilder , private authService : AuthService , private router :Router,private toastr: ToastrService ) { }//injection de dependance 
ngOnInit(): void {
  this.myForm = this.formBuilder.group({ //ca cest la varible qui va appeler le form builder qui va construire un form group
  username : ['', [Validators.required]],
  email : ['', [Validators.required, Validators.email]],
  password : ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword : ['', [Validators.required]]
  } );
  }
  onRegister()
{
console.log(this.user);
this.loading=true;
this.authService.registerUser(this.user).subscribe({
  next:(res)=>{
    this. authService.setRegistredUser(this.user);
    //alert("veillez confirmer votre email");
    this.loading=false;
    //this.toastr.success('veillez confirmer votre email', 'Confirmation');
    Swal.fire({
      position: "center",
      icon: "success",
      title: "veillez confirmer votre email",
      showConfirmButton: false,
      timer: 2000
    });
     this.router.navigate(["/verifEmail"]);
    },
    error:(err:any)=>{
    if(err.error.errorcode="USER_EMAIL_ALREADY_EXISTS"
    ){
    this.err= "Email Already Used";
    }
    }
    }
    )  
}

}
