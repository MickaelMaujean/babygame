"""test

Revision ID: e01f4c967665
Revises: 
Create Date: 2023-09-12 10:16:10.954342

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'e01f4c967665'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('votes', sa.Column('test', sa.Integer()))
    pass


def downgrade() -> None:
    op.drop_column('votes', 'test')
    pass
