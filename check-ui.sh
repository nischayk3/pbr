#!/bin/bash
until curl -s -f -o /dev/null "http://localhost"
do
  sleep 2
  echo " ui container not started yet"
done
echo "ui container is started"

