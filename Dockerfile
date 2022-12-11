FROM openjdk:18

COPY build/libs/StoliceSwiata-1.0.jar StoliceSwiata-1.0.jar

ENTRYPOINT ["java", "-jar", "/StoliceSwiata-1.0.jar"]