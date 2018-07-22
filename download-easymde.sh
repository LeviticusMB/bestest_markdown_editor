#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <easymde-version>"
    exit 64
fi

version="$1"

curl -L -o assets/stylesheets/easymde.css https://raw.githubusercontent.com/Ionaru/easy-markdown-editor/2.2.2/dist/easymde.min.css
curl -L -o assets/javascripts/easymde.js  https://raw.githubusercontent.com/Ionaru/easy-markdown-editor/2.2.2/dist/easymde.min.js
