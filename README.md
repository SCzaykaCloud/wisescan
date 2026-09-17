# WiseScan — Mobile Scan & Dokumenten-Manager

WiseScan ist eine performante, mobile React-Native-Anwendung zum raschen Erfassen, Aufbereiten und Verwalten von Dokumenten sowie QR-/Barcodes. Die Anwendung kombiniert eine moderne Mobile-UX mit einem skalierbaren PHP-Backend.

---

📌 **Projektreferenzen & Links**
* 📄 **IHK-Projektdokumentation:** Die vollständige 30-seitige Dokumentation inkl. Systemarchitektur und UML-Diagrammen liegt im Repository unter **[docs/IHK_Projektdokumentation.pdf](./docs/IHK_Projektdokumentation.pdf)**.
* ⚙️ **Backend-API Repository:** Der Quellcode der zugehörigen REST-API und die Datenbankstruktur befinden sich unter **[WiseScan API Backend](https://github.com/dein-username/wisescanApi)**.

---

🏗️ **Architektur & Datenfluss**

Die App setzt konsequent auf einen **Offline-First-Ansatz**:

1. **Erfassung & Aufbereitung (Client):** Kamera-basiertes Scannen mit automatischer Bildoptimierung und Tag-Zuweisung direkt auf dem Smartphone (React Native / Expo).
2. **Lokale Speicherung:** Erfasste Scans bleiben offline sofort verfügbar und über die lokale Datenbank durchsuchbar.
3. **Synchronisation (Fullstack):** Bei aktiver Netzwerkverbindung werden Dokumente und Metadaten per JSON/FormData an die PHP-REST-API übertragen und zentral abgelegt.

---

✨ **Highlights & Features**

* 📷 **Smart Scan:** Automatische Bildkorrektur und perspektivischer Zuschnitt.
* 🔍 **OCR-Texterkennung:** Volltextsuche direkt im erfassten Dokument.
* 🏷️ **Code-Scanner:** Integriertes Auslesen von QR- und Barcodes.
* 🔄 **Backend-Sync:** Effiziente Schnittstelle zur zentralen Datenhaltung.
* 🎨 **Ergonomische UI:** Intuitive Drawer-Navigation mit Hell-/Dunkelmodus (Tailwind CSS).

---

🛠️ **Tech Stack**

* **Frontend:** React Native, Expo, TypeScript, Tailwind CSS
* **Backend:** PHP (REST-API), MySQL
* **Tools & Build:** Babel, Metro, Git

---

🔌 **API-Endpunkte (PHP-Backend)**

* `POST /api/v1/scans` — Überträgt neue Dokumenten-Scans inkl. Metadaten.
* `GET  /api/v1/documents` — Lädt archivierte Scans für den Anwender.
* `POST /api/v1/ocr` — Verarbeitet Bilddaten für die serverseitige Texterkennung.
