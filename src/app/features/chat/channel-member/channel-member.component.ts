/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-channel-member',
  templateUrl: './channel-member.component.html',
  styleUrls: ['./channel-member.component.scss']
})
export class ChannelMemberComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-channel-members',
  templateUrl: './channel-member.component.html',
  styleUrls: ['./channel-member.component.scss']
})
export class ChannelMemberComponent implements OnInit {
  members:any=this.auth.members;
  channelName:string=this.auth.currentChannel;

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

}

