import { NgModule, ModuleWithProviders } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ProgressBarProvider } from './providers/progress-bar/progress-bar';

@NgModule({
    imports: [
        IonicModule
    ],
    declarations: [
    
    ],
    exports: [
    ],
    providers: [
        ProgressBarProvider
    ]
})
export class IonicProgressBarModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IonicAcademyModule,
            providers: [ProgressBarProvider]
        };
    }
}
