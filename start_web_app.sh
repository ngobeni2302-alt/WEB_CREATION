#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Kill any existing server on port 8000
if command -v fuser >/dev/null 2>&1; then
    fuser -k 8000/tcp 2>/dev/null
else
    lsof -ti:8000 | xargs kill -9 2>/dev/null
fi

echo "Starting Secure Server..."
# Start server.py in the background
python3 server.py &
SERVER_PID=$!

# Wait for the server to be ready
sleep 2

APP_URL="http://localhost:8000/"

echo "Opening browser at $APP_URL"
if command -v xdg-open >/dev/null 2>&1; then
    xdg-open "$APP_URL" >/dev/null 2>&1 &
elif command -v open >/dev/null 2>&1; then
    open "$APP_URL" >/dev/null 2>&1 &
else
    echo "Open this URL in your browser: $APP_URL"
fi

# Keep the script running to keep the terminal open if needed,
# or just wait for the server process (though it's in the background)
# We can use 'wait' if we want to stay in the foreground.
wait "$SERVER_PID"
