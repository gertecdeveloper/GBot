# Projeto Gertec One Framework para GPOS700

## Requisitos
    Ionic
    Cordova
    Android Studio

## Cordova Setup
    Java JDK8 (Cordova não é compatível com a versão mais recente do Java)
    Gradle (precisa ser instalado separadamente: https://gradle.org/install/)

## Instalação
### Baixar os módulos do projeto com
    npm install 

### Instalar o plugin com as funções base da GBOT
    npm install cordova-plugin-gbot
    ionic cordova plugin add cordova-plugin-gbot

###  Ajustar para o seguinte código no arquivo AndroidManifest.xml (NECESSÁRIO PARA O SAT)
    No diretório: platforms/android/app/src/main/AndroidManifest.xml, adequar a primeira tag <activity> já existente para:

        <activity android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode" android:label="@string/activity_name" android:launchMode="singleTop" android:name="MainActivity" android:theme="@android:style/Theme.DeviceDefault.NoActionBar" android:windowSoftInputMode="adjustResize">
            <intent-filter android:label="@string/launcher_name">
                <action android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED" />
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <meta-data android:name="android.hardware.usb.action.USB_DEVICE_ATTACHED" android:resource="@xml/device_filter" />
        </activity>

### Ajustar o caminho das chaves de acordo com seu diretório.
    No arquivo build.json;
    "keystore": "C:/SEUCAMINHO/Chaves/Development_GertecDeveloper_EnhancedAPP.jks"

### [Windows 10] Talvez seja necessário fazer um bypass pelas politicas de execução do terminal
    Para fazer isso para o usuário atual de maneira permanente, faça, em seu terminal: 
    
    Set-Executionpolicy -Scope CurrentUser -ExecutionPolicy UnRestricted

    Para fazer isto somente para a sessão atual de seu terminal, faça:
    
    Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
### Rodar o projeto realizando a assinatura da aplicação
    ionic cordova run android --prod --release --buildConfig=build.json

