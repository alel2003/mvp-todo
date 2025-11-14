FROM python:3.11.1-alpine

WORKDIR /var/www/app

ADD requirements.txt .

RUN apk update && apk add --no-cache \
    file-dev \
    cairo-dev \
    pkgconf \
    g++ \
    musl-dev \
    libffi-dev \
    jpeg-dev \
    zlib-dev

RUN pip install --no-cache-dir -r requirements.txt

ENV PYTHONDONTWRITEBYTECODE=1
RUN pip install --upgrade pip

COPY . .

RUN chmod +x wait_for_db.sh migrate.sh run_in_prod.sh

EXPOSE 8000/tcp