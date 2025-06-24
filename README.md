# 🌾🚜 AgriWareSense – Smart Agricultural Warehouse Monitoring System

> **“Keeping grains happy, healthy & heist‑proof!”** 🌽💪

 [![Built with ❤️ & Node.js](https://img.shields.io/badge/Built%20with-Node.js-blue.svg)](#)

AgriWareSense is an IoT‑powered sidekick for agricultural warehouse managers. It monitors the climate, fends off thieves, and keeps your crops in tip‑top shape through real‑time sensing, automated actuation, and predictive analytics. Early field tests cut spoilage by **30 %** and boosted efficiency by **25 %**.

---

## 🎯 Why AgriWareSense?

Because sacks full of moldy grain are nobody’s idea of farm‑to‑table perfection.

---

## ✨ Features

| Category        | Sensor            | We track…                     | We react…                                                       |
| --------------- | ----------------- | ----------------------------- | --------------------------------------------------------------- |
| **Climate**     | DHT11             | Temperature 🌡️ / Humidity 💧 | 🌀 **Fans** cool things down<br>💦 **Humidifier** adds moisture |
| **Air Quality** | MQ‑2              | Smoke / Gas 🪄                | 🚨 Fire‑risk alert + optional buzzer                            |
| **Lighting**    | LDR               | Ambient light 🌞              | 💡 Auto‑toggle warehouse lights                                 |
| **Inventory**   | Load Cell + HX711 | Grain weight ⚖️               | 🔔 Restock / emptiness warning                                  |
| **Security**    | PIR               | Motion after hours 🕵️‍♂️     | ⚠️ Theft alert & siren                                          |

Additional goodies:

* 📈 **Interactive Web Dashboard** with live charts (HTML + CSS + JS)
* 🔌 **WebSocket Control** for millisecond‑level actuation 
* 🧠 **Pattern & Anomaly Detection** using historical data which stored on MongoDB

---


## 🛠️ Tech Stack

### ⚙️ Hardware

* **ESP32** – the Wi‑Fi‑enabled brain 🧠
* **DHT11** – temperature & humidity sensor
* **MQ‑2** – gas/smoke sensor
* **LDR** – light sensor
* **PIR** – motion sensor
* **Load Cell + HX711** – grain weight module
* **Actuators** – fans, humidifier, LED strip, buzzer

### 💻 Software

* **Backend** – Node.js, Express.js, MongoDB, WebSocket
* **Frontend** – HTML, CSS, JavaScript
* **Analytics** – Python/Node scripts
* **Deployment** – Local server or cloud (optional)

---

## 🚀 Quick Start

```bash
# 1. Grab the code
git clone https://github.com/dev-gaurav01/AgriWareSense.git
cd AgriWareSense

# 2. Install server deps
cd Backend
npm install

# 3. Fire up the server
npm start        # default → http://localhost:3000
```

1. Flash the ESP32 with `/Firmware/esp_32code.ino`.
2. Update Wi‑Fi credentials in the firmware.
3. Connect sensors/actuators as per the circuit diagram.
4. Open your browser and watch the dashboard spring to life! 🌟

---


## 🤝 Contributing

Fork ➜ Branch ➜ PR. Bonus points if your commit messages include agriculture puns (e.g., “Lettuce improve humidity control”).

1. Create a feature branch: `git checkout -b feature/my-awesome-idea`
2. Commit your changes: `git commit -m "🌽 Add corny new feature"`
3. Push to the branch: `git push origin feature/my-awesome-idea`
4. Open a Pull Request and watch the crops grow.

---

