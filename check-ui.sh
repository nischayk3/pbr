#!/bin/bash
until curl -s -f -o /dev/null "http://nginx/mi"
do
  sleep 2
  echo " ui container not started yet"
done
echo "ui container is started"
DEBUG=code-coverage npm run cy:run
npx nyc report --reporter=text-summary
npx nyc report --reporter=text
npx nyc report --reporter=lcov
