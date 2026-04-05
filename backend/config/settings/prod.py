from .base import *
import os

DEBUG = False

ALLOWED_HOSTS = [host for host in os.getenv("ALLOWED_HOSTS", "").split(",") if host]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOWED_ORIGINS = [origin for origin in os.getenv("CORS_ALLOWED_ORIGINS", "").split(",") if origin]
