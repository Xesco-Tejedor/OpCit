#!/usr/bin/env bash
# Prueba funcional de la APK publicada de OpCit en el emulador (WebView real, vía DevTools).
set -uo pipefail
APK="$1"; API="${2:-unknown}"
EV=evidence; mkdir -p "$EV"
V="$EV/veredicto-api${API}.txt"
{
  echo "== OpCit APK en emulador API $API =="
  adb install -r "$APK" 2>&1
  adb shell monkey -p es.xescotejedor.opcit -c android.intent.category.LAUNCHER 1 2>&1 | tail -1
  sleep 45
  adb exec-out screencap -p > "$EV/01-inicio.png" 2>/dev/null
  SOCK=$(adb shell cat /proc/net/unix | grep -o 'webview_devtools_remote_[0-9]*' | head -1)
  echo "socket: $SOCK"
  adb forward tcp:9222 "localabstract:$SOCK"
  (mkdir -p /tmp/cdp && cd /tmp/cdp && npm init -y >/dev/null 2>&1 && npm i ws >/dev/null 2>&1)
  NODE_PATH=/tmp/cdp/node_modules node .github/scripts/cdp.js
  adb exec-out screencap -p > "$EV/05-final.png" 2>/dev/null
  adb logcat -d | grep -iE 'FATAL|AndroidRuntime' | head -5
  echo "(fin)"
} 2>&1 | tee "$V"
# publicar evidencias en una rama aparte para poder inspeccionarlas
git config user.name "pruebas-android"; git config user.email "pruebas@users.noreply.github.com"
git checkout --orphan evidencias >/dev/null 2>&1 && git rm -rf --cached . >/dev/null 2>&1
git add -f evidence && git commit -qm "evidencias emulador $(date -u +%FT%TZ)" && git push -f origin HEAD:refs/heads/evidencias 2>&1 | tail -2
exit 0
