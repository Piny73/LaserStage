# Build
mvn clean package && docker build -t timesheet/esame .

# RUN

docker rm -f esame || true && docker run -d -p 8080:8080 -p 4848:4848 --name esame timesheet/esame 

# System Test

Switch to the "-st" module and perform:

mvn compile failsafe:integration-test