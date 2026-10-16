# buscador-fragmentos
Buscador de libros por fragmento textual: busca dentro del texto completo de una selección de obras de Project Gutenberg (español e inglés) con criterios conservadores de derechos para España. Demo en GitHub Pages. Los datos (corpus.json, index.json.gz, pack-N.json.gz) se generan a partir del catálogo de Project Gutenberg; ver la guía de la app.

## Textos de Wikisource (extensión)

Mecanismo preparado para obras de Wikisource en español (campo `u` en `corpus-ext.json`: enlace a la revisión exacta). Ahora mismo no hay ninguna incluida: `corpus-ext.json` e `index-ext.json` están vacíos; solo se añadirán con edición o fuente identificable. Si se añaden: ese texto lo transcriben voluntarios de Wikisource y está bajo CC BY-SA 4.0; los fragmentos de `ext/` son derivados de esas revisiones (solo troceado y normalización de espacios) y mantienen la misma licencia. Atribución: Wikisource contribuyentes, historial en el enlace `oldid` de cada obra. Criterios: obra escrita en español sin traductor, autor en Wikidata fallecido antes de 1946, sin `{{Con fuente}}`/«pendiente de migrar» ni «no corregido». No se ha verificado la edición concreta transcrita.
