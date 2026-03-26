$body = @{
    email = "admin@test.com"
    password = "password"
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:8080/auth/login" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json
