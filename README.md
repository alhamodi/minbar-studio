# Minbar Studio
**Professional Islamic Streaming Toolkit for OBS Studio** | [Read in Arabic (العربية)](README.ar.md)

![Minbar Studio Banner](https://via.placeholder.com/1920x1080/0A192F/D4AF37?text=Minbar+Studio+-+Islamic+Broadcast+Toolkit)

Minbar Studio is a premium, open-source broadcast toolkit designed specifically for Islamic content creators, masjids, educational institutes, and live events. Built entirely on vanilla web technologies, it provides a lightweight, highly performant overlay system for OBS Studio, complete with a remote Production Dashboard.

## 🎥 Live Action Demo
Watch the automated demo below to see the transitions, widgets, and themes in action!
![Minbar Studio Demo](/Users/abdulrahmansalimalhamodi/.gemini/antigravity-ide/brain/32417b34-a0eb-40b4-b905-d66ccb82480e/minbar_studio_demo_1782650659596.webp)

## ✨ Features
* **12 Premium Scenes**: Starting Soon, Live, Intermission, Ending, Offline, Announcement, Sponsor, Schedule, Dua, Quran, and more.
* **13 Configurable Widgets**: Dynamic Clocks, Countdowns, Tickers, Chat Boxes, Goals, and Speaker Info cards.
* **7 JSON Themes**: Instantly switch color palettes (Gold, Emerald, Midnight, Royal Blue, Ramadan, Masjid, Elegant White).
* **Islamic Motion Graphics**: Features custom transitions like *Noor Fade*, *Mashrabiya Reveal*, and *Arabesque Bloom*.
* **Production Dashboard**: A remote web panel to control your stream, change text on the fly, and switch themes.
* **Responsive Layouts**: Fully responsive up to 4K resolution with zero pixelation thanks to SVG architecture.
* **ZIP Export System**: Package your customized overlay for distribution.

## 🚀 Installation & OBS Setup

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Clone the Repository**:
   \`\`\`bash
   git clone https://github.com/yourusername/minbar-studio.git
   cd minbar-studio
   npm install
   \`\`\`
3. **Start the Server**:
   \`\`\`bash
   npm start
   \`\`\`
4. **OBS Configuration**:
   * Open OBS Studio.
   * Add a new **Browser Source**.
   * Set URL to `http://localhost:3000/overlay/index.html`.
   * Set Width to `1920` and Height to `1080`.
   * Check "Refresh browser when scene becomes active".
5. **Open the Dashboard**:
   * Open your web browser to `http://localhost:3000/control/index.html`.
   * You can now control the OBS overlay remotely!

## 📁 Architecture Overview
* `/overlay`: The OBS-facing frontend. Uses ES Modules to dynamically load scenes and widgets to preserve memory.
* `/control`: The Production Dashboard UI.
* `/server`: Node.js WebSocket broker that maintains persistent state (`state.json`).
* `/themes`: JSON configurations that are parsed and injected as CSS variables.
* `/assets`: Vector graphics, transitions, and backgrounds.

## 🤝 Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
