#!/bin/sh
mvn clean package && docker build -t lsgf/irina .
docker rm -f irina || true && docker run -d -p 8080:8080 -p 4848:4848 --name irina lsgf/irina 
