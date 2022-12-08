import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

import android.os.Bundle;
import android.app.Activity;
import android.widget.TextView;

public class MainActivity1 extends Activity {

  private ServerSocket serverSocket;

  private TextView serverStatus;

  // default ip
  public static String SERVERIP = "10.0.2.15";

  // designate a port
  public static final int SERVERPORT = 8080;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    serverStatus = (TextView) findViewById(R.id.server_status);

    SERVERIP = getLocalIpAddress();

    Thread fst = new Thread(new ServerThread());
    fst.start();
  }

  public class ServerThread implements Runnable {

    public void run() {
      try {
        if (SERVERIP != null) {
          serverSocket = new ServerSocket(SERVERPORT);
          while (true) {
            // listen for incoming clients
            Socket client = serverSocket.accept();
            InetAddress inetAddress = client.getInetAddress();
            System.out.println("Client connected: " + inetAddress);
            PrintWriter out = new PrintWriter(client.getOutputStream(), true);
            out.println("Hello from the Android web server!");
            out.close();
            client.close();
          }
        } else {
          System.out.println("Could not detect internet connection.");
        }
      } catch (IOException e) {
        System.out.println("Error creating server socket: " + e.getMessage());
        e.printStackTrace();
      }
    }
  }

  // gets the local IP address
  private String getLocalIpAddress() {
    try {
      for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
        NetworkInterface intf = en.nextElement();
        for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
          InetAddress inetAddress = enumIpAddr.nextElement();
          if (!inetAddress.isLoopbackAddress()) {
            return inetAddress.getHostAddress().toString();
          }
        }
      }
    } catch (SocketException ex) {
      System.out.println("Error getting local IP address: " + ex.getMessage());
    }
    return null;
  }

  @Override
  protected void onStop() {
    super.onStop();
    try {
      // make sure you close the socket upon exiting
      serverSocket.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
