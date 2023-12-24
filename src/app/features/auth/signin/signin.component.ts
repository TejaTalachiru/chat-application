import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { range } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit {
  
  form!: UntypedFormGroup;
  
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  users: {id:number,email:string,password:string,userId:string,token:string} [] = [

    {"id":0, "email":"chat@gmail.com" , "password" : "chat123" , "userId": "chat-teja" ,  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2hhdC10ZWphIn0.-Q5sX10w4NcB3Ag5Gp9AXzOG9iiY1H8OV4DhCDZbKGk"},
    {"id":0, "email":"yupp@gmail.com" , "password" : "yupp123" , "userId": "angular-project-yupp" ,  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYW5ndWxhci1wcm9qZWN0LXl1cHAifQ.GzPZkqUQe2hKOpYztVCvaJ3C87N69mS24GOLHbJjbyU"},
    {"id":3, "email":"bot@gmail.com" , "password" : "bot123" , "userId": "bot" ,  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYm90In0.Lf-Y5isJUts6TpxSdJ6nxUegUEKlf_QFhZs519XQo4w"},
    {"id":0,"email":"tldb@gmail.com","password":"bhavani123","userId":"Bhavani","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmhhdmFuaSJ9.gUtRaN4Nw4r_Hm-hiS1I6ZUivTAD_q3erger44WcQUI"},
    {"id":1,"email":"susmi@gmail.com","password":"susmi123","userId":"susmitha","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3VzbWl0aGEifQ.fWrD9pEHwPCJCbuFXtfstss42UOOCplWGJlo15cSH5c"},
    //{"id":2,"email":"teja@gmail.com","password":"teja123","userId":"teja","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVqYSJ9.qrE_GcKIRZo43NakSIoOcKUUMARYYgu3LXdE09o0veQ"},
    {"id":2,"email":"teja@gmail.com","password":"teja123","userId":"teja","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVqYSJ9.Hbp7puOFSr-kIsEXA8wdaLpuk7x1J39WivVthpUHhxU"}
    ,
   ]

  userId = "";
  userToken="";

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.email]),
      password: new UntypedFormControl('', [Validators.minLength(6)]),
    })
  }

  signIn() {
    for(var i = 0 ; i<this.users.length;i++)
    {
      if(this.users[i].email==this.form.value.email && this.users[i].password==this.form.value.password){
        console.log(i)
        this.auth.userId=this.users[i].userId
        this.auth.userToken=this.users[i].token
        this.auth.isLoggedIn=true
        this.router.navigate(['chat'])
        //console.log("endif")
      }
    }
    if(!this.auth.isLoggedIn)
    {
      alert("Enter Valid Details ")
    }

    
2
3
// To check your permissions version (server side only)
    
  
      
    /*this.auth.signIn(this.form.value).subscribe({
      next: () => this.router.navigate(['chat']),
      error: (error) => this.snackbar.open(error.message)
    });*/
  }

}
