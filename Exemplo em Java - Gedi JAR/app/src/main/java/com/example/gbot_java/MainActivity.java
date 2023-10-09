package com.example.gbot_java;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.gbot_java.CodigoBarras.LeituraCodigoActivity;
import com.example.gbot_java.ExemploNFCIdRW.NfcExemplo;
import com.example.gbot_java.ExemploSAT.SatPages.MenuSat;
import com.example.gbot_java.ExemploTEF.Tef;
import com.example.gbot_java.fala.FalaActivity;
import com.example.gbot_java.sensor.SensorActivity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;

import KioskMode.KioskActivity;

public class MainActivity extends AppCompatActivity {

    private Class WangPosManagerClass;
    private Object WangPosManager;
    public static String Model = Build.MODEL;
    public static String PLATAFORMA = "Android Studio";
    public static final String VERSION = "1.0.0";

    public static final String GLASS_MODEL = "A112";

    public static String getVersion(){
        return PLATAFORMA+" - "+VERSION+" - "+Model;
    }

    //REFERENCIA DAS ACTIVITIES
    //GLASS A112
    public static final String  ACTIVITY_IMPRESSAO = "Impressão";
    public static final String  ACTIVITY_DISPLAY = "Display Consumidor";

    //G-BOT - Implementação Futura
    public static final String  ACTIVITY_CODIGO_BARRAS = "Código de Barras";
    public static final String  ACTIVITY_NFCx = "NFC - NDEF";
    public static final String  ACTIVITY_FALA = "Fala GBOT";

    //ACtivities Comuns
    public static final String  ACTIVITY_SAT = "Sat";
    public static final String  ACTIVITY_TEF = "Tef";
    public static final String  ACTIVITY_KIOSKMODE = "Modo Quiosque";
    public static final String  ACTIVITY_SENSOR_PRESENSA = "Sensor de Presença";
    public static final String  ACTIVITY_REBOOT = "Reiniciar GBOT";

    ArrayList<Projeto> projetos = new ArrayList<Projeto>();
    ListView lvProjetos;

    TextView txtProject;
    private AlertDialog alerta;

    private static final String[] PERMISSIONS_MANIFEST = {
            Manifest.permission.REBOOT

    };




    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

    lvProjetos = findViewById(R.id.lvProjetos);
    txtProject = findViewById(R.id.txtNameProject);

        txtProject.setText(getVersion());
        if( verifyRebootPermissions(this) ) {
        initWpos();
    }

        if(Model.equals(GLASS_MODEL)) {
        projetos.add(new Projeto(ACTIVITY_IMPRESSAO, R.drawable.print));
        projetos.add(new Projeto(ACTIVITY_DISPLAY, R.drawable.customerdisplay));
    }else { //G-BOT - Implementação Futura
        projetos.add(new Projeto(ACTIVITY_CODIGO_BARRAS, R.drawable.barcode));
        projetos.add(new Projeto(ACTIVITY_NFCx, R.drawable.nfc2));
        projetos.add(new Projeto(ACTIVITY_SENSOR_PRESENSA, R.drawable.sensor));
    }

        projetos.add(new Projeto(ACTIVITY_FALA, R.drawable.speaker));
        projetos.add(new Projeto(ACTIVITY_KIOSKMODE, R.drawable.kiosk));
        projetos.add(new Projeto(ACTIVITY_TEF, R.drawable.tef));
        projetos.add(new Projeto(ACTIVITY_SAT, R.drawable.icon_sat));
        projetos.add(new Projeto(ACTIVITY_REBOOT, R.drawable.restart));


    ProjetoAdapter adapter = new ProjetoAdapter(getBaseContext(), R.layout.listprojetos, projetos);
        lvProjetos.setAdapter(adapter);
        lvProjetos.setOnItemClickListener(new AdapterView.OnItemClickListener() {
        @Override
        public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
            Projeto projeto = (Projeto) lvProjetos.getItemAtPosition(i);

            Intent intent = null;
            switch (projeto.getNome()){
                //G-BOT Implementação Futura
                case ACTIVITY_CODIGO_BARRAS:
                    intent = new Intent(MainActivity.this, LeituraCodigoActivity.class);
                    break;
                case ACTIVITY_NFCx:
                    intent = new Intent(MainActivity.this, NfcExemplo.class);
                    break;

                //A112
                case ACTIVITY_IMPRESSAO:
                    intent = new Intent(MainActivity.this, Impressora.class);
                    break;
                case ACTIVITY_DISPLAY:
                    intent = new Intent(MainActivity.this, DisplayActivity.class);
                    break;

                //Activities Comuns
                case ACTIVITY_TEF:
                    intent = new Intent(MainActivity.this, Tef.class);
                    break;

                case ACTIVITY_SAT:
                    intent = new Intent(MainActivity.this, MenuSat.class);
                    break;

                case ACTIVITY_FALA:
                    intent = new Intent(MainActivity.this, FalaActivity.class);
                    break;

                case ACTIVITY_KIOSKMODE:
                    intent = new Intent(MainActivity.this, KioskActivity.class);
                    break;

                case ACTIVITY_SENSOR_PRESENSA:
                    intent = new Intent(MainActivity.this, SensorActivity.class);
                    break;

                case ACTIVITY_REBOOT:
                    exemplo_simples();

                    break;
            }

            if(intent != null){
                startActivity(intent);
            }
        }
    });

}

    public void initWpos()
    {
        try{
            WangPosManagerClass = Class.forName("android.os.WangPosManager");
            WangPosManager = WangPosManagerClass.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static boolean verifyRebootPermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.REBOOT);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_MANIFEST,1
            );
            return true;
        }
        return false;
    }

    public void rebootDevice() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Method method = WangPosManagerClass.getMethod("RebootDevice");
        method.invoke(WangPosManager);
    }

    private void exemplo_simples() {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);

        builder.setMessage("Deseja reiniciar o aparelho?");

        builder.setPositiveButton("Reiniciar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface arg0, int arg1) {
                Toast.makeText(MainActivity.this, "Reiniciando", Toast.LENGTH_SHORT).show();
                try {
                    rebootDevice();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                }

            }
        });

        builder.setNegativeButton("Cancelar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface arg0, int arg1) {
                Toast.makeText(MainActivity.this, "Cancelado" , Toast.LENGTH_SHORT).show();
            }
        });
        alerta = builder.create();
        alerta.show();
    }
}