import { Injectable } from '@angular/core';
import { ModalController, Modal, Events } from 'ionic-angular';
import { SimpleProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SimpleProgressBarProvider {

    protected _profile_modal: Modal;

    constructor(
        public modalCtrl: ModalController,
        public eventCtrl: Events,
    ) {}

    public present(message: string, milestones: number) : Observable<void>{
        return Observable.create((observer) => {
            this._profile_modal = this.modalCtrl.create(SimpleProgressBarComponent, { message: message, total: milestones, actual: 0 });
            this._profile_modal.present().then(
                () => {                
                    observer.next();
                    observer.complete();
                }            
            ).catch(
                (err) => observer.error(err)
            );
        });
    }

    public setMilestone(message: string){
        this.eventCtrl.publish('milestone:add', {message: message}, Date.now());
    }

    public dismiss(){
        if (this._profile_modal){
            this._profile_modal.dismiss();
        }
    }
}
