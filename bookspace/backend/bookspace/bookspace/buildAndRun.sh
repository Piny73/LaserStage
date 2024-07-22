#!/bin/sh
mvn clean package && docker build -t lsgf/bookspace .
docker rm -f bookspace || true && docker run -d -p 8080:8080 -p 4848:4848 --name bookspace lsgf/bookspace 
