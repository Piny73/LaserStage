# Build
mvn clean package && docker build -t timesheet/exame .

# RUN

docker rm -f exame || true && docker run -d -p 8080:8080 -p 4848:4848 --name exame timesheet/exame 

# System Test

Switch to the "-st" module and perform:

mvn compile failsafe:integration-test