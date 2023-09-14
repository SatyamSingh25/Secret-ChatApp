FROM openjdk:17.0.1-jdk-slim
VOLUME /tmp
COPY target/*.jar chatApp.jar
ENTRYPOINT ["java","-jar","/chatApp.jar"]
EXPOSE 8080