# WELTWERK v0.2.21 – Baum-Balancing

Diese Version übernimmt alle Funktionen aus v0.2.20 und ändert gezielt die Dropchancen der Baum-Sammelszene.

## Neue Dropchancen

### Stamm (je drei Punkte; pro Punkt 1 Holz garantiert)
- Kein Bonus 90 %
- Pilz 7 %
- Harz 3 %

### Zweige (3 Punkte + weitere 3 mit 50 %; je 1 Zweig garantiert)
- Kein Bonus 35 %
- Blatt 50 %
- Tannenzapfen 8 %
- Apfel 2 %
- Birne 2 %
- Kirsche 2 %
- Besonderer Samen 1 % (neues Material im Rucksack/Lexikon)

### Seltene Ereignisse (je Baum)
- Eichhörnchen 1,5 %, separat von den Stammwürfen
- Bienennest 1 %
- Vogelnest 1 %
- Kein Nest 98 %

Nester sind gegenseitig ausgeschlossen und haben je zwei Fundplätze: der erste garantiert Honig bzw. eine Feder; der zweite hat die bisherigen zufälligen Nest-Dropchancen.

### Unverändert
- Reichhaltige Fundstellen 10 %, doppelte Menge an Grundmaterialien.
- Regeneration 60 Minuten.
- Stein- und Schrott-Dropchancen unverändert.
- Bereits erzeugte, noch nicht abgeschlossene Baumszenen werden nicht neu ausgewürfelt.
- GPS, Demo, Karte, Sammelradius, Inventar, Export/Import und Speicherstand-Schlüssel unverändert.

## GitHub Pages aktualisieren

1. ZIP herunterladen und entpacken.
2. Nur `index.html` in das Hauptverzeichnis des bisherigen GitHub-Repositories hochladen und die bestehende Datei ersetzen.
3. Änderungen committen.
4. Website mit `?v=0221` am Ende öffnen; oben sollte `V0.2.21` stehen.

## Prüfung

JavaScript-Syntax geprüft; 150.000 generierte Bäume statistisch getestet; mobile Browserinteraktion für Teilsammeln, Wiederöffnung, Komplett-Ernte und Sonderfunde geprüft. Ein Live-Test mit echtem GPS auf Android steht noch aus.
