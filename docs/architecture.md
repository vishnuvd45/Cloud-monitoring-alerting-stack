# Architecture

```text
User / Browser
   |        |        |
   |        |        +--> Grafana :3001 dashboards
   |        +----------> Prometheus :9090 metrics and targets
   +-------------------> Sample App :3000

Sample App /metrics ---> Prometheus ---> Alertmanager ---> Webhook Listener Logs
                         |       |
                         |       +-- Alert Rules
                         |
                         +-- Grafana Datasource

Node Exporter and cAdvisor provide host/container metrics.
```

## Main components

- **sample-monitored-service**: Node.js application exposing `/metrics`.
- **Prometheus**: Scrapes metrics and evaluates alert rules.
- **Grafana**: Auto-provisioned dashboard for service, latency, request, CPU, and container metrics.
- **Alertmanager**: Receives alerts from Prometheus.
- **Alert Webhook Listener**: Prints firing/resolved alerts in Docker logs.
- **Node Exporter**: Provides host-level metrics.
- **cAdvisor**: Provides container-level metrics.
