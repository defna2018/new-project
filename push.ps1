Write-Host "Enter commit message:"
$message = Read-Host

git add .

git commit -m "$message"

git push origin main

Write-Host "✅ Changes pushed to GitHub successfully!"