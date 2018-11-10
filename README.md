# ionic-progress-bar

Simple progress bar alert for Ionic3

Installation
-------------

```
npm i ionic-progress-bar --save
```

Usage
------

First, import `IonicSimpleProgressBarModule` and `SimpleProgressBarProvider` to your `app.module.ts` that is normally located in `src\app\app.module.ts`.

```
import { IonicSimpleProgressBarModule, SimpleProgressBarProvider } from 'ionic-progress-bar';

@NgModule({
  imports: [
    IonicSimpleProgressBarModule.forRoot()
  ],
  providers:[
    SimpleProgressBarProvider
  ]
})
export class AppModule { }
```