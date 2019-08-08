import os

PROPAGATE_EXCEPTIONS = True
SQLALCHEMY_TRACK_MODIFICATIONS = False
SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', '') or 'sqlite:///datasets/energy.db'
ML_REPOSITORY='ml/'