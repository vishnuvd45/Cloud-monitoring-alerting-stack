#!/usr/bin/env bash
set -euo pipefail
CONTAINER_NAME="sample-monitored-service"
STATUS=$(docker inspect -f '{{.State.Status}}' "$CONTAINER_NAME" 2>/dev/null || echo "missing")
if [[ "$STATUS" != "running" ]]; then
  echo "[$(date)] $CONTAINER_NAME is $STATUS. Restarting..."
  docker start "$CONTAINER_NAME"
else
  echo "[$(date)] $CONTAINER_NAME is healthy."
fi
