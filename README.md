# WiseScan — Mobile Scan & Dokumenten-Manager

WiseScan ist eine performante, mobile React-Native-Anwendung zum raschen Erfassen, Optimieren und Verwalten von Dokumenten sowie QR-/Barcodes mit Anbindung an ein PHP-Backend.

---

### 🏗️ Architektur & Datenfluss

Die App folgt dem **Offline-First-Ansatz**:
1. **Erfassung & Aufbereitung (Client):** Kamera-Scan, automatische Bildoptimierung und Zuweisung von Tags auf dem Smartphone (React Native / Expo).
2. **Lokale Speicherung:** Scans bleiben offline sofort verfügbar und durchsuchbar.
3. **Synchronisation (Fullstack):** Sobald eine Verbindung besteht, werden Dokumente per JSON/FormData an die PHP-REST-API übertragen und in der Datenbank abgelegt.

---

### ✨ Highlights & Features

* **Smart Scan:** Automatische Bildkorrektur & Zuschnitt.
* **OCR-Texterkennung:** Volltextsuche direkt im erfassten Dokument.
* **Code-Scanner:** Integriertes Auslesen von QR- und Barcodes.
* **Backend-Sync:** Schnittstelle zur zentralen Datenhaltung.
* **Ergonomische UI:** Ergänzende Drawer-Navigation mit Hell-/Dunkelmodus (Tailwind CSS).

---

### 🔌 API Endpunkte (PHP-Backend)

* `POST /api/v1/scans` — Überträgt neue Dokumenten-Scans inkl. Metadaten.
* `GET /api/v1/documents` — Lädt archivierte Scans für den Nutzer.
* `POST /api/v1/ocr` — Verarbeitet Bilddaten für die Texterkennung.

---
