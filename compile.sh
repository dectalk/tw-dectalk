#!/bin/sh
emcc -o dtc.js dtc.c \
  -I ../dectalkmini/include \
  ../dectalkmini/build/libdtc.a \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s EXPORTED_FUNCTIONS='["_speak_init", "_speak", "_free"]' \
  -s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall", "stringToNewUTF8", "HEAP16", "addFunction"]' \
  -s MODULARIZE=1 \
  -s ALLOW_TABLE_GROWTH=1 \
  -s EXPORT_NAME="DECtalkMini" 
