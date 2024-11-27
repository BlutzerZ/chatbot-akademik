"""Initial migration

Revision ID: 72833c8b9ac1
Revises: 
Create Date: 2024-11-25 20:30:54.425843

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '72833c8b9ac1'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('model',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('version', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=False),
    sa.Column('token', sa.String(length=255), nullable=False),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('conversation',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('role',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('name', sa.Enum('user', 'admin', name='roletype'), nullable=False),
    sa.Column('user_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    op.create_table('message',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('role', sa.Enum('assistant', 'system', 'user', name='roleenum'), nullable=False),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('conversation_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['conversation_id'], ['conversation.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id')
    )
    op.create_table('assistant_message',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('generation_status', sa.Enum('pending', 'generating', 'stopped', name='generationstatusenum'), nullable=True),
    sa.Column('generation_amount', sa.Integer(), nullable=False),
    sa.Column('model_id', sa.UUID(), nullable=True),
    sa.Column('message_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['message_id'], ['message.id'], ),
    sa.ForeignKeyConstraint(['model_id'], ['model.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('message_id')
    )
    op.create_table('feedback',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('user_message_id', sa.UUID(), nullable=True),
    sa.Column('bot_message_id', sa.UUID(), nullable=True),
    sa.Column('score', sa.Boolean(), nullable=False),
    sa.Column('content', sa.String(), nullable=True),
    sa.Column('status', sa.Enum('valid', 'invalid', 'in_review', name='feedbackstatus'), nullable=True),
    sa.Column('deleted_at', sa.DateTime(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['bot_message_id'], ['message.id'], ),
    sa.ForeignKeyConstraint(['user_message_id'], ['message.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('bot_message_id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('user_message_id')
    )
    op.create_table('generation_log',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('message_id', sa.UUID(), nullable=True),
    sa.Column('data', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['message_id'], ['message.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('id'),
    sa.UniqueConstraint('message_id')
    )
    op.create_table('feedback_correction',
    sa.Column('id', sa.UUID(), nullable=False),
    sa.Column('content', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('feedback_id', sa.UUID(), nullable=True),
    sa.ForeignKeyConstraint(['feedback_id'], ['feedback.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('feedback_id'),
    sa.UniqueConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('feedback_correction')
    op.drop_table('generation_log')
    op.drop_table('feedback')
    op.drop_table('assistant_message')
    op.drop_table('message')
    op.drop_table('role')
    op.drop_table('conversation')
    op.drop_table('user')
    op.drop_table('model')
    # ### end Alembic commands ###
