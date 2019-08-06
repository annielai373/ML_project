from flask_restful import Api,Resource
from flask_cors import CORS 
from init import create_app

app = create_app()
api = Api(app)
CORS(app)

from resources.home import Home
from resources.building import Building
from resources.building_predictor import BuildingPredictor
from resources.continental_energy_consumption import ContinentalEnergyConsumption
from resources.continental_energy_production import ContinentalEnergyProduction

api.add_resource(Home, '/')
api.add_resource(Building, "/building")
api.add_resource(BuildingPredictor, '/buildings/predictor')
api.add_resource(ContinentalEnergyConsumption, '/cec/<string:operation>', '/cec/<string:operation>/<string:continent>', '/cec/<string:operation>/<string:continent>/<string:n_periods>')
api.add_resource(ContinentalEnergyProduction, '/cep/<string:operation>', '/cep/<string:operation>/<string:continent>', '/cep/<string:operation>/<string:continent>/<string:n_periods>')


if __name__ == '__main__':
    app.run(port=5000, debug=True)