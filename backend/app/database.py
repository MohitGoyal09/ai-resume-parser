import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv() 

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    print("CRITICAL: DATABASE_URL environment variable not set.")
    raise ValueError("DATABASE_URL is not configured. Please check your .env file.")


engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=False, 
    pool_recycle=1800,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()