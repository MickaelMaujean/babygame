"""delete test column

Revision ID: d73ca0bafad7
Revises: 36bd3e8edc60
Create Date: 2023-09-20 10:55:08.962773

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd73ca0bafad7'
down_revision: Union[str, None] = '36bd3e8edc60'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_column('votes', 'test')
    pass


def downgrade() -> None:
    op.add_column('votes', sa.Column('test', sa.Integer()))
    pass
