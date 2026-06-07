for ($i=1; $i -le 20; $i++) {
  Invoke-WebRequest http://localhost:3000/ | Out-Null
  if ($i % 5 -eq 0) { Invoke-WebRequest http://localhost:3000/simulate-error -SkipHttpErrorCheck | Out-Null }
  Start-Sleep -Seconds 1
}
Write-Host "Traffic generated. Refresh Grafana dashboard."
