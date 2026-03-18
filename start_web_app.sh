#!/bin/bash

# Navigate to the project directory
cd /home/wethinkcode/Documents/WEB_CREATION

# Kill any existing server on port 8000
fuser -k 8000/tcp 2>/dev/null

echo "Starting Secure Server..."
# Start server.py in the background
python3 server.py &

# Wait for the server to be ready
sleep 2

echo "Generating QR Code..."
# Run terminal_qr.py
python3 terminal_qr.py

# Keep the script running to keep the terminal open if needed,
# or just wait for the server process (though it's in the background)
# We can use 'wait' if we want to stay in the foreground.
wait
