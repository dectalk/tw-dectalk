#!/bin/sh

IFS=""
while read a; do
	if echo "$a" | grep "EMBED WASM STUFF HERE"; then
		cat dtc.js
		echo "embedded = 1;"
	else
		echo "$a"
	fi
done < main.js > dectalk.js
