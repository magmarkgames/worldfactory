# WELTWERK v0.3.0 — Die erste Fabrikinsel

**Spielbare erste Insel-Aufbauversion** im Stil klassischer Aufbau- und Wirtschaftsspiele. Noch ohne Einwohner, Handel und Multiplayer.

## Was neu ist

- **Fabrik** als fünfter Tab neben Welt, Rucksack, Sammlung und Mehr.
- **Eigene Insel** mit stilisierter isometrischer Ansicht, Wasser, Küste, Bäumen und freier Baufläche.
- **Hafenlager** und ein erstes Netz aus verbundenen Straßen.
- **Straßen** auf einzelnen Feldern bauen und entfernen.
- **Sägewerk, Steinmetz und Metallpresse** auf dem Inselraster bauen, verschieben, drehen, pausieren und abreißen.
- **Vorschau mit Bau-Bestätigung**: Im Baumenü Gebäude wählen, freie Fläche antippen, dann „Gebäude bauen“ bestätigen.
- **Produktionsketten mit echtem Inventar**: Rohstoffe werden beim Start einer Charge entnommen. Nach einer festen Zeit landen die Produkte im Rucksack. Bei genügend Nachschub läuft die Produktion automatisch weiter.
- **Straßenanbindung zählt**: Nur Betriebe mit Verbindung zum Hafen können neue Produktionschargen starten.
- **Offline-Fortschritt**: Bei erneutem Öffnen wird verstrichene Produktionszeit verarbeitet, sofern die Materialien reichen.
- **Persistenz**: Neue Fabrikdaten werden gemeinsam mit deinem bisherigen Demo- bzw. GPS-Profil lokal gespeichert, inklusive Export und Import als JSON.
- **Demo-Testpaket**: Im Demo-Modus lassen sich zum Testen Rohstoffe hinzufügen. Im GPS-Modus gibt es keinen Testpaket-Button.

## Die ersten Rezepte

| Gebäude | Baukosten | Laufende Verarbeitung | Dauer je Ware |
|---|---|---|---|
| Straße | 1 Stein | Verbindet Betriebe mit Hafen | — |
| Sägewerk | 4 Holz + 2 Stein | 2 Holz → 1 Brett | 15 Sek. |
| Steinmetz | 4 Stein + 2 Holz | 2 Stein → 1 Steinblock | 20 Sek. |
| Metallpresse | 5 Altmetall + 3 Stein | 2 Altmetall → 1 Metallplatte | 25 Sek. |

Baukosten und Zeiten sind bewusst **erste Balancing-Werte**, die wir mit Spielerfahrung anpassen.

## Kurzer Funktionstest

1. `index.html` in einem Browser öffnen bzw. als GitHub-Pages-Website starten.
2. Im Startfenster „Im Demo-Modus testen“ wählen.
3. Unten **Fabrik** wählen und **Testmaterial** hinzufügen.
4. **Sägewerk** antippen, ein freies Feld direkt neben einer bereits verbundenen Straße wählen und **Gebäude bauen** drücken.
5. Sägewerk antippen: Der Produktionsstatus und die Verarbeitungszeit erscheinen.
6. Einige Sekunden später sind Bretter im Lager und im Rucksack zu sehen. Weitere Gebäude und Straßen ausprobieren.

Tipp: Mit dem Finger die Insel verschieben, mit `+` und `−` zoomen. Der Zentrieren-Button stellt die ursprüngliche Ansicht wieder her.

## Aktualisieren (GitHub Pages)

1. **Vorher unbedingt deinen aktuellen Spielstand exportieren**: Mehr → Export (JSON).
2. Die `index.html` aus dieser ZIP in deinem Repository im Hauptverzeichnis anstelle der bisherigen Datei hochladen.
3. Änderungen committen und deine Seite aktualisieren (ggf. mit `?v=0300`).
4. Oben muss **V0.3.0** stehen und unten der neue Tab **Fabrik** erscheinen.
5. Bestehende Spielstände sollten über den unveränderten Speicher-Schlüssel übernommen werden. Importiere ggf. den zuvor gesicherten JSON-Spielstand.

## Wichtig zum zugrundeliegenden Projektstand

Die hier zugängliche vollständige WELTWERK-Quelldatei war **v0.2.20**. Für v0.3.0 wurden die aus der späteren v0.2.23-Konzeption bekannten Werte ebenfalls berücksichtigt: **30 m Sammelradius**, **Startzoom bis 20,5**, ungefähr **2,5-fache Fundstellendichte** unter Erhalt der ursprünglichen Fundstellen-IDs, mindestens 18 m Abstand für die zusätzlichen Fundstellen in einer Rasterzelle und **60 Minuten Regeneration**. Auch die später vereinbarten Baum-Bonuschancen wurden angeglichen. Ohne den Original-Quellstand von v0.2.23 können aber weitere dort enthaltene Detailänderungen nicht garantiert vollständig übernommen werden. Deshalb **vor einem Ersatz unbedingt sichern**.

Es werden keine externen Bibliotheken für die Insel gebraucht; die bisherige GPS-Karte lädt weiterhin öffentliche Kartendaten, sofern verfügbar. Standortverläufe werden nicht gespeichert.

## Bewusste Grenzen dieser ersten Version

- Kein Wohnbau, keine Einwohner, kein Handel und keine Währung.
- Nur eine kleine Insel und drei Produktionsgebäude.
- Alle Rohstoffe liegen im gemeinsamen Hafenlager, keine einzelnen Lieferkarren.
- Die Produktionslogik ist prototypisch lokal und noch nicht gegen manipulierte Gerätezeiten geschützt.
- Auf GPS-Fundstellen nur von sicheren, erlaubten Orten zugreifen; die generierten Rohstoffpositionen sind keine geprüften Wege.
