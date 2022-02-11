#!/bin/bash

ID="$1"
FQDN="http://127.0.0.1:8787"
curl -X POST $FQDN/webhook/$ID \
   -H 'Content-Type: application/json' \
   -d '{
  "name": "some.webhook.event",
  "data": {
    "some": "data",
    "here": 2
  }
}'