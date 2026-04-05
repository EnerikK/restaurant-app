import os

env = os.getenv("DJANGO_ENV", "local").lower()

if env == "prod":
    from .prod import *  # noqa: F401,F403
else:
    from .local import *  # noqa: F401,F403
