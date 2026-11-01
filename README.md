# WELTWERK v0.2.23 – Mehr Entdeckungen

## Neuerungen
- Startzoom **20,5** statt 19,5; Zoomtasten bleiben nutzbar.
- **30 Meter** Sammelradius statt 50 Meter. Der sichtbare Kreis und die tatsächliche Sammelgrenze sind identisch.
- Rund **2,5-fache Fundstellendichte** durch zusätzliche, dauerhaft reproduzierbare Spawnpunkte.
- **Mindestens 18 m Abstand** zwischen den neu hinzugefügten und den anderen Fundstellen.
- Alte Fundstellen behalten ihre Koordinaten, Typen und IDs. Neue Fundstellen bekommen zusätzliche IDs.
- Neue Fundstellen unterstützen Regeneration, Baum-Sammelszenen sowie Import/Export und lokalen Speicherstand.
- Weniger gleichzeitig sichtbare Marker, um die Darstellung auf Smartphones schnell zu halten.
- Bei fehlenden Vektordaten werden Raster-Notkacheln maximal in Zoom 19 angefragt und hochskaliert; so funktionieren auch hohe Spiel-Zoomwerte ohne ungültige Raster-URLs.
- **Vorbereitung für Radius-Upgrades**: Die aktuelle Grundreichweite wird über `getCollectionRadius()` bereitgestellt. Skill Tree und Werkzeuge sind ausdrücklich noch nicht implementiert.

## Installation (GitHub Pages)
1. ZIP entpacken.
2. Im GitHub-Repository die `index.html` im Hauptverzeichnis ersetzen.
3. Änderungen committen und Seite öffnen. Falls noch die alte Version geladen wird, `?v=0223` an die URL hängen.
4. Eine Sicherung des aktuellen Spielstands unter `Mehr → Export` erstellen, bevor du aktualisierst.

## Hinweise
- Für GPS ist HTTPS und die Standortfreigabe nötig.
- Fundstellen sind **virtuell** und wurden **nicht** auf öffentliche Zugänglichkeit geprüft. Nicht auf Privatgrundstücke oder in gefährliche Bereiche gehen.
- Die Dichte ist ein ungefährer Durchschnitt. Lokale Zahlen hängen vom reproduzierbaren Spawnraster und Standort ab.
- Die 30-m-Reichweite setzt eine hinreichend gute Standortgenauigkeit voraus. Bei GPS-Abweichungen kann eine Fundstelle trotz optischer Nähe als außerhalb markiert werden.
- Die bestehende 60-Minuten-Regeneration und Baum-Dropchancen aus v0.2.22 bleiben unverändert.
- Status: Tests in einer mobilen Chromium-Umgebung und deterministische Logiktests durchgeführt. Keine bestätigten Live-GPS-Tests auf dem Zielgerät.
