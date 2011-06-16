#!/bin/bash

if [ ! -x "$MONGO_PATH/bin/mongod" ]; then
    echo "Did you set MONGO_PATH correctly?"
    exit
fi

mkdir -p data
$MONGO_PATH/bin/mongod --dbpath data
