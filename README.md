# Video Recorder App    

- Para conseguir gravar usando ionic/capacitor, usamos o plugin:
  [capacitor-community/camera-preview](https://github.com/capacitor-community/camera-preview)
- Para instalar o plugin, usamos o comando:
> npm install @capacitor-community/camera-preview

## Para adicionar a plataforma android:

As seguintes permissões são necessárias para o plugin funcionar:
Inclua no arquivo android/app/src/main/AndroidManifest.xml
```
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Para adicionar a plataforma ios:
  Você precisará adicionar duas permissões para Info.plist. Siga a [documentação do Capacitor](https://capacitorjs.com/docs/ios/configuration#configuring-infoplist) e adicione permissões com as chaves raw NSCameraUsageDescriptione NSMicrophoneUsageDescription. NSMicrophoneUsageDescriptioné necessário somente se o áudio for usado. Caso contrário, defina a disableAudioopção para true, que também desabilita a solicitação de permissão do microfone.


### Para iniciar a gravação:
```
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
```

O comando start inicia a camera e o comando startRecordVideo inicia a gravação.

### Para parar a gravação:
```
const resultRecordVideo = await CameraPreview.stopRecordVideo();
await CameraPreview.stop();
```
A primeira linha para a gravação e recupera o caminho para o arquivo do video, a segunda para a camera.

### Para visualizar o video gravado:
```
// @ts-ignore
const filePath = resultRecordVideo.videoFilePath;
this.videoFilePath = Capacitor.convertFileSrc(filePath);
```
O caminho do arquivo é retornado no formato file://, para exibir o video, 
é necessário converter para o formato aceito pelo capacitor.



