#!/bin/sh
python3 manage.py migrate
gunicorn --bind 0.0.0.0:8000 to_do_server.asgi:application -k uvicorn.workers.UvicornWorker -w 2
