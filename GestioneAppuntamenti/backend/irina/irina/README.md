# Build
mvn clean package && docker build -t lsgf/irina .

# RUN

docker rm -f irina || true && docker run -d -p 8080:8080 -p 4848:4848 --name irina lsgf/irina 

# System Test

Switch to the "-st" module and perform:

mvn compile failsafe:integration-test