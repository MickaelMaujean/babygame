"""add foreign key and owner_id

Revision ID: 36bd3e8edc60
Revises: c7f6eb099758
Create Date: 2023-09-20 10:31:51.497834

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '36bd3e8edc60'
down_revision: Union[str, None] = 'c7f6eb099758'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('votes', sa.Column('owner_id', sa.Integer()))
    op.create_foreign_key('votes', 
                          source_table='votes', 
                          referent_table='users', 
                          local_cols=['owner_id'], 
                          remote_cols=['id'], ondelete="CASCADE")
    pass


def downgrade() -> None:
    op.drop_constraint('votes', table_name="votes")
    op.drop_column('votes','owner_id')
    pass
