# WELTWERK v0.2.10 — Fundstellenfix

**Behoben:** Bäume, Steine, Schrott und Spielfigur werden jetzt direkt auf dieselbe hochauflösende Canvas-Fläche wie die Straßenkarte gezeichnet. Sie liegen nicht länger als separate HTML-Marker darüber. Die Berührungserkennung verwendet die gezeichneten Koordinaten.

**Schärfer:** Die Karte nutzt bis zu 2× Bildschirmauflösung (je nach Gerät). Die entfernte Kartenebene nutzt höher aufgelöste Kartendaten als zuvor. Weiterhin sind die Quellen Rasterbilder, keine vektorbasierte 3D-Szene.

## Installation

1. ZIP entpacken.
2. In deinem GitHub-Repository die `index.html` im Hauptverzeichnis ersetzen.
3. GitHub Pages abwarten und die Website mit `?v=0210` öffnen.
4. Oben sollte `v0.2.10` stehen.

Lokale Speicherstände behalten die bisherige Speicherkennung. Bitte bei Bedarf vorher über **Mehr → Export** sichern.

**Test:** Im Demo-Modus drehen, Bäume antippen, sammeln und Inventar prüfen. Im GPS-Modus wird der Standort übernommen; ein GPS-Test auf Android ist weiterhin erforderlich.

Virtuelle Rohstoffpositionen sind nicht auf öffentliche Zugänglichkeit geprüft. Nur von sicheren, öffentlich zugänglichen Standorten spielen und niemals beim Fahren.

**GPS-Beruhigung:** Kleine Messschwankungen bei Stillstand werden ignoriert, bei echter Bewegung folgt die Kamera weiterhin dem Standort.

**Kartenqualität:** Höhere Canvas-Auflösung, schmalere Zeichenstreifen und besser aufgelöste Fernkacheln. Die öffentlich bereitgestellten Rasterkacheln haben weiterhin eine natürliche Schärfegrenze.
