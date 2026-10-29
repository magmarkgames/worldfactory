# WELTWERK v0.3.1 – Produktionssteuerung & Inselansicht

Diese Version überarbeitet die erste spielbare Fabrikinsel anhand des Feedbacks zur v0.3.0. Die GPS-Sammelkarte bleibt Bestandteil der App. Für die Fabrik werden keine externen Bibliotheken benötigt.

## Die fünf Verbesserungen

1. **Sichtbarer Timer:** Sägewerk (15 s), Steinmetz (20 s), Metallpresse (25 s) zeigen Rezept, Materialbedarf, verstrichene Zeit und Fortschrittsbalken. Gebäude antippen, um den Status zu sehen.
2. **Manuelle Materialzufuhr:** Ein neu gebautes Gebäude startet **nicht** automatisch. Tippe das Gebäude an und wähle **„Material einsetzen & starten“**, um genau eine Charge aus deinem Rucksack einzusetzen. Nach Fertigstellung wird nicht automatisch die nächste Charge begonnen.
3. **Alles im Rucksack:** Fertige Bretter, Steinblöcke und Metallplatten landen nach Fertigstellung im vorhandenen Rucksack im neuen Abschnitt **„Hergestellte Waren“**. GPS- und Demo-Rucksack bleiben wie zuvor voneinander getrennt.
4. **Anhalten & Abbrechen:** **„Anhalten“** stoppt die Uhr; **„Fortsetzen“** setzt bei derselben Restzeit fort (Straßenanbindung nötig). **„Abbrechen · Material zurück“** beendet die Charge sofort und erstattet die eingesetzten Rohstoffe. Auch beim Abriss laufender Gebäude werden eingelegte Rohstoffe zurückgebucht.
5. **Flüssigeres Ziehen & bessere Sicht:** Das Verschieben nutzt gedrosselte Bildschirmaktualisierung statt vieler unnötiger Layoutberechnungen. Gebäude und Bäume sind niedriger; mit der Taste **▦** rechts in der Inselansicht kannst du alle Gebäude als flache Grundrisse darstellen. Beim Bauen wird diese flache Ansicht automatisch verwendet.

## Update

1. Vorher in **Mehr → Export (JSON)** einen Spielstand sichern.
2. Die neue `index.html` ins Hauptverzeichnis des bisherigen GitHub-Repositories kopieren und die alte Datei ersetzen. Keine weiteren Dateien nötig.
3. Änderungen committen und die Website aktualisieren. Falls die alte Seite im Browsercache hängt, `?v=031` an die URL anhängen.
4. Im **Demo-Modus** den Tab **Fabrik** öffnen und **Testmaterial** hinzufügen.
5. Sägewerk bauen, danach den neu geöffneten Gebäude-Dialog benutzen, um Holz bewusst einzusetzen und die Produktion zu starten.
6. Nach einer abgeschlossenen Charge auf **Rucksack → Hergestellte Waren** gehen.

## Speicherung & Abwärtskompatibilität

- Der vorhandene lokale WELTWERK-Speicherschlüssel `weltwerk-exploration-save-v1` bleibt unverändert.
- Gebäude, begonnene und pausierte Produktionschargen und fertige Waren werden zusammen mit dem bestehenden Spielstand gespeichert.
- Die Umstellung verarbeitet eine aus v0.3.0 möglicherweise bereits laufende Produktionscharge **ein einziges Mal**, beginnt danach aber keine neue automatisch. Vorhandene Rohstoffe werden nicht rückwirkend zurückgebucht.
- Alle Produktionsdaten werden weiterhin lokal im Browser gespeichert; für die GPS-Karte werden ggf. öffentliche Kartendienste geladen.

## Grenzen der Version

- Die Fabrik besitzt nur Sägewerk, Steinmetz und Metallpresse, noch keine Bewohner oder Handel.
- Ein Auftrag stellt genau **eine** Ware her; eine Warteschlange und automatisierte Zulieferung können später folgen.
- Performance wurde für Smartphone-Bildschirmgröße im Browser getestet; sie kann je nach Gerät und Browser variieren.
- Grundlage ist die im Projekt vorhandene v0.3.0-Version, die ihrerseits auf dem vollständigen v0.2.20-Quellstand beruhte. Nicht verfügbare Detailänderungen aus v0.2.23 können weiterhin nicht garantiert übernommen werden.
