#!/bin/bash

# We build the wallet each time we run the docker and it takes a couple of minutes
yarn build

cp -r /revpop-ui/build/dist/* /var/www/

nginx -g "daemon off;"
