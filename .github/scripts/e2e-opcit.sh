#!/usr/bin/env bash
# Prueba de instalación y arranque de la APK publicada de OpCit en el emulador del runner.
set -u
APK="$1"; API="${2:-unknown}"
EV=evidence; mkdir -p "$EV"
V="$EV/veredicto-api${API}.txt"
{
  echo "== OpCit APK en emulador API $API =="
  echo "== Instalación =="
  adb install -r "$APK" 2>&1
  echo "== Arranque de la actividad =="
  adb shell monkey -p es.xescotejedor.opcit -c android.intent.category.LAUNCHER 1 2>&1
  echo "esperando la carga de la web en el WebView..."
  sleep 50
  adb exec-out screencap -p > "$EV/pantalla-api${API}.png" 2>&1
  adb shell uiautomator dump "/sdcard/ui-api${API}.xml" 2>&1
  adb shell cat "/sdcard/ui-api${API}.xml" > "$EV/ui-api${API}.xml" 2>&1
  if grep -q 'OpCit' "$EV/ui-api${API}.xml"; then echo "UI: pantalla contiene 'OpCit' = SI"; else echo "UI: pantalla contiene 'OpCit' = NO"; fi
  if grep -q 'Corpus listo' "$EV/ui-api${API}.xml"; then echo "UI: corpus cargado = SI"; else echo "UI: corpus cargado = NO"; fi
  echo "== Excepciones fatales =="
  adb logcat -d 2>/dev/null | grep -i 'FATAL EXCEPTION' | head -5
  echo "(fin)"
} 2>&1 | tee "$V"
