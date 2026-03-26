$body = @{
    email = "test@test.com"
    password = "password"
    name = "Test User"
    mobile = "1234567890"
    roles = @("USER")
} | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/auth/signup" -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    $_.ErrorDetails.Message
}
