import android.app.Activity;
import android.os.Bundle;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class MainActivity extends Activity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    // Set up the web server on port 8080
    try {
      HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
      server.createContext("/", new MyHandler());
      server.setExecutor(null); // creates a default executor
      server.start();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  // Define the HTTP handler to handle requests to the server
  static class MyHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) throws IOException {
      // Set the response headers and status code
      t.sendResponseHeaders(200, 0);
      OutputStream os = t.getResponseBody();

      // Write the response body
      os.write("Hello, World!".getBytes());

      // Close the response body
      os.close();
    }
  }
}
