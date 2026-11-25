#!/bin/sh
IFS=""

cat dectalk.js | sed s/DECtalk/SharpVox/g | sed s/dectalk.js/sharpvox.js/g > sharpvox.js

while read a; do
	if echo "$a" | grep 'EMBED TTS\.JS HERE' >/dev/null; then
		cat dist/dectalk.js
		echo "embedded = true;"
	else
		echo "$a"
	fi
done < dectalk.js > dectalk.offline.js
while read a; do
	if echo "$a" | grep 'EMBED TTS\.JS HERE' >/dev/null; then
		cat dist/sharpvox.js
		echo "embedded = true;"
	else
		echo "$a"
	fi
done < sharpvox.js > sharpvox.offline.js
