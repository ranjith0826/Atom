# ResilienceOS Setup & Deployment Guide

---

## 1. Prerequisites
- **Java**: OpenJDK 21 LTS (or use the pre-packaged `tools\jdk-21` runtime)
- **Maven**: Apache Maven 3.9+ (or use the pre-packaged `tools\maven` runtime or `mvnw.cmd`)
- **Node.js**: v20+ with npm
- **Docker & Docker Compose** (for production PostgreSQL/PostGIS/Neo4j deployment)

---

## 2. Quickstart Local Development (Zero External Dependencies)

ResilienceOS is designed to run locally out-of-the-box with zero database setup required, thanks to an automatic in-memory H2 database fallback with identical PostgreSQL compatibility.

### Step 1: Start the Java Spring Boot Backend
Open a terminal in the project root:
```bash
# Using the pre-configured Maven wrapper
.\mvnw.cmd spring-boot:run

# Or run the pre-built fat JAR directly:
.\tools\jdk-21\bin\java.exe -jar backend\target\resilienceos-backend-1.0.0.jar
```
The backend starts on `http://localhost:8080`.
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Health Probe: `http://localhost:8080/actuator/health`
- H2 Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:resilienceos`)

### Step 2: Start the React Frontend
In a second terminal:
```bash
cd frontend
npm run dev
```
Open `http://localhost:3000` in your browser.
The frontend automatically connects to `http://localhost:8080` via Vite reverse proxy.

---

## 3. Production Deployment with Docker Compose

To run the full stack with PostgreSQL, PostGIS, Neo4j, Redis, and Kafka:
```bash
cd infrastructure
docker-compose up --build -d
```
All services will start up with automated health checks:
- Frontend: `http://localhost:3000`
- Spring Boot Backend: `http://localhost:8080`
- Neo4j Browser: `http://localhost:7474`
- PostgreSQL / PostGIS: `localhost:5432`
- Redis: `localhost:6379`
- Kafka: `localhost:9092`

---

## 4. Running Tests
To run all backend unit and integration tests:
```bash
.\mvnw.cmd test
```

To run frontend TypeScript and production asset build:
```bash
cd frontend
npm run build
```
