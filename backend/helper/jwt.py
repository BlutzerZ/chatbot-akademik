from dotenv import load_dotenv # type: ignore
import os, jwt, datetime


env = os.getenv('ENVIRONMENT', 'prod')
if env == 'prod':
    load_dotenv('.env.prod')
else:
    load_dotenv('.env.dev')

def generate_token(data):
    data['id'] = str(data['id'])
    data['exp'] = datetime.datetime.now(tz=datetime.timezone.utc) + datetime.timedelta(hours=10)

    token = jwt.encode(
        data, 
        os.getenv("JWT_SECRET_KEY"), 
        algorithm=os.getenv("JWT_ALGORITHM"),
    )
    
    return token

def decode_token(token):
    data = jwt.decode(
        token, 
        os.getenv("JWT_SECRET_KEY"), 
        algorithms=os.getenv("JWT_ALGORITHM"),
    )
    
    return data