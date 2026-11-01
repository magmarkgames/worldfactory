WELTWERK v0.4.13 – Kartenebenen und Bodenkontakt

Installation: Die Datei index.html aus diesem ZIP ersetzt die bestehende index.html
im bisherigen WELTWERK-Projekt. Vorher den Spielstand unter „Mehr“ als JSON exportieren.

Aenderungen:
- Verbindliche Zeichenreihenfolge fuer Grundboden, Vegetation, Siedlungsflaechen,
  Wasser, Strassen und Gebaeude in der Canvas-Karte.
- Ein einheitliches Farbkonzept und getrennte Overlay-Schichten auch fuer die
  optionale MapLibre-Vektorkarte. Doppelte Basisflaechen werden dort ausgeblendet.
- 2D-Baum-, Stein- und Schrott-Sprites bekommen einen korrigierten Bodenanker.
- Schatten liegen dichter unter dem sichtbaren Sprite-Fuss.
- GPS, Sammelradius, Dropchancen, Buchen-Minigame, Inventar und Fabrik bleiben erhalten.

Geprueft: JavaScript-Syntax, 3 Handybreiten im Demo-Modus, Kameradrehung,
Kartenschicht-Reihenfolge in MapLibre-Mock. Online-Vektordaten und die tatsaechliche
Performance auf einem Android-Geraet konnten nicht vollstaendig getestet werden.
