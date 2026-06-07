# Cloud Monitoring and Alerting Stack

A complete DevOps/SRE monitoring project built with Docker, Prometheus, Grafana, Alertmanager, Node Exporter, cAdvisor, Bash, PowerShell, and GitHub Actions.

## What this project demonstrates

- Containerized deployment using Docker Compose
- Prometheus service discovery and metric scraping
- Grafana dashboard provisioning
- Alert rules for service outage, latency, errors, and container CPU
- Alertmanager routing to a local webhook receiver
- Node Exporter host metrics
- cAdvisor container metrics
- Self-healing scripts using Bash and PowerShell
- GitHub Actions CI pipeline

## Services

| Service | URL |
|---|---|
| Sample App | http://localhost:3000 |
| Prometheus | http://localhost:9090 |
| Prometheus Targets | http://localhost:9090/targets |
| Alertmanager | http://localhost:9093 |
| Grafana | http://localhost:3001 |
| cAdvisor | http://localhost:8080 |
| Alert Webhook Health | http://localhost:5001/health |

Grafana login:

```text
admin / admin
```

## Run locally

```bash
docker compose up --build -d
```

Check containers:

```bash
docker ps
```

Stop all services:

```bash
docker compose down
```

## Generate traffic

Open the app several times:

```text
http://localhost:3000
http://localhost:3000/simulate-latency
http://localhost:3000/simulate-error
```

On Windows PowerShell:

```powershell
./scripts/demo-traffic.ps1
```

## Failure and recovery test

Stop the app:

```bash
docker stop sample-monitored-service
```

Verify the outage:

```text
http://localhost:9090/targets
```

The `sample-node-service` target should become `DOWN`.

Start the app again:

```bash
docker start sample-monitored-service
```

After 30-60 seconds, the target should return to `UP`.

## Self-healing scripts

PowerShell:

```powershell
./scripts/self-heal.ps1
```

Bash:

```bash
./scripts/self-heal.sh
```

These scripts check whether `sample-monitored-service` is running. If it is stopped, they restart it.

## Alerts

Prometheus alert rules are in:

```text
prometheus/rules/app-alerts.yml
```

Included alerts:

- `SampleServiceDown`
- `HighApplicationLatency`
- `ApplicationErrorSpike`
- `HighContainerCPU`

Alertmanager config is in:

```text
alertmanager/alertmanager.yml
```

The default receiver sends alerts to the local webhook listener. View alert logs:

```bash
docker logs alert-webhook-listener
```

## GitHub push

```bash
git init
git add .
git commit -m "Complete cloud monitoring and alerting stack"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cloud-monitoring-alerting-stack.git
git push -u origin main
```

## Resume bullet

**Cloud Monitoring and Alerting Stack | Docker, Prometheus, Grafana, Alertmanager, PowerShell**

- Built a containerized monitoring and alerting platform using Docker Compose, Prometheus, Grafana, Alertmanager, Node Exporter, and cAdvisor.
- Implemented service health monitoring, real-time dashboards, outage detection, latency tracking, error-rate monitoring, and container/host metrics.
- Configured Prometheus alert rules and Alertmanager routing to detect service failures and operational issues.
- Developed Bash and PowerShell self-healing scripts to restart failed containers and validate recovery workflows.
- Added GitHub Actions CI to build the stack and verify service health automatically.

## Interview explanation

I built a cloud monitoring and alerting platform using Docker, Prometheus, Grafana, and Alertmanager. The application exposes Prometheus metrics, Prometheus scrapes those metrics, Grafana visualizes service health and performance, and Alertmanager routes alerts when the service goes down or latency/error rate increases. I also tested failure scenarios by stopping the application container, verifying the target went DOWN in Prometheus, and using self-healing scripts to bring the service back online.
