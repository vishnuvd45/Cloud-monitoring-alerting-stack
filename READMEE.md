# Cloud Monitoring & Alerting Platform

This project is a monitoring stack built with Prometheus, Grafana, Alertmanager, Node Exporter, and cAdvisor running on Docker Compose.

The goal was to learn how application and infrastructure monitoring works in a real environment, including service health checks, metrics collection, alerting, and basic self-healing.

## What I Built

* Dockerized monitoring environment
* Prometheus for metrics collection
* Grafana dashboards for visualization
* Alertmanager for alert routing
* Node Exporter for host metrics
* cAdvisor for container metrics
* PowerShell and Bash scripts for service recovery
* GitHub Actions workflow for validation

## Services

| Service      | URL                   |
| ------------ | --------------------- |
| Sample App   | http://localhost:3000 |
| Prometheus   | http://localhost:9090 |
| Grafana      | http://localhost:3001 |
| Alertmanager | http://localhost:9093 |
| cAdvisor     | http://localhost:8080 |

Grafana Login:

```text
admin
admin
```

## Running the Project

Start everything:

```bash
docker compose up --build -d
```

Check containers:

```bash
docker ps
```

Stop everything:

```bash
docker compose down
```

## Verify Monitoring

Open:

```text
http://localhost:9090/targets
```

You should see:

* prometheus
* sample-node-service
* cadvisor
* node-exporter

all showing UP.

## Failure Test

Stop the application:

```bash
docker stop sample-monitored-service
```

Refresh:

```text
http://localhost:9090/targets
```

The application target should become DOWN.

Start it again:

```bash
docker start sample-monitored-service
```

After a short delay it should return to UP.

## Self-Healing

PowerShell:

```powershell
./scripts/self-heal.ps1
```

Bash:

```bash
./scripts/self-heal.sh
```

The scripts check whether the application container is running and restart it if necessary.

## Dashboard

The Grafana dashboard includes:

* Service Health
* Targets Status
* HTTP Request Rate
* Application Latency
* CPU Usage
* Container Metrics

## Project Structure

```text
app/
prometheus/
grafana/
alertmanager/
scripts/
docker-compose.yml
README.md
```

## What I Learned

* Prometheus scraping and alert rules
* Grafana dashboard creation
* Container monitoring with cAdvisor
* Infrastructure monitoring with Node Exporter
* Docker Compose orchestration
* Basic alerting and recovery workflows

```
```
