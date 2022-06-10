#!/bin/bash
until curl -s -f -o /dev/null "http://localhost:3030"
do
  sleep 2
  echo " ui container not started yet"
done
echo "ui container is started"

