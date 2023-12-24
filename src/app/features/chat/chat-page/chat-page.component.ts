import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { catchError, Observable, of, switchMap, map, from } from 'rxjs';
import { Channel } from 'stream-chat';
import { ChannelActionsContext, ChannelPreviewContext, ChannelService, ChatClientService, CustomTemplatesService, DefaultStreamChatGenerics, StreamI18nService } from 'stream-chat-angular';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';
//import { EmojiPickerComponent } from 'src/app/emoji-picker/emoji-picker.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerContext,} from "stream-chat-angular";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit, AfterViewInit {

  chatIsReady$!: Observable<boolean>;
  isMenuOpen:boolean=true;
  userId=this.auth.userId;
  token=this.auth.userToken;
  ok$!:true;
  show:boolean=false;
  apiKey='9gxttawqfusd';
  //apiKey='5np4g7j78anc'
  isLoggedIn=this.auth.isLoggedIn;
  activeChannel=this.channelService.activeChannel$;

  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('channelPreview')
  private channelPreview!: TemplateRef<ChannelPreviewContext>;
  @ViewChild("emojiPickerTemplate")
  private emojiPickerTemplate!: TemplateRef<EmojiPickerContext>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService,
    private customTemplatesService: CustomTemplatesService,
    private translateService: TranslateService){
      this.translateService.getTranslation('en').subscribe(() => {
        this.streamI18nService.setTranslation('en');
      })
      
   }

  ngOnInit(): void {
    console.log("In chat");
    this.chatService.init(this.apiKey,this.userId,this.token);
    this.streamI18nService.setTranslation();
    this.channelService.init({
     type:'messaging',
      members:{$in:[this.userId]}
    })
  }
  ngAfterViewInit(): void {
      this.customTemplatesService.channelPreviewTemplate$.next(
        this.channelPreview
      )
      this.customTemplatesService.channelActionsTemplate$.next(
        this.channelActionsTemplate
      )
      this.customTemplatesService.emojiPickerTemplate$.next(
        this.emojiPickerTemplate
      );
  }
  showUsers(){
    this.show=!this.show;
    this.auth.showUsers();
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
      name,
      //members: [this.auth.getCurrentUser().uid]
      members:[this.auth.userId]
    });
    from(channel.create());
    /*await channel.create()
    this.channelService.init({
      type:'messaging',
      id:{$eq:this.userId}
    })*/
  }

  activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.channelService.setAsActiveChannel(channel);
  }

}
function ngOnInit(): ((error: any) => void) | null | undefined {
  throw new Error('Function not implemented.');
}


/*import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { catchError, Observable, of, switchMap, map, from } from 'rxjs';
import { Channel } from 'stream-chat';
import { ChannelActionsContext, ChannelPreviewContext, ChannelService, ChatClientService, CustomTemplatesService, DefaultStreamChatGenerics, StreamI18nService , NotificationContext, } from 'stream-chat-angular';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatPageComponent implements OnInit, AfterViewInit {

  //chatIsReady$!: Observable<boolean>;

  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;
  @ViewChild('channelPreview')
  private channelPreview!: TemplateRef<ChannelPreviewContext>;
  @ViewChild('notificationTemplate')
  private notificationTemplate!: TemplateRef<NotificationContext>;

  constructor(
    private chatService: ChatClientService,
    private channelService: ChannelService,
    private streamI18nService: StreamI18nService,
    private auth: AuthService,
    private customTemplatesService: CustomTemplatesService
  ) {
    //this.channelService.activeChannelPinnedMessages$.subscribe(console.log);
   }

  userId = this.auth.userId;
  token = this.auth.userToken
  ok$! : true;
  //apiKey = 'bc3aqts2zrgy';
  apiKey = 's2nshkmbf3jb';
  ngOnInit(): void {
    console.log("in chAT")
    this.chatService.init(this.apiKey, this.userId, this.token);
    this.streamI18nService.setTranslation();
    this.channelService.init({
      type: 'messaging',
      members : { $in: [this.userId] },

    });

  }
  ngAfterViewInit(): void {
      this.customTemplatesService.channelPreviewTemplate$.next(
        this.channelPreview
      )
      this.customTemplatesService.channelActionsTemplate$.next(
        this.channelActionsTemplate
      )
      this.customTemplatesService.notificationTemplate$.next(
        this.notificationTemplate
      );
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLowerCase();
    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
      name,
      //members: [this.auth.getCurrentUser().uid]
      members: [this.userId] 
    });
    from(channel.create());
  }

  activateChannel(channel: Channel<DefaultStreamChatGenerics>) {
    this.channelService.setAsActiveChannel(channel);
  }


}*/
