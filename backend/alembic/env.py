
import os
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool 
from alembic import context
from dotenv import load_dotenv


dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Import your Base from models.py
from app.models import Base
target_metadata = Base.metadata

def get_url_for_alembic():
    url = os.getenv("DATABASE_URL")
    if not url:
        raise ValueError("DATABASE_URL not set in environment for Alembic operations.")
  
    return url

def run_migrations_offline() -> None:
    url = get_url_for_alembic()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    db_url = get_url_for_alembic()
    cfg_section = config.get_section(config.config_ini_section)
    cfg_section['sqlalchemy.url'] = db_url 
    
    connectable = engine_from_config(
        cfg_section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()