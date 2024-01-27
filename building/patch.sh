#!/bin/bash
# This file patches some dev environement things

sed -i '' 's/http:\/\/localhost:[0-9]*//g' svelte/index.html
echo -e "\x1b[32;1mPatched 'svelte/index.html\x1b[0m'"
rm -rf dist/*