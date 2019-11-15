import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from './services/loading.service';
import { ShareService } from './services/share.service';
import { HighlightPipe } from './pipes/highlight.pipe';
import { EnterToBrPipe } from './pipes/enterToBr.pipe';
import { EnterFormatPipe } from './pipes/dateFormat.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports : [
    HighlightPipe,
    EnterToBrPipe,
    EnterFormatPipe
  ],
  declarations: [HighlightPipe, EnterToBrPipe, EnterFormatPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers : [ LoadingService, ShareService ]
    };
  }
}
