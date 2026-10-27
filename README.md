# WELTWERK v0.2.5 – Kamerafix

Eine spielbare GPS-/Demo-Erkundungswelt mit 2.5D-Bodenkarte, Sammelressourcen, Dropchancen, Inventar und lokalem Spielstand.

## Neu seit v0.2.4
- **Fingerbewegungen drehen nur den Kamerawinkel.** Neigung und Zoom bleiben beim Drehen unverändert; Zoom nur über +/− oder Mausrad.
- **Kontinuierliche Bodenfläche:** Der vorher sichtbare rechteckige Kartenrand wird durch einen größeren Boden und weich ausgeblendete Kartenkacheln vermieden.
- **Gemeinsame Kartenprojektion:** Fundstellen und Straßen werden von denselben geografischen Koordinaten und derselben Drehung abgeleitet.
- **Optimierte Marker-Updates:** Neu platzierte Objekte werden nicht jedes Mal einzeln vollständig neu gerendert.
- Kein neuer Spielstand oder neues Datenformat erforderlich.

## Installation (GitHub Pages)
1. ZIP entpacken.
2. Im vorhandenen GitHub-Repository **index.html** im Hauptverzeichnis mit der neuen Datei ersetzen. Die README ist optional.
3. Änderungen committen und einige Momente später die GitHub-Pages-Seite mit `?v=025` neu öffnen, z. B. `https://BENUTZERNAME.github.io/weltwerk/?v=025`.
4. Vor dem Update zur Sicherheit im Spiel unter **Mehr → Export** den Spielstand sichern.

## Test
- Im Demo-Modus die Karte horizontal wischen: **RICHTUNG** ändert sich, **ZOOM** bleibt unverändert.
- Verschiedene Rohstoffvorkommen beobachten: Sie drehen mit der Karte, nicht unabhängig von der Straße.
- Mit +/− zoomen; die Kamera lässt sich über 3D/2D umstellen.
- Im echten GPS-Modus im Freien ausprobieren (HTTPS und Standortberechtigung benötigt).

## Grenzen
- Dies ist eine perspektivische 2.5D-Karte mit echten OSM-Kartenkacheln, keine vollständig modellierte 3D-Stadt.
- Echte Straßen erscheinen nur bei bestehender Internetverbindung. Die Ersatzgrafik ist rein dekorativ und kein reales Wegenetz.
- Virtuelle Fundstellen sind noch nicht auf öffentliche Zugänglichkeit geprüft. Niemals in Straßenverkehr, gesperrte Bereiche oder auf Privatgrundstücke gehen.
- Alle Daten bleiben lokal in diesem Browser; keine Server-Synchronisation.
- Den Live-Betrieb mit deinem konkreten Handy/GPS konnte ich nicht direkt prüfen.
