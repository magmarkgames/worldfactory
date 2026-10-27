# WELTWERK v0.2.9 – stabilere Karte und Collectibles

## Was wurde repariert?

- **Keine abgeschnittene Kartenfläche:** Statt eines festen 7×7-Kachelrechtecks werden die Kartenkacheln passend zur sichtbaren Perspektive gezeichnet. In der Ferne nutzt das Spiel gröbere Kartendaten, in der Nähe detailliertere.
- **Weniger Karten-Sprünge:** Bereits geladene Straßenkacheln werden beim Drehen wiederverwendet. Fehlende Kacheln verursachen keine harte rechteckige Kante mehr.
- **Stabilere Collectibles:** Die Ressourcen behalten ihre GPS-Koordinaten und dieselbe Größe beim Drehen. Sehr weit entfernte Vorkommen werden nicht mehr am Himmel dargestellt.
- **Sammeln:** Tippen auf eine nahe Fundstelle öffnet die Sammelansicht. Fundchance, Inventar und Regenerationszeit bleiben erhalten.
- **Kartenstatus:** Unten an der Karte siehst du „STRASSENKARTE“, „KARTE LÄDT“ oder „ERSATZLANDSCHAFT“. So ist erkennbar, ob echte Kartenkacheln angekommen sind.

## Installation auf GitHub Pages

1. ZIP entpacken.
2. In deinem bisherigen WELTWERK-Repository `Add file` → `Upload files` öffnen.
3. Die beiliegende `index.html` im **Hauptverzeichnis** hochladen und die alte Datei ersetzen.
4. Auf `Commit changes` tippen.
5. Nach dem GitHub-Pages-Update die Website mit `?v=029` neu öffnen und prüfen, ob oben **v0.2.9** steht.

**Wichtig:** Der Spielstand bleibt bei Verwendung derselben Website und desselben Browsers normalerweise erhalten. Sichere ihn vorher über „Mehr → Export“.

## Grenzen dieser Version

- Die Straßendaten benötigen eine Internetverbindung. Ohne erfolgreich geladene Kartenkacheln erscheint eine vereinfachte Ersatzlandschaft – das ist keine echte Straßenkarte.
- Wir zeigen eine perspektivische **2.5D**-Welt mit Himmel; echte dreidimensionale Gebäude sind noch nicht Teil dieser Version.
- Die virtuellen Fundstellen sind nicht auf sichere öffentliche Zugänglichkeit geprüft. Bitte keine Privatgrundstücke, Fahrbahnen oder gefährlichen Orte betreten und nicht während des Fahrens spielen.
- Die lokale Projektversion wurde im simulierten mobilen Browser geprüft; echte GPS- und Netzwerktests auf deinem Android-Gerät stehen noch aus.
- Die Nutzung öffentlicher OpenStreetMap-Kartenkacheln ist nur für Entwicklung und kleinere Tests gedacht. Eine größere Veröffentlichung braucht einen dafür geeigneten Kartenanbieter oder eigene Kachelinfrastruktur.
