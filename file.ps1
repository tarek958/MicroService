# Root directory
$rootDir = "C:\Users\tarek\Documents\amine ImportExport\MicroService"

# Define directories and files
$structure = @{
    'services/user-service/src/controllers' = @('user.controller.js')
    'services/user-service/src/models' = @('user.model.js')
    'services/user-service/src/routes' = @('user.routes.js')
    'services/user-service' = @('index.js', 'Dockerfile', 'package.json')
    
    'services/post-service/src/controllers' = @('post.controller.js')
    'services/post-service/src/models' = @('post.model.js')
    'services/post-service/src/routes' = @('post.routes.js')
    'services/post-service' = @('index.js', 'Dockerfile', 'package.json')
    
    'services/notification-service/src' = @('notification.js')
    'services/notification-service' = @('Dockerfile', 'package.json')
    
    'services/graphql-gateway/src/schemas' = @('user.schema.js', 'post.schema.js')
    'services/graphql-gateway/src' = @('index.js')
    'services/graphql-gateway' = @('Dockerfile', 'package.json')

    '.' = @('docker-compose.yml', 'README.md')
}

# Create directories and files
foreach ($dir in $structure.Keys) {
    $fullPath = Join-Path $rootDir $dir
    # Create the directory if it doesn't exist
    if (-not (Test-Path $fullPath)) {
        New-Item -Path $fullPath -ItemType Directory | Out-Null
        Write-Host "Created directory: $fullPath"
    }

    # Create the files in the directory
    foreach ($file in $structure[$dir]) {
        $filePath = Join-Path $fullPath $file
        if (-not (Test-Path $filePath)) {
            New-Item -Path $filePath -ItemType File | Out-Null
            Write-Host "Created file: $filePath"
        }
    }
}

Write-Host "Project structure created successfully at $rootDir"
