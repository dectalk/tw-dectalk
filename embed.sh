#!/bin/sh
IFS=""
while read a; do
	if echo "$a" | grep 'EMBED DTC\.JS HERE' >/dev/null; then
		cat dtc.js
	else
		echo "$a"
	fi
done < dectalk.js > dectalk.offline.js
