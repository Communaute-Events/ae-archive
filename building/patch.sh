#!/bin/bash
# This file patches some dev environement things

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' 's/http:\/\/localhost:[0-9]*//g' svelte/index.html
else
    # Linux
    sed -i 's/http:\/\/localhost:[0-9]*//g' svelte/index.html
fi
echo -e "\x1b[32;1mPatched 'svelte/index.html\x1b[0m'"