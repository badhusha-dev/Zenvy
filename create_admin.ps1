$body = @{
    email = "admin@test.com"
    password = "password"
    name = "Admin User"
    mobile = "9999999999"
    roles = @("ADMIN")
} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:8080/auth/signup" -Method Post -Body $body -ContentType "application/json"
$response | ConvertTo-Json
