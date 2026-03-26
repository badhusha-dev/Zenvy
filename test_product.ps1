$token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX0FETUlOIl0sInN1YiI6ImFkbWluQHRlc3QuY29tIiwiaWF0IjoxNzc0NDYxMjU0LCJleHAiOjE3NzQ1NDc2NTR9.KiNZsI63g_j1eok4R3oa2tA1TtvmzHzzVcq-tUR7MrQ"
$headers = @{
    Authorization = "Bearer $token"
}
$body = @{
    name = "Silk Gown"
    description = "Luxurious silk gown."
    price = 250.0
    category = "Gowns"
    stock = 5
    images = @("http://image1.jpg")
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8080/products" -Method Post -Body $body -ContentType "application/json" -Headers $headers
    $response | ConvertTo-Json
} catch {
    $_.ErrorDetails.Message
    $_.Exception.Response.Content
}
