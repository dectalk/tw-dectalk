#!/bin/sh
emcc -o dist/dectalk.js tts.c \
  -I ../dectalkmini/include \
  ../dectalkmini/build/libdtc.a \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s EXPORTED_FUNCTIONS='["_speak_init", "_speak", "_free"]' \
  -s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall", "stringToNewUTF8", "HEAP16", "addFunction"]' \
  -s MODULARIZE=1 \
  -s ALLOW_TABLE_GROWTH=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORT_NAME="TTS"

emcc -o dist/sharpvox.js tts.c \
  -I ../sharpvoxtts/include \
  -I ../sharpvoxtts/platform/lib \
  ../sharpvoxtts/build/libsharpvox.a \
  -DSHARPVOX \
  -s WASM=1 \
  -s SINGLE_FILE=1 \
  -s EXPORTED_FUNCTIONS='["_speak_init", "_speak", "_free"]' \
  -s EXPORTED_RUNTIME_METHODS='["cwrap", "ccall", "stringToNewUTF8", "HEAP16", "addFunction"]' \
  -s MODULARIZE=1 \
  -s ALLOW_TABLE_GROWTH=1 \
  -s ALLOW_MEMORY_GROWTH=1 \
  -s EXPORT_NAME="TTS" 
