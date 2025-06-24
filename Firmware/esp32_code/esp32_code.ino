#include <WiFi.h>
#include <WebSocketsClient.h>
#include <DHT.h>

#define DHTPIN 4       // DHT11 Data pin connected to GPIO 4
#define DHTTYPE DHT11  // DHT11 sensor type
#define PIRPIN 5       // PIR Sensor connected to GPIO 5
#define MQ135PIN 34    // MQ135 Sensor Analog output connected to GPIO 34
#define LDRPIN 33      // LDR Sensor Analog output connected to GPIO 33

DHT dht(DHTPIN, DHTTYPE);

const char* ssid = ""; // Replace with your Wi-Fi SSID
const char* password = ""; // Replace with your Wi-Fi password
const char* websocketServer = ""; // Replace with your server's local IP address
const uint16_t websocketPort = ; // WebSocket server port
const char* websocketPath = "/"; // WebSocket endpoint

WebSocketsClient webSocket;

void setup() {
    Serial.begin(115200);

    // Initialize sensors
    dht.begin();
    pinMode(PIRPIN, INPUT);

    // Connect to Wi-Fi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Initialize WebSocket connection
    initWebSocket();
}

void loop() {
    webSocket.loop();

    // Send sensor data every 5 seconds
    static unsigned long lastSend = 0;
    if (millis() - lastSend > 5000) {
        lastSend = millis();

        // Read sensor data
        float temperature = dht.readTemperature();
        float humidity = dht.readHumidity();
        int pirStatus = digitalRead(PIRPIN);
        int airQuality = analogRead(MQ135PIN);
        int lightRaw = analogRead(LDRPIN);

        // Corrected light intensity calculation
        float lightIntensity = 100 - ((lightRaw / 4095.0) * 100); // Invert the value

        // Debug PIR sensor
        Serial.print("PIR Status: ");
        Serial.println(pirStatus);

        // Create JSON data
        String jsonData = "{\"temperature\": " + String(temperature) + 
                          ", \"humidity\": " + String(humidity) + 
                          ", \"pirStatus\": " + String(pirStatus) + 
                          ", \"airQuality\": " + String(airQuality) + 
                          ", \"lightIntensity\": " + String(lightIntensity) + "}";

        // Send data to WebSocket server
        if (webSocket.isConnected()) {
            webSocket.sendTXT(jsonData);
            Serial.println("Data sent: " + jsonData);
        } else {
            Serial.println("WebSocket not connected. Attempting to reconnect...");
            initWebSocket(); // Reinitialize WebSocket connection
        }
    }
}

void initWebSocket() {
    // Connect to WebSocket server
    webSocket.begin(websocketServer, websocketPort, websocketPath);
    webSocket.onEvent(webSocketEvent);
    webSocket.setReconnectInterval(5000); // Reconnect every 5 seconds
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            Serial.println("WebSocket disconnected");
            break;
        case WStype_CONNECTED:
            Serial.println("WebSocket connected");
            break;
        case WStype_TEXT:
            Serial.printf("Received: %s\n", payload);
            break;
        case WStype_ERROR:
            Serial.println("WebSocket error");
            break;
    }
}