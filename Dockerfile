FROM   openjdk:21
EXPOSE 8080

COPY backend/target/Todo1.jar Todo1.jar

ENTRYPOINT ["java", "-jar", "Todo1.jar"]