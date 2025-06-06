
from dotenv import load_dotenv
import os

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path=dotenv_path)
    print(f"DEBUG from app/__init__.py: .env loaded from: {dotenv_path}") 
else:
    print(f"DEBUG from app/__init__.py: .env file not found at: {dotenv_path}")