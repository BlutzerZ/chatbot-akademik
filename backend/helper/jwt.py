from dotenv import load_dotenv # type: ignore
import os, jwt

env = os.getenv('ENVIRONMENT', 'prod')
if env == 'prod':
    load_dotenv('.env.prod')
else:
    load_dotenv('.env.dev')

def generate_token(data):
    token = jwt.encode(
        data, 
        os.getenv("JWT_SECRET_KEY"), 
        algorithm=os.getenv("JWT_ALGORITHM"),
    )
    
    return token