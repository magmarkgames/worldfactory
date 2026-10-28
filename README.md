# WELTWERK v0.2.12 – Schnellere Karte & GPS-Gebäude

**Installation:** ZIP entpacken; auf GitHub im Stammverzeichnis die bisherige `index.html` durch die neue ersetzen, committen, danach `?v=0212` an die GitHub-Pages-Adresse hängen. `README.md` ist optional. Alle Dateien liegen auf einer Ebene.

## Verbesserungen
- Straßenkacheln nur für die sichtbare Umgebung anfordern, maximal 5 gleichzeitige Downloads. Die Kachel der Spielfigur wird zuerst angefordert.
- Reguläres HTTP-Browsercaching bleibt aktiv. Beim Drehen werden bereits geladene Kacheln wiederverwendet.
- Die GPS-Gebäudesuche verwendet ausdrücklich die **aktuelle GPS-Position** statt der vorherigen Demo-Position.
- Wechsel des Modus bricht veraltete Gebäudesuchen ab.
- Echte Häuser werden jetzt zuerst bei `overpass.private.coffee` gesucht; bei einem Fehler bei `overpass-api.de`.
- Kleinerer Gebäudedaten-Ausschnitt und einfachere Abfrage. Während derselben Sitzung werden schon geladene Häuser in der Nähe zwischengespeichert.
- Sollte `HÄUSER OFFLINE` erscheinen, startet die 🏠-Taste einen erneuten Versuch.

## Grenzen
- Öffentliche Karten- und Gebäudedienste können auf LTE langsam oder zeitweise nicht erreichbar sein. Es gibt weiterhin keine Garantie, dass jeder echte Gebäudeumriss in OSM existiert.
- Ohne Internet steht eine grüne Ersatzlandschaft zur Verfügung; im GPS-Modus werden keine erfundenen Häuser eingeblendet.
- Rohstoffe/Inventar/GPS-Standort werden nicht neu modelliert; der vorhandene Spielstand wird weiterverwendet. Bitte vorher per **Mehr → Export** sichern.
- Gebäudeflächen werden für die aktive Kartenregion beim Drittanbieter angefragt, auch im GPS-Modus. Es wird kein GPS-Verlauf auf dem Gerät gespeichert.
- Der öffentliche OpenStreetMap-Kachelserver erlaubt keine massenhaften Vorab-Downloads oder Offline-Nutzung. Für eine größere Veröffentlichung muss ein eigener geeigneter Kartenanbieter her.
- Bei einem Wechsel über große Distanzen (z. B. Demo → GPS) werden noch laufende Downloads der alten Region abgebrochen, damit die neue Umgebung schneller erscheint.

**Tests:** Syntaxprüfung und simulierte mobile Chromium-Tests mit künstlichen Straßenkacheln und Gebäudeumrissen: Demo, GPS-Wechsel in eine andere Region, Ausfall des primären Overpass-Servers, Ausweichserver, Sitzungscache, Karte drehen und Rohstoff einsammeln. Ein echter Test der Dienste und der GPS-Position auf deinem Android-Gerät steht noch aus.
