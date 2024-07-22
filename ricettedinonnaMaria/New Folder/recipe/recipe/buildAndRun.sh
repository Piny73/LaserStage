#!/bin/sh
mvn clean package && docker build -t lsgf/recipe .
docker rm -f recipe || true && docker run -d -p 8080:8080 -p 4848:4848 --name recipe lsgf/recipe 
