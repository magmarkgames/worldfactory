# WELTWERK v0.2.11 — Low Poly World

Diese Version baut **auf der funktionierenden v0.2.10 auf** und verändert vorrangig die Weltansicht.

## Neu

- Aufrechte Low-Poly-Häuser mit farbigen Dächern, Seitenwänden und Fenstern.
- Die Gebäude folgen, sofern die Daten verfügbar sind, echten OpenStreetMap-Gebäudeumrissen. Die Kartenregion wird dazu über die **Overpass API** abgefragt. Gebäudehöhen aus OSM werden genutzt, ansonsten verwendet das Spiel plausible vereinfachte Standardhöhen.
- Parks, Grünflächen und Gewässer erhalten stellenweise eine leichte farbige Spielflächen-Überlagerung, wenn die entsprechenden Umrisse geladen werden.
- Neue Taste **🏠** rechts auf der Karte: Gebäude ein-/ausblenden, z. B. für schwächere Handys.
- Bäume, Steine, Schrott und Figur bleiben weiterhin mit denselben GPS-Koordinaten wie die Straßen im **gleichen Canvas** verankert. Sie sind über den Häusern sichtbar und weiter anklickbar.
- Im Demo-Modus werden bei einem Ausfall der Gebäudedaten *ausdrücklich nur beispielhafte* Low-Poly-Häuser angezeigt. Im GPS-Modus gibt es keine erfundenen Häuser als echte OSM-Gebäude.
- Ohne Gebäudedaten bleibt die Karte weiter spielbar. Inventar, Dropchancen, GPS, Speichern, Regeneration und Demo-Modus sind erhalten.

## Auf GitHub Pages aktualisieren

1. Ein Backup deines Spielstands über **Mehr → Export** machen.
2. Die ZIP-Datei entpacken und auf GitHub im **Hauptverzeichnis** nur die neue `index.html` hochladen und die alte ersetzen.
3. Änderungen committen, danach deine Seite mit `?v=0211` neu aufrufen.
4. Oben die Versionsnummer **v0.2.11** prüfen.

Für die App wird weiterhin nur die `index.html` benötigt; die `README.md` ist reine Dokumentation. Es gibt **keine Unterordner** und keine Build-Schritte.

## Hinweise und Grenzen

- Es handelt sich um eine performante **2.5D-Kartendarstellung mit perspektivischen 3D-Häusern**, nicht um eine vollständige 3D-Engine mit beliebig begehbaren Modellen.
- Echte Gebäude setzen Internetzugriff sowie erreichbare OSM-/Overpass-Dienste voraus. Dort können Daten fehlen, abweichend sein oder Abfragen verzögert werden. Das Spiel gibt für eine Stadt also keine Vollständigkeitsgarantie.
- Gebäudedaten und Kartenkacheln kommen von öffentlichen externen Servern. Diese erhalten die angefragte ungefähre Kartenregion; GPS-Verläufe speichert WELTWERK nicht.
- Öffentliche OSM-/Overpass-Server sind keine dauerhaft unbegrenzte Produktionsinfrastruktur. Für einen größeren Release sind geeignete Hosting-/Kartendienste und ein eigener Cache nötig.
- Rohstoffvorkommen sind weiterhin prototypisch generiert und **nicht** auf öffentliche Zugänglichkeit geprüft. Bitte nicht auf Privatgrundstücke, Fahrbahnen oder in gefährliche Bereiche gehen.
- Die mobilen Tests wurden in Chromium mit **simulierten** Gebäudedaten und Kartenkacheln durchgeführt. Das tatsächliche Live-Laden auf deinem Android-Gerät muss noch überprüft werden.
