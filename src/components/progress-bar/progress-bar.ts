import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.html'
})
export class ProgressBarComponent implements OnInit, OnDestroy {

    public message: string = "";
    public progress: number = 0;
    protected _total: number = 0;
    protected _actual: number = 0;

    constructor(
        public params: NavParams,
        public events: Events,
        private ref:ChangeDetectorRef
    ) {
        this.progress = 0;
        this.message = params.get('message');
        this._total   = params.get('total');
        this._actual  = params.get('actual');

        this._milestone(
            {
                message: this.message,
                only_message: true
            }
        );
    }

    ngOnInit(){
        this.events.subscribe('milestone:add', (params) => this._milestone(params));
    }

    ngOnDestroy(){
        this.events.unsubscribe('milestone:add');
    }

    public _milestone(params: any){
        setTimeout( () => {
            this.message = params.message;
            if(!params.only_message){
                this._actual++;
                this.progress = (100 * this._actual) / this._total;
            }
            this.ref.detectChanges();
        });
    }

}
