
# Academic Chatbot API

This Project about using AI chabot to help student to learn about university or other 


## API Reference

Documentation about api can be provided by accesing url
``` 
http://localhost/docs 
```


## Installation

Install Academic Chatbot with virtualenv python

```bash
  python -m venv venv
  source 'venv\Scripts\activate' 
```

Instal Requirements library

```
pip install -r requirements.txt
```

Rename or copy example.env to .env
```
DB_USER= #database username
DB_PASSWORD= #database password
DB_NAME= #database name
DB_HOST= #database host
DB_PORT= #database port

PORT= #webiste port

JWT_SECRET_KEY= #jwt secret
JWT_ALGORITHM= #algorithm
```


### Migrating 

```
alembic revision -m "initial"
alembic upgrade head
```


### How to run

For development
```
fastapi dev main.py
```

For production
```
fastapi run main.py
```
## Running On Docker

To run this project on docker container


### Setup .env
change db_host with container name
```
DB_USER= #database username
DB_PASSWORD= #database password
DB_NAME= #database name
DB_HOST= #database host -------> Change this with database container name
DB_PORT= #database port

PORT= #webiste port

JWT_SECRET_KEY= #jwt secret
JWT_ALGORITHM= #algorithm
```

### Build with docker compose
```
docker compose up --build
```

