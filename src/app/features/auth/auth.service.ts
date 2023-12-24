import { Injectable } from '@angular/core';
import { ChannelService } from 'stream-chat-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;
  activeChannel=this.channelService.activeChannel$;
  result:any;
  userId="";
  userToken="";
  members:any=[];
  currentChannel:string='';
  lastId=2;
  users:{id:number,email:string,password:string;userId:string;token:string}[]=[
    {"id":0,"email":"tldb@gmail.com","password":"bhavani123","userId":"Bhavani","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQmhhdmFuaSJ9.gUtRaN4Nw4r_Hm-hiS1I6ZUivTAD_q3erger44WcQUI"},
    {"id":1,"email":"susmi@gmail.com","password":"susmi123","userId":"susmitha","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3VzbWl0aGEifQ.fWrD9pEHwPCJCbuFXtfstss42UOOCplWGJlo15cSH5c"},
    {"id":2,"email":"teja@gmail.com","password":"teja123","userId":"teja","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVqYSJ9.Hbp7puOFSr-kIsEXA8wdaLpuk7x1J39WivVthpUHhxU"},
    {"id":3,"email":"bot@gmail.com","password":"bot123","userId":"bot","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYm90In0.Lf-Y5isJUts6TpxSdJ6nxUegUEKlf_QFhZs519XQo4w"},
  ]
 

  constructor(private channelService:ChannelService) { }
  showUsers(){
    this.activeChannel.subscribe(val=>{
      this.result=val
    })
    this.currentChannel=this.result?.data.id;
    let keys=Object.keys(this.result?.state?.members)
    console.log(keys)
    this.members=[]
    keys.map((k:any)=>{
      this.members.push(k)
    })
    console.log(this.members)
  }
}

/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { updateProfile } from '@firebase/auth';
import { BehaviorSubject, forkJoin, from, pluck, switchMap } from 'rxjs';
import { SigninCredentials, SignupCredentials } from './auth.model';
import { environment } from '../../../environments/environment';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private authState = new BehaviorSubject<Object | null>(null);
  
  //readonly isLoggedIn$ = authState(this.auth);
  isLoggedIn = false;
  members: any;
  currentChannel: string;

  constructor(private auth: Auth, private http: HttpClient) { }

 
 userId = "";
 userToken="";

  /*getStreamToken() {
    return this.http.post<{ token: string }>(`${environment.apiUrl}/createStreamToken`, {
      user: this.getCurrentUser()
    }).pipe(pluck('token'))
  }*/

  /*getCurrentUser() {
    return this.auth.currentUser!;
  }*/

  /*signIn({ email, password }: SigninCredentials) {
    //console.log(signInWithEmailAndPassword(this.auth, email, password),"hloooo")
    //return from(signInWithEmailAndPassword(this.auth, email, password));


  }

  signUp({ email, password, displayName }: SignupCredentials) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user }) => forkJoin([
        updateProfile(user, { displayName }),
        this.http.post(
          `${environment.apiUrl}/createStreamUser`, 
          { user: {...user, displayName } })
      ])),
    );
  }

  /*signOut() {
    const user = this.auth.currentUser;
    return from(this.auth.signOut()).pipe(
      switchMap(() => this.http.post(
        `${environment.apiUrl}/revokeStreamUserToken`,
        { user }
      ))
    );
  }
}*/
