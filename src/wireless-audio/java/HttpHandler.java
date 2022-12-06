import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;

import android.graphics.ImageFormat;
import android.hardware.Camera;
import android.hardware.Camera.Parameters;
import android.hardware.Camera.Size;
import android.media.CamcorderProfile;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import java.io.IOException;
import java.io.OutputStream;

static class MyHandler implements HttpHandler {
  // Set up the audio recorder to capture audio data
  private AudioRecord recorder;
  private int sampleRate = 44100;
  private int channelConfig = AudioFormat.CHANNEL_IN_MONO;
  private int audioFormat = AudioFormat.ENCODING_PCM_16BIT;
  private int bufferSize = AudioRecord.getMinBufferSize(sampleRate, channelConfig, audioFormat);

  // Set up the camera and the media recorder
  private Camera camera;

  @Override
  public void handle(HttpExchange t) throws IOException {
    // Set the response headers and status code
    t.sendResponseHeaders(200, 0);
    OutputStream os = t.getResponseBody();

    // Create the audio recorder and start recording
    recorder = new AudioRecord(MediaRecorder.AudioSource.MIC, sampleRate, channelConfig, audioFormat, bufferSize);
    recorder.startRecording();

    // Create a buffer to store the audio data
    byte[] buffer = new byte[bufferSize];

    // Read the audio data from the recorder and write it to the response body
    while (recorder.read(buffer, 0, bufferSize) > 0) {
      os.write(buffer);
    }

    // Stop the recorder and close the response body
    recorder.stop();
    os.close();

    // // Set the response headers and status code
    // t.sendResponseHeaders(200, 0);
    // OutputStream os = t.getResponseBody();

    // // Open the camera and set the preview size
    // camera = Camera.open();
    // Parameters params = camera.getParameters();
    // Size size = params.getPreviewSize();
    // params.setPreviewFormat(ImageFormat.NV21);
    // camera.setParameters(params);

    // // Set up the media recorder and start recording
    // mediaRecorder = new MediaRecorder();
    // mediaRecorder.setCamera(camera);
    // mediaRecorder.setVideoSource(MediaRecorder.VideoSource.CAMERA);
    // mediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.THREE_GPP);
    // mediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H263);
    // mediaRecorder.setVideoSize(size.width, size.height);
    // mediaRecorder.setVideoFrameRate(15);
    // mediaRecorder.setOutputFile(os.getFD());
    // mediaRecorder.prepare();
    // mediaRecorder.start();

    // // Stop the recorder and close the response body when the connection is closed
    // t.getRequestBody().close();
    // mediaRecorder.stop();
    // os.close();
  }
}