import { Component } from '@angular/core';
import { WebcamImage } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Reffrence
  // =========
  // https://www.itsolutionstuff.com/post/how-to-capture-picture-from-webcam-in-angular-13example.html
  // https://medium.com/@coolchoudharyvijay/use-webcam-in-angular-simplified-c1ee012e875f

  private trigger: Subject<any> = new Subject();

  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();

  captureImage = '';

  /*------------------------------------------
   --------------------------------------------
   triggerSnapshot()
   --------------------------------------------
   --------------------------------------------*/
  public triggerSnapshot(): void {
    this.trigger.next(undefined);
  }

  /*------------------------------------------
  --------------------------------------------
  handleImage()
  --------------------------------------------
  --------------------------------------------*/
  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage!.imageAsDataUrl;
    console.info('received webcam image', this.captureImage);
  }

  /*------------------------------------------
  --------------------------------------------
  triggerObservable()
  --------------------------------------------
  --------------------------------------------*/
  public get triggerObservable(): Observable<any> {

    return this.trigger.asObservable();
  }

  /*------------------------------------------
  --------------------------------------------
  nextWebcamObservable()
  --------------------------------------------
  --------------------------------------------*/
  public get nextWebcamObservable(): Observable<any> {

    return this.nextWebcam.asObservable();
  }

  /*------------------------------------------
  --------------------------------------------
  showNextWebcam()
  --------------------------------------------
  --------------------------------------------*/
  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
}
