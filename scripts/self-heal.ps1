$ContainerName = "sample-monitored-service"
$status = docker inspect -f '{{.State.Status}}' $ContainerName 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Container $ContainerName not found."
  exit 1
}
if ($status -ne "running") {
  Write-Host "[$(Get-Date)] $ContainerName is $status. Restarting..."
  docker start $ContainerName
} else {
  Write-Host "[$(Get-Date)] $ContainerName is healthy."
}
