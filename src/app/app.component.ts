import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/auth.service';
import { ThemeService } from 'stream-chat-angular';
import { ChannelService } from 'stream-chat-angular';
import { StreamI18nService } from 'stream-chat-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title="messaging"
  constructor(public auth: AuthService, private router: Router,private streamI18nService: StreamI18nService,public themeService:ThemeService,public channel:ChannelService) {
    themeService.theme$.next('dark');
    this.streamI18nService.setTranslation();
  }

  signOut() {
    this.auth.isLoggedIn=false;
    this.router.navigate(['signin']).then(
      ()=>{
        window.location.reload();
      }
    )
  }
  toDark(){
    this.themeService.theme$.next('dark');
  }
  toLight(){
    this.themeService.theme$.next('light');
  }
}

/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'get-stream-io-draft';
  constructor(public auth: AuthService, private router: Router) {}

  /*signOut() {
    this.auth.signOut().subscribe({
      next: () => this.router.navigate(['signin'])
    });
  }
  signOut(){
    this.router.navigate(['signin'])
    .then(()=> {
      window.location.reload();
    })
  }
}*/
