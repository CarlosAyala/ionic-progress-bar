import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SimpleProgressBarProvider } from './providers/progress-bar/progress-bar';
import {SimpleProgressBarComponent} from './components/progress-bar/progress-bar';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [SimpleProgressBarComponent],
    exports: [SimpleProgressBarComponent],
    entryComponents: [
        SimpleProgressBarComponent
    ],
    providers: [
        SimpleProgressBarProvider
    ]
})
export class IonicSimpleProgressBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicSimpleProgressBarModule,
            providers: [SimpleProgressBarProvider]
        };
    }
}
