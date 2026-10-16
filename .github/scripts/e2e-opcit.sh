#!/usr/bin/env bash
# Prueba funcional de la APK publicada de OpCit en el emulador del runner.
set -uo pipefail
APK="$1"; API="${2:-unknown}"
EV=evidence; mkdir -p "$EV"
V="$EV/veredicto-api${API}.txt"
shot() { adb exec-out screencap -p > "$EV/$1.png" 2>/dev/null; }
{
  echo "== OpCit APK en emulador API $API =="
  adb install -r "$APK" 2>&1
  adb logcat -c
  adb shell monkey -p es.xescotejedor.opcit -c android.intent.category.LAUNCHER 1 2>&1
  sleep 60
  shot 01-inicio
  adb shell wm size
  echo "== sockets devtools =="; adb shell cat /proc/net/unix | grep -i devtools || echo "sin socket devtools"
  echo "== WebView =="; adb shell dumpsys webviewupdate | head -12
  # tocar el campo de busqueda (ajustado tras ver la captura) y buscar
  W=$(adb shell wm size | grep -oE '[0-9]+x[0-9]+' | tail -1); SW=${W%x*}; SH=${W#*x}
  echo "tap campo busqueda en ${QX:-$((SW/2))},${QY:-$((SH*30/100))}"
  adb shell input tap "${QX:-$((SW/2))}" "${QY:-$((SH*30/100))}"; sleep 2
  adb shell input text "amor"; sleep 1
  adb shell input keyevent 66
  sleep 45
  shot 02-busqueda
  echo "== consola WebView =="
  adb logcat -d | grep -iE 'chromium|CONSOLE|FATAL|AndroidRuntime|WebView' | tail -60
  echo "(fin)"
} 2>&1 | tee "$V"
