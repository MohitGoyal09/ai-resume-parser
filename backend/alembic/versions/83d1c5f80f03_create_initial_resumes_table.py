"""create_initial_resumes_table

Revision ID: 83d1c5f80f03
Revises: 
Create Date: 2025-06-04 17:51:29.946394  # This date will be your actual generation date

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '83d1c5f80f03' # This should match the filename prefix
down_revision: Union[str, None] = None # This is the first migration, so no prior revision
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema: Create the resumes table."""
    op.create_table('resumes',
        sa.Column('id', sa.Integer(), nullable=False, primary_key=True, index=True),
        sa.Column('filename', sa.String(), nullable=True, index=True), # String length can be specified, e.g., String(255)
        sa.Column('uploaded_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('raw_text', sa.Text(), nullable=True),
        sa.Column('contact_info', sa.JSON(), nullable=True),
        sa.Column('summary', sa.Text(), nullable=True),
        sa.Column('work_experience', sa.JSON(), nullable=True),
        sa.Column('education', sa.JSON(), nullable=True),
        sa.Column('skills', sa.JSON(), nullable=True),
        sa.Column('projects', sa.JSON(), nullable=True),
        sa.Column('certifications', sa.JSON(), nullable=True),
        sa.Column('awards', sa.JSON(), nullable=True),
        sa.Column('llm_analysis', sa.JSON(), nullable=True)
    )
    # Explicitly create indexes if not done by primary_key=True, index=True in Column definition
    # (though index=True in Column should handle it for most DBs with Alembic)
    # op.create_index(op.f('ix_resumes_id'), 'resumes', ['id'], unique=False) # Redundant if primary_key=True
    # op.create_index(op.f('ix_resumes_filename'), 'resumes', ['filename'], unique=False) # Redundant if index=True


def downgrade() -> None:
    """Downgrade schema: Drop the resumes table."""
    # Drop indexes first if they were created explicitly outside Column definition
    # op.drop_index(op.f('ix_resumes_filename'), table_name='resumes')
    # op.drop_index(op.f('ix_resumes_id'), table_name='resumes')
    op.drop_table('resumes')