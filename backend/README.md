# Academic Chatbot API

This Project about using AI chabot to help student to learn about university or other

## API Reference

Documentation about api can be provided by accesing url

```
http://localhost/docs
```

## Running the Backend

### Locally

Install Academic Chatbot with virtualenv python

```bash
python -m venv venv
source 
source 'venv\Script'venv\Scripts\activate'
```

Install dependencies

```
pip install -r requirements.txt
pip install -r requirements-local.txt
```

Copy `.env.example` to `.env` and fill the variables appropriately.

```bash
# For development
fastapi dev main.py

# For production
fastapi run main.py
```

### Using Docker

Make sure the `DB_HOST` in `.env` is the same as the database's container name.

`cd` to `/libs`.

```bash
docker build -t bengky/libs -f Dockerfile .
cd ../backend
docker compose up --build
```

## Migrating

```bash
alembic revision -m "initial"
alembic upgrade head
```
