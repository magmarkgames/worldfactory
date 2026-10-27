# WELTWERK v0.2.2 – Start-Fix (eine Datei)

Die Seite enthält **alle JavaScript- und CSS-Dateien sowie SVG-Grafiken direkt in `index.html`**.
Es gibt keine lokalen Imports oder erforderlichen Ordner mehr. So kann kein fehlender GitHub-Dateipfad den Spielstart verhindern.

**GitHub:** Bestehendes Repository öffnen → `index.html` auswählen → Stiftsymbol (Edit) oder „Add file → Upload files“ → die neue `index.html` hochladen/überschreiben → Commit changes. Die alte `app.js`, `styles.css` usw. dürfen liegen bleiben, werden aber nicht mehr verwendet. GitHub Pages muss weiter auf `main` + `/(root)` stehen.

**So funktioniert die Karte:**
1. Die **2.5D-Ersatzkarte** startet sofort und zeigt Demo-Figur, Rohstoffe, Sammlung und Speicherstände (auch wenn die Kartenbilder nicht geladen werden können).
2. Wenn die optionale 3D-Bibliothek, WebGL und die Vektordaten verfügbar sind, wechselt das Spiel automatisch auf die 3D-Ansicht.
3. Kartendaten (OpenStreetMap-Raster bzw. OpenFreeMap-Vektor) benötigen Internet. Bei blockierten Kacheln zeigt die Ersatzkarte trotzdem ein Raster und sammelbare Marker.
4. Bei einem neuen Spielstand startet ein Willkommensdialog; „Im Demo-Modus testen“ anklicken.

**Wichtig:** Alte Speicherstände verwenden weiterhin denselben `localStorage`-Schlüssel. Demo- und GPS-Inventare bleiben getrennt. Bestehende Spielstände vorher unter Mehr → Export sichern. GPS benötigt HTTPS und Standortfreigabe.

**Falls nach Update noch die alte Oberfläche erscheint:** GitHub Pages 1–2 Minuten veröffentlichen lassen, anschließend `?v=022` an die URL hängen oder Chrome-Tab neu öffnen. Unter Einstellungen muss v0.2.2 stehen.

**Hinweis:** Rohstoffpositionen werden noch rein virtuell berechnet. Sie sind nicht auf begehbare öffentliche Wege geprüft. Niemals für ein Spielobjekt Privatgrundstücke oder gefährliche Orte betreten.
