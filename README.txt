WELTWERK v0.4.0 — SÄGEWERK-INNENRAUM
======================================

Neu in dieser Version
--------------------
* Insel-Fabrik beibehalten: GPS-Karte, Demo-Modus, Sammelmechanik und normaler Rucksack bleiben bestehen.
* Sägewerk antippen → „Sägewerk betreten“ → eigenständige Halle mit 10×10-Raster.
* Gebäudelevel 1–4 erweitern die Halle in 5×5-Abschnitten:
  - Level 1: oben links (25 Felder)
  - Level 2: oben rechts (50 Felder)
  - Level 3: unten rechts (75 Felder)
  - Level 4: unten links (100 Felder)
* Bestehende Maschinen und Bänder bleiben beim Ausbau erhalten.
* Sägewerksfassade verändert sich je Level, weiterhin in einfacher Low-Poly-Grafik.
* Eingang und Ausgang können beim Bauen an freigeschalteten Außenwänden neu platziert werden.
* Eine Kreissäge nimmt 2×1 Felder ein (drehen/versetzen), ein Förderband genau 1 Feld.
* Start-Aufbau: 1 Säge Lv.1 + 1 bereits verlegtes Förderband, 4 zusätzliche Förderbänder inklusive.
* Weitere Förderbänder: je 1 Zweig; zusätzliche Säge Lv.1: 5 Holz + 3 Altmetall.
* Holz wird NUR nach expliziter Freigabe aus dem Rucksack entnommen. Ausgang liefert die fertigen Bretter ins Inventar.
* Sägen arbeiten unabhängig: Lv.1 60 s; Lv.2 50 s; Lv.3 40 s (3 Holz→2 Bretter); Lv.4 30 s (3 Holz→2 Bretter).
* Maschinenlevel sind unabhängig vom Gebäudelevel, aber durch dieses begrenzt. Upgrades kosten Materialien.
* Förderbänder bewegen Material im 2-Sekunden-Raster; blockierte Strecken stoppen den Materialfluss.
* Produktion pausieren/fortsetzen/abbrechen. Bereits fertige Waren bleiben erhalten, ungenutztes Holz wird zurückgebucht.
* Laufende, zuvor beauftragte Produktionsaufträge werden auch ohne geöffnete Innenansicht zeitbasiert weiterberechnet.
* Gleiches lokales Speicherformat wie zuvor; bestehende Gebäude und Rucksäcke werden übernommen.
* Verbesserte Tipppunkte für Gebäude auf der Insel; Drag-Pointer-Capture beginnt erst beim tatsächlichen Ziehen.

So testen
---------
1. Vor dem Update unter „Mehr“ den bisherigen Spielstand (JSON) exportieren!
2. Die Datei index.html dieser ZIP ersetzt die bisherige index.html im GitHub-Repository.
3. Neue Seite laden (gegebenenfalls Cache mit ?v=040 umgehen).
4. Demo starten, Tab „Fabrik“, dort „Testmaterial“ drücken.
   Das Testmaterial enthält jetzt auch Blätter und Zweige für das neue Sägewerk.
5. In der Bauleiste „Sägewerk“ auswählen, eine freie 2×2-Fläche angrenzend an die Hafenstraßen antippen und den Bau bestätigen.
6. Sägewerk antippen und „Sägewerk betreten“ wählen.
7. In „Produktion“ z. B. 2 Holz freigeben. Auf der Startlinie bewegt sich Holz über ein Band zur Säge.
8. Die Säge benötigt 60 Sekunden ab Materialannahme. Ein fertiges Brett erscheint erst nach dem Transport zum Ausgang unter „Rucksack → Hergestellte Waren“.
9. Unter „Bauen & umbauen“ weitere Förderbänder platzieren oder drehen, Maschinen verschieben, Eingänge und Ausgänge an Außenwände setzen.
10. Säge antippen (im Produktionsmodus), um ihren Fortschritt und ihre Level-Upgradeoptionen zu sehen.

Upgrade-Preise (vorläufiges Balancing)
--------------------------------------
Sägewerk bauen: 10 Holz, 6 Blätter, 4 Zweige
Gebäude Level 2: 12 Bretter, 8 Stein, 6 Holz
Gebäude Level 3: 12 Steinblöcke, 8 Metallplatten, 4 Harz
Gebäude Level 4: 12 Eisenerz, 8 Kupferdraht, 8 Metallplatten
Zusätzliche Säge Lv1: 5 Holz, 3 Altmetall
Maschine Lv2: 4 Bretter, 4 Altmetall
Maschine Lv3: 6 Metallplatten, 4 Steinblöcke
Maschine Lv4: 5 Eisenerz, 6 Kupferdraht

Einschränkungen / geplant
------------------------
* Förderband-Verteiler, Pufferlager, Feinsäge, weitere Produktionsrezepte und Layout-Baupläne sind noch NICHT enthalten.
* Steinmetz und Metallpresse arbeiten weiterhin wie in v0.3.1 (manuelle Einzelchargen); nur das Sägewerk hat bisher einen betretbaren Innenraum.
* Die Simulation benutzt bewusst eine schlanke Rasterlogik statt 3D-Physik. Ein Feld darf jeweils nur einen Transportgegenstand enthalten.
* Die Starteranlage ist absichtlich sehr einfach; mit zusätzlichen Maschinen und Förderbändern kannst du sie verändern.
* Beim Ausbau einer Halle kann sich der Warenausgang an die neue Außenwand verschieben. Alte Transportwege müssen dann eventuell verbunden werden.
* Der Bau einer Maschine verbraucht Rohstoffe; das Entfernen einer Säge gibt keine Baukosten zurück. Bandteile wandern in den Bandvorrat zurück.
* Getestet wurden Start, Pausieren, Abbrechen, mehrere Chargen, alle vier Gebäudelevel, alle vier Maschinenlevel, Ein-/Ausgang, Materialfluss und ein Speicher-/Lade-Durchlauf der Datenstruktur in Chromium. Ein Test auf deinem Android-Gerät ist zusätzlich wichtig.
* Basis ist der verfügbare Quellstand v0.3.1 (dessen Sammelbasis v0.2.20 war); eventuelle Detailänderungen einer nicht vorliegenden v0.2.23 können nicht garantiert enthalten sein.
* Demo und GPS haben separate Spielstände. Daten werden lokal im jeweiligen Browserprofil gespeichert. Bitte regelmäßig JSON-Backups anlegen.
* Für GPS benötigst du eine HTTPS-Umgebung und Standortberechtigung.

In dieser Version gibt es KEINE Zeitalter, KEINE Credits und KEINE Bauplan-Funktion.
