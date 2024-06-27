import {Component} from '@angular/core';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular/standalone';
import {CameraPreview} from '@capacitor-community/camera-preview';
import {CommonModule} from "@angular/common";
import {Capacitor} from "@capacitor/core";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton, CommonModule],
})
export class HomePage {
    videoFilePath: string = "";
    isRecording: boolean = false;

    constructor() {
    }

    async rec() {
        this.isRecording = true;
        this.videoFilePath = "";
        try {
            await CameraPreview.start({
                parent: "camera-preview",
                position: "rear",
                width: window.screen.width,
                height: window.screen.height - 100,
                y: 100,
                enableZoom: true
            });

            await CameraPreview.startRecordVideo({
                position: "rear",
                width: window.screen.width,
                height: window.screen.height - 100
            });
        } catch (error) {
            console.error(error)
        }
    }

    async stop() {
        this.isRecording = false;
        const resultRecordVideo = await CameraPreview.stopRecordVideo();
        console.log(resultRecordVideo);
        // @ts-ignore
        const filePath = resultRecordVideo.videoFilePath;
        this.videoFilePath = Capacitor.convertFileSrc(filePath);
        await CameraPreview.stop();
    }

}
