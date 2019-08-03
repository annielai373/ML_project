from flask_restful import Api,Resource
from init import create_app

app = create_app()
api = Api(app)

from resources.home import Home
from resources.building_predictor import BuildingPredictor

api.add_resource(Home, '/')
api.add_resource(BuildingPredictor, '/buildings/predictor')

if __name__ == '__main__':
    app.run(port=5000, debug=True)