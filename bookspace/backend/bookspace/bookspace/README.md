# Build
mvn clean package && docker build -t lsgf/bookspace .

# RUN

docker rm -f bookspace || true && docker run -d -p 8080:8080 -p 4848:4848 --name bookspace lsgf/bookspace 

# System Test

Switch to the "-st" module and perform:

mvn compile failsafe:integration-test