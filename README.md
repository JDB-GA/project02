# Digital Wallet

Spring Boot (Java 17) REST API backed by PostgreSQL.

## Prerequisites

- Java 17+
- PostgreSQL running locally (default: `localhost:5432`)

## Setup

1. Create the database:

   ```bash
   createdb -U postgres digital-wallet
   ```

2. Copy the example config files and fill in your values:

   ```bash
   cp src/main/resources/application.properties.example src/main/resources/application.properties
   cp src/main/resources/application-dev.properties.example src/main/resources/application-dev.properties
   ```

   In `application-dev.properties`, set at least:
   - `spring.datasource.password` — your PostgreSQL password
   - `jwt-secret` — a random 256-bit hex string (`openssl rand -hex 32`)

   These files are gitignored; never commit real credentials.

## Run

```bash
./mvnw spring-boot:run
```

The API starts on http://localhost:8080.

To build a jar and run it:

```bash
./mvnw clean package
java -jar target/wallet-*.jar
```

## Test

```bash
./mvnw test
```
