from flask import Flask
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from db import db

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')
    app.app_context().push()
    
    db.init_app(app)
    db.Model.metadata.reflect(bind=db.engine)
        
    return app