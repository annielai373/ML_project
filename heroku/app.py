from flask_restful import Api,Resource
from flask_cors import CORS 
from init import create_app

app = create_app()
api = Api(app)
CORS(app)

from resources.home import Home
from resources.continental_energy_consumption import ContinentalEnergyConsumption
from resources.continental_energy_production import ContinentalEnergyProduction
from resources.emmissions_by_econ_sector import EmmissionsBySectors
from resources.emmissions_by_gases import EmmissionsByGases
from resources.buildings_lr_pred import BuildingsLinearRegressionPrediction
from resources.building_lr_score import BuildingsLinearRegressionScore
from resources.building_fr_score import BuildingsRandomForestScore
from resources.building_fr_weight import BuildingsRandomForestWeight

api.add_resource(Home, '/')
api.add_resource(ContinentalEnergyConsumption, '/cec/<string:operation>', '/cec/<string:operation>/<string:continent>', '/cec/<string:operation>/<string:continent>/<string:n_periods>', '/cec/<string:operation>/<string:continent>/<string:n_periods>/<string:model>')
api.add_resource(ContinentalEnergyProduction, '/cep/<string:operation>', '/cep/<string:operation>/<string:continent>', '/cep/<string:operation>/<string:continent>/<string:n_periods>', '/cep/<string:operation>/<string:continent>/<string:n_periods>/<string:model>')
api.add_resource(EmmissionsBySectors, '/emmissions/<string:operation>', '/emmissions/<string:operation>/<string:sector>', '/emmissions/<string:operation>/<string:sector>/<string:n_periods>', '/emmissions/<string:operation>/<string:sector>/<string:n_periods>/<string:model>')
api.add_resource(EmmissionsByGases, '/gases/<string:operation>', '/gases/<string:operation>/<string:gas>', '/gases/<string:operation>/<string:gas>/<string:n_periods>', '/gases/<string:operation>/<string:gas>/<string:n_periods>/<string:model>')
api.add_resource(BuildingsLinearRegressionPrediction, '/building_lr_pred/<string:feature>')
api.add_resource(BuildingsLinearRegressionScore, '/building_lr_score/<string:feature>')
api.add_resource(BuildingsRandomForestScore, '/building_fr_score/<string:feature>')
api.add_resource(BuildingsRandomForestWeight, '/building_fr_weight/<string:feature>')

if __name__ == '__main__':
    app.run(port=5000, debug=True)