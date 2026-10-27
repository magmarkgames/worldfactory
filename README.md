# WELTWERK · Exploration v0.1

Ein **spielbarer mobiler GPS-Sammelprototyp** als statische Website (HTML, CSS und JavaScript). Keine Build-Tools, kein Backend und keine Datenbank erforderlich.

> **WELTWERK** ist ein vorläufiger Projektname. Fabrik, Crafting, Credits, Handel und Multiplayer sind absichtlich **noch nicht** enthalten.

## Was ist enthalten?

- Eine echte zoombare Karte mit OpenStreetMap und Leaflet.
- Echte GPS-Ortung nach Freigabe (GPS-Modus) und frei steuerbarer Demo-Modus (Karte antippen oder vier Pfeiltasten).
- An festen geografischen Koordinaten reproduzierbar generierte Bäume, Steine und Schrottfundstellen.
- Interaktion innerhalb von ca. **60 Metern** plus kleiner GPS-Toleranz.
- Baum: 2–4 Holz, 20 % Bonus auf Harz.
- Stein: 2–4 Stein, 15 % Bonus auf Eisenerz.
- Schrott: 2–4 Altmetall, 15 % Bonus auf Kupferdraht.
- 10 % aller Fundstellen sind **reichhaltig** und liefern die doppelte Grundmenge.
- Erschöpfte Fundstellen regenerieren **60 Minuten nach Ernte**.
- Inventar, Statistik, Materiallexikon; Demo und GPS haben getrennte Speicherstände.
- Speicherung **nur lokal im Browser** mit `localStorage`, dazu JSON-Export, Import und Reset.
- Responsive Mobil-Design und einfache Installation als Website zum Startbildschirm.

## In 6 Schritten auf GitHub Pages veröffentlichen

1. Melde dich bei [github.com](https://github.com/) an. Oben rechts **+ → New repository**.
2. Repositoryname, z. B. `weltwerk`. Als **Public** anlegen; README/.gitignore **nicht zusätzlich erstellen**, da diese Dateien in diesem ZIP sind.
3. Öffne das neue Repository. Gehe zu **Add file → Upload files**.
4. **Entpacke das ZIP vorher**. Lade **den INHALT des Ordners `weltwerk-v0.1`** hoch (vor allem `index.html`, `app.js`, `game-logic.js`, `styles.css`, `assets/` und `manifest.webmanifest`). Die `index.html` muss direkt im Hauptverzeichnis liegen, **nicht in einem zusätzlichen Unterordner**. Unten auf **Commit changes** klicken.
5. Gehe zu **Settings → Pages**. Unter **Build and deployment** bei **Source** „Deploy from a branch“ auswählen, dann **Branch `main`**, Ordner **`/(root)`**, und **Save**.
6. Öffne deine Website unter `https://DEIN-NAME.github.io/weltwerk/`. Auf Android im Chrome-Menü kannst du **Zum Startbildschirm hinzufügen** wählen. GitHub Pages wird über HTTPS ausgeliefert; das wird für die Browser-GPS-Freigabe benötigt.

> GitHub Pages ist eine öffentlich erreichbare Website. Das Projekt enthält keine privaten Schlüssel oder Zugangsdaten. Der Spielstand liegt nur in deinem jeweiligen Browser, nicht im GitHub-Repository.

### Lokal am Computer starten

Der Browser sollte die Dateien über einen Webserver laden, nicht direkt per `file://`, da JavaScript-Module sonst blockiert werden können.

```bash
cd weltwerk-v0.1
python3 -m http.server 8080
```

Dann `http://localhost:8080` öffnen. Demo funktioniert sofort. Echtes Handy-GPS auf einer fremden HTTP-Adresse dagegen meist nicht: Dafür HTTPS (z. B. GitHub Pages) nutzen.

### Testen

```bash
node tests/logic.test.mjs
```

oder `npm test` (Node.js erforderlich, nur für die Tests). Das eigentliche Spiel braucht kein Node.js.

## Spielbedienung

1. **Demo-Modus** wählen, um ohne GPS zu spielen. Starte in einer Beispielregion; tippe einen anderen Ort auf der Karte an, um deinen Teststandort dorthin zu setzen. Nutze die Pfeiltasten oder am PC die Cursortasten für kleinere Schritte.
2. Auf einen Baum, Stein oder Schrottmarker tippen; die Fundliste und Entfernung sehen.
3. Innerhalb der Reichweite **Ressourcen sammeln** wählen.
4. Unter **Rucksack** Bestände sehen, unter **Sammlung** das Materiallexikon und Statistiken.
5. Für echtes GPS unter **Mehr → Echtes GPS** wechseln und Standortzugriff erlauben. Während du dich bewegst, ändert sich die Ressourcenregion.

## Wichtige Einschränkungen dieses frühen Prototyps

- **Die virtuellen Fundstellen sind nicht auf öffentliche Zugänglichkeit geprüft.** Sie sind bewusst nur reproduzierbar generiert; sie hängen in v0.1 noch nicht von Wälder-/Straßendaten, Wegerechten oder POIs ab. **Betritt niemals private oder gefährliche Bereiche**, um einen Spielpunkt zu erreichen. Ein Punkt kann oft aus sicherer Entfernung geerntet werden. Automatische sichere Positionierung (z. B. entlang tatsächlich begehbarer Wege mit Zugangskontrollen) wäre eine wichtige nächste Ausbaustufe.
- **Keine serverseitige Betrugsprävention.** GPS und lokale Speicherstände können manipuliert werden; v0.1 ist ausdrücklich nur ein Einzelspieler-Test. Für öffentliche Ranglisten wäre ein Backend notwendig.
- **Keine automatische Synchronisation zwischen Geräten.** Für Gerätewechsel JSON-Export und -Import verwenden.
- **Keine Offline-Karte**: Internetverbindung für Kartendaten und Leaflet von CDN erforderlich. Gespeicherte Inventare sind lokal vorhanden.
- Bei Standortfehlern oder schlechter Genauigkeit kann Sammeln im GPS-Modus eingeschränkt werden. Für erste Tests den Demo-Modus verwenden.
- Auf kleinen Spaziergängen können Ressourcen verschiedener Art unterschiedlich häufig erscheinen. Die Verteilung ist vorläufig und ohne biombasierte Regeln.

## Datenschutz und externe Dienste

Die Seite schickt deine GPS-Position **nicht an einen eigenen Server** und speichert keinen GPS-Verlauf. Sie lädt Kartenkacheln von OpenStreetMap; dabei sieht deren Dienst naturgemäß den angefragten **Kartenausschnitt und deine IP-Adresse**. Für den Code von Leaflet lädt der Browser einmalig eine externe Bibliothek. Demo-Position und Spielstände werden im lokalen Browser gespeichert. Exportierte JSON-Dateien gehören dir.

## Weitere Entwicklungsziele (noch nicht implementiert)

Biomabhängige Rohstoffe, öffentlich zugängliche POIs, bessere Ausrüstung, sichere Platzierung, weitere Materialtypen, Maschinenbau, Fabrik-Layouts, Crafting, Wirtschaft und Multiplayer.

## Technik und Lizenzen

- HTML5, CSS3, JavaScript Modules, `localStorage`, Geolocation API.
- Leaflet **1.9.4** von Unpkg.
- OpenStreetMap Standard-Kartenkacheln mit eingeblendeter Copyright-Angabe und Links.
- OpenStreetMap-Tile-Nutzungsbedingungen: https://operations.osmfoundation.org/policies/tiles/ . Nur für kleine Prototypentests gedacht; bei öffentlicher Nutzung mit vielen Besuchern einen geeigneten Kartenanbieter verwenden. Kein Vorab- oder Bulk-Download von Kacheln.

Keine externen Nutzeraccounts erforderlich.
