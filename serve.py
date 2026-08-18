#!/usr/bin/env python3
"""Minimal static file server for Zentro Works website.
Reads PORT from the environment (Replit injects it).
Open index.html directly in any browser without this script."""

import http.server
import os

PORT = int(os.environ.get("PORT", 8080))
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, fmt, *args):
        print(f"[zentro] {self.address_string()} {fmt % args}")


with http.server.HTTPServer(("", PORT), Handler) as httpd:
    print(f"[zentro] Serving on port {PORT} from {DIRECTORY}")
    httpd.serve_forever()
