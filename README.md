# WELTWERK v0.2 — 3D-Exploration

**Spielbarer mobiler GPS-Rohstoffsammel-Prototyp.** Echte geneigte Karte mit 3D-Gebäuden, kleine Low-Poly-Bäume, Steine, Schrottfundstellen und eine eigene Spielfigur. Alles in einem einzigen flachen Verzeichnis — **keine Ordner**.

> Die Fabrik, Crafting, Echtgeld, Accounts und Multiplayer kommen absichtlich **noch nicht**. Zuerst testen wir, ob das Erkunden funktioniert und Spaß macht.

## Was ist neu in v0.2?

- **MapLibre GL JS** statt Leaflet: interaktive Karte mit Perspektive (**55° Neigung**), Drehung, Zoom, echten **3D-Gebäuden** aus OpenStreetMap-Daten, sofern vorhanden.
- **Helle 2.5D-Spieloptik:** Eigene kleine grafische Bäume, Steine, Schrott und Spielfigur (SVG-Illustrationen). Sie wirken räumlich, sind aber noch **keine frei begehbaren 3D-Modelle**.
- Neue Kameraschaltflächen: `3D / 2D` wechseln, ↻ drehen, Standort zentrieren, + / − zoomen. Auf dem Handy kannst du die Karte auch mit Gesten drehen/neigen.
- Bewährte Sammellogik aus v0.1 erhalten: reproduzierbare Ressourcenpositionen, Dropchancen, 60 Minuten Regeneration, Inventar, Lexikon, Demo- und GPS-Modus mit separaten Speicherständen.
- **Flache Struktur:** Keine `assets/`- oder `tests/`-Ordner. Auch die Bildpfade im HTML/JavaScript sind darauf angepasst.
- Gespeicherte v0.1-Daten werden weiter erkannt, wenn du die neue Version auf derselben Web-Adresse veröffentlichst (gleicher lokaler Browser-Speicherschlüssel). Zur Sicherheit vorher unter **Mehr → Export** sichern!

## Diese Dateien stehen alle auf derselben Ebene

```text
index.html              ← STARTSEITE
app.js                  ← Karte, GPS, UI, Inventar
styles.css              ← Design
game-logic.js          ← Fundstellen, Loot, Speicherung
logo.svg                ← Logo
avatar.svg              ← Spielfigur
tree.svg                ← Baum
rock.svg                ← Steinvorkommen
scrap.svg               ← Schrott
manifest.webmanifest    ← Handy-Startbildschirm
README.md               ← Diese Anleitung
logic.test.mjs          ← Optionale Logiktests
package.json            ← Optionale Node-Testbefehle
```

Alle Namen ohne Leerzeichen/Einrückung: `game-logic.js` und `rock.svg`. Du musst **keinen Ordner hochladen**.

## Auf GitHub hochladen — am Handy oder PC

1. ZIP-Datei herunterladen und **entpacken**.
2. GitHub öffnen: https://github.com/new
3. Repositoryname `weltwerk` oder `weltwerk-3d`, Sichtbarkeit **Public**, dann **Create repository**.
4. **Add file → Upload files** auswählen. **Alle einzelnen Dateien** aus dem ZIP markieren und hochladen. Keinen zusätzlichen Ordner erstellen. Insbesondere muss `index.html` direkt im Hauptverzeichnis sein.
5. Ganz unten **Commit changes** drücken.
6. Unter **Settings → Pages** die Option **Deploy from a branch**, Branch **main**, Verzeichnis **/(root)**, dann **Save**.
7. Die veröffentlichte Website ist typischerweise `https://DEIN-NAME.github.io/weltwerk/` (falls das Repo `weltwerk` heißt). Du findest die echte Adresse auch unter **Settings → Pages**.
8. In Chrome auf Android öffnen und bei Bedarf **Zum Startbildschirm hinzufügen**.

Du kannst auch dein **bestehendes Weltwerk-Repository** weiterverwenden: einfach die neuen Dateien mit denselben Namen hochladen und überschreiben. Frühere Dateien im Unterordner `assets/` sind danach nicht mehr erforderlich. Alle Verweise zeigen direkt auf die Dateien im Root.

### So testest du

- Starte im **Demo-Modus**. Tippe auf die Karte, um deinen Teststandort zu versetzen, oder nutze die Pfeiltasten im Spiel.
- Tippe auf einen grafischen Baum/Stein/Schrotthaufen, sieh die möglichen Drops und sammle innerhalb der Reichweite.
- Unter **Rucksack** und **Sammlung** werden neue Materialien und Statistiken angezeigt.
- Teste **3D / 2D**, ↻ und Standort-Zentrierung.
- Unter **Mehr → Echtes GPS** Standortfreigabe erlauben und bei einem Spaziergang testen (nur auf sicher zugänglichen Orten!).
- Lokal: `python3 -m http.server 8080` im Projektverzeichnis starten und `http://localhost:8080` aufrufen. **GPS auf dem Handy benötigt HTTPS**, also z. B. GitHub Pages.
- Technische Logiktests: `npm test` (Node.js erforderlich, nicht zum Spielen).

## Wichtige Einschränkungen

- **3D** bezieht sich auf Kameraperspektive und extrudierte Gebäude; die Ressourcen/der Avatar sind absichtlich leichte **2.5D-SVG-Grafiken**. Das ist performant und für v0.2 ausreichend. Kein vollständiges Minecraft-Earth-3D-Modellsystem.
- **MapLibre benötigt WebGL.** Auf manchen älteren Geräten oder mit deaktivierter Grafikbeschleunigung kann die Karte nicht angezeigt werden.
- Ressourcenstandorte sind deterministisch, aber **nicht aus sicheren Wegen oder echten Bäumen abgeleitet**. Sie können sich auf Privatgrundstücken, Fahrbahnen oder anderen unzugänglichen Flächen befinden. **Niemals einen unsicheren Ort betreten, um zu sammeln!** Das Platzieren auf überprüft zugänglichen öffentlichen Orten ist ein wichtiges nächstes Entwicklungsziel.
- Grundrohstoffe werden nach Spielregeln zufällig vergeben, die Fundstellen sind noch unabhängig von realen Biomen, ebenso wenig gibt es POIs oder Fabrik.
- Für die Karte wird eine Internetverbindung benötigt: MapLibre wird von unpkg geladen, Kartenstile/Kacheln von [OpenFreeMap](https://openfreemap.org/). Dabei erfahren diese Drittanbieter technisch bedingt angefragte Kartenausschnitte und deine IP. Eigene Server zum Speichern der GPS-Position gibt es nicht; es wird kein Standortverlauf gespeichert.
- Spielstände liegen **lokal im selben Browser**, keine Accounts/Gerätesynchronisierung. JSON-Export/Import unter **Mehr** nutzen. Für spätere Ranglisten brauchen wir ein Backend.
- In GPS-Modus wird bei sehr ungenauem Signal oder schneller Fortbewegung das Sammeln vorübergehend verhindert.

## Technik und Datenquellen

- HTML, CSS, JavaScript ES Modules — **kein Build-Vorgang und keine Installation** nötig.
- MapLibre GL JS 5.12.0: https://maplibre.org/maplibre-gl-js/docs/
- OpenFreeMap Bright-Stil und Vektorkacheln: https://openfreemap.org/quick_start/
- Kartendaten © OpenStreetMap-Mitwirkende (Attribution erscheint auch unten in der Karte).
- SVG-Grafiken im ZIP eigens für diesen Prototyp erstellt.
