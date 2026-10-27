# WELTWERK v0.2.4 – Nahkamera

Eine Datei: `index.html` direkt ins Hauptverzeichnis des GitHub-Repositories hochladen (die README ist optional). Bereits bestehende Dateien können bleiben, die App benötigt keine eigenen Unterordner.

## Neu
- Startzoom 18.1 statt 16.6: Straßen deutlich größer.
- GPS- und Demofigur auf ihren tatsächlichen Kartenkoordinaten, Kamera folgt beim Bewegen.
- Demo-Schritte je 15 m statt 45 m, um eine Bewegung auf einzelnen Straßen zu sehen.
- Drehen durch horizontales Wischen mit Pointer Capture; Drehtaste bleibt nutzbar.
- Am unteren Rand wird der aktuelle Kamerawinkel angezeigt.
- Fehlende Kartenkacheln: dekorative Ersatzkarte. Nur **geladene echte OSM-Straßen** stimmen mit GPS-Koordinaten überein; die Ersatzstraßen sind *nicht* geografisch korrekt.
- Inventar, Ressourcen, Dropchancen und bestehendes Speicherformat sind unverändert.

## Achtung
Die GPS-Position wird **nicht** künstlich auf eine Straße verschoben. Wenn die gemessene Position abseits der Straße liegt (GPS-Fehler oder echte Position), wird sie genau dort gezeigt. Ressourcenpositionen sind nicht auf öffentliche Zugänglichkeit geprüft.

## Testen
1. Per HTTPS (z. B. GitHub Pages) starten; Demo-Modus wählen.
2. Mit dem Finger horizontal **auf dem Kartenboden** wischen (nicht über Marker oder Buttons); Winkelanzeige sollte sich ändern.
3. Mit + / − hinein- bzw. herauszoomen. Pfeile im Demo-Modus bewegen Figur in 15-m-Schritten.
4. Danach GPS aktivieren und außerhalb eines Gebäudes ausprobieren.

Kartendaten: © OpenStreetMap-Mitwirkende (https://www.openstreetmap.org/copyright). Rastertiles können ohne Internet nicht geladen werden. Für einen öffentlichen Release mit vielen Nutzern ist ein geeigneter Kartenhosting-Anbieter nötig.
