from pydantic_settings import BaseSettings
from pathlib import Path
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables with type validation."""

    GOOGLE_API_KEY: str
    CHROMA_PERSIST_PATH: Path = Path("./chroma")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()  # type: ignore

# Populate undefined environment variables using os.environ if defined in .env file
# This is to ensure that the secrets are available to Haystack
for key, value in settings.model_dump().items():
    if os.getenv(key) is None:
        os.environ[key] = str(value)
