FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/chatApp-0.0.1-SNAPSHOT.jar chatApp.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","chatApp.jar"]