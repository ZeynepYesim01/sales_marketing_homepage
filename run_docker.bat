@echo off
SET IMAGE_NAME=my-competition-web
SET CONTAINER_NAME=%IMAGE_NAME%-container
SET HOST_PORT=8080
SET CONTAINER_PORT=80

echo Stopping existing %CONTAINER_NAME% container...
docker stop %CONTAINER_NAME% >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo %CONTAINER_NAME% is not running or not found.
) ELSE (
    echo %CONTAINER_NAME% stopped.
)

echo Removing existing %CONTAINER_NAME% container...
docker rm %CONTAINER_NAME% >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo %CONTAINER_NAME% does not exist or could not be removed.
) ELSE (
    echo %CONTAINER_NAME% removed.
)

echo Rebuilding Docker image (no cache)...
docker build --no-cache -t %IMAGE_NAME% .

IF %ERRORLEVEL% NEQ 0 (
    echo Error: Docker image could not be built. Please check the errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo Starting new Docker container...
docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %IMAGE_NAME%

IF %ERRORLEVEL% NEQ 0 (
    echo Error: Docker container could not be started. Please check the errors above.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo Your project should be running on port %HOST_PORT%.
echo Open your browser and go to http://localhost:%HOST_PORT%.
echo Don't forget to use Ctrl+Shift+R to clear your browser cache.
echo.
pause
