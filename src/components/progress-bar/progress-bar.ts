import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavParams, Events } from 'ionic-angular';

const HTML_TEMPLATE = `
<ion-content class="main-view">
    <div class="overlay" (click)="dismiss()"></div>
    <ion-scroll class="modal_content" scrollY="false">

        <div class="message" text-nowrap>
            <ion-spinner></ion-spinner><span [innerHTML]="message"></span></div>
        <div class="progress-outer">
            <div class="progress-inner" [ngStyle]="{'opacity': progress > 0 ? 1 : 0}"  [style.width]="progress.toString() + '%'">
                {{progress | number: '1.0-0'}}%
            </div>
        </div>
    </ion-scroll>
</ion-content>
`;

const CSS_STYLE = `

    .main-view{
      background: transparent;
    }
    .overlay {
      position: fixed;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: .5;
      background-color: #333;
    }
    .modal_content {
      position: absolute;
      padding-top: 10px;
      top: calc(50% - (20%/2));
      left: 0;
      right: 0;
      width: 90%;
      height: 80px;
      padding: 10px;
      z-index: 100;
      margin: 0 auto;
      color: #333;
      background: #e8e8e8;
      background: -moz-linear-gradient(top, #fff 0%, #e8e8e8 100%);
      background: -webkit-linear-gradient(top, #fff 0%, #e8e8e8 100%);
      background: linear-gradient(to bottom, #fff 0%, #e8e8e8 100%);
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(51, 51, 51, .35);
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      overflow: hidden;
    }

    .message{
        width: 100%;
        padding: 10px 16px 0px 16px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .message > ion-spinner{
        height: 20px;
        width: 20px;
        margin-right: 16px;
        vertical-align: middle;
        *{
            stroke: color($colors, primary);
        }
    }

    .theroot {
        height: 100px;
        background-color: yellow;
    }


    .progress-outer {
        margin: 10px 15px;
        padding: 3px;
        text-align: center;
        background-color: #f4f4f4;
        border: 1px solid #dcdcdc;
        color: #fff;
        border-radius: 20px;
    }

    .progress-inner {
        min-width: 0%;
        white-space: nowrap;
        overflow: hidden;
        padding: 2px;
        border-radius: 10px;
        background-color: #4286f4;
    }


.modal-wrapper{
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

`;


@Component({
  selector: 'progress-bar',
  template: HTML_TEMPLATE,
  styles: [CSS_STYLE]
})
export class SimpleProgressBarComponent implements OnInit, OnDestroy {

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
