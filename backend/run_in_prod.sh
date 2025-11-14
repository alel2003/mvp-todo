#!/bin/sh

./wait_for_db.sh

./migrate.sh

python3 manage.py runserver 0.0.0.0:8000