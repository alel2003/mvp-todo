# Руководство по запуску проекта

## 1. Backend

### 1.1 Создать `.env`

* Создайте файл `.env` в корне backend.
* Скопируйте все параметры из `.env.example`.
* Зполните содержимое параметров для db
* Сгенерируйте **SECRET_KEY** на сайте: [https://djecrety.ir/](https://djecrety.ir/) и вставьте в `.env`.

### 1.2 Дать права на выполнение скриптов

Выполните команды в зависимости от вашей операционной системы:

#### **Linux / macOS**

```bash
chmod +x migrate.sh
chmod +x run_in_prod.sh
chmod +x wait_for_db.sh
```

#### **Windows (Git Bash / WSL)**

```bash
chmod +x migrate.sh
chmod +x run_in_prod.sh
chmod +x wait_for_db.sh
```

### 1.3 Запуск Docker

Используйте любой вариант в зависимости от версии Docker:

```bash
docker compose up -d --build
```

или

```bash
docker-compose up -d --build
```

---

## 2. Frontend

### 2.1 Создать `.env`

* Создайте `.env` в корневой папке frontend.
* Возьмите значения из `.env.example` (особенно URL API).

### 2.2 Установить зависимости

```bash
npm install
```

### 2.3 Запустить dev‑сервер

```bash
npm run dev
```

---

##
