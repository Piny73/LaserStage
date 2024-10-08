#!/bin/sh
mvn clean package && docker build -t timesheet/exame .
docker rm -f exame || true && docker run -d -p 8080:8080 -p 4848:4848 --name exame timesheet/exame 
