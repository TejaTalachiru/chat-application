import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-new-channel',
  templateUrl: './new-channel.component.html',
  styleUrls: ['./new-channel.component.scss']
})
export class NewChannelComponent {

  @Output()
  saved = new EventEmitter<string>();

  channelName = new UntypedFormControl();

  onCreate() {
    this.saved.emit(this.channelName.value);
    this.channelName.reset('');
  }

}
