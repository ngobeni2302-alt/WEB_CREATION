import http.server
import socketserver
import os

PORT = 8000

class SecureHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Security Headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Content-Security-Policy', "default-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com;")
        self.send_header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        super().end_headers()

    def do_GET(self):
        # Simple routing
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), SecureHTTPRequestHandler) as httpd:
        print(f"Server started at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            httpd.shutdown()
