#!/bin/bash
# This file patches some dev environement things

sed -i '' 's/http:\/\/localhost:[0-9]*//g' svelte/index.html