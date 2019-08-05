from flask_restful import Resource
from models.continental_energy_production import ContinentalEnergyProductionModel

class ContinentalEnergyProduction(Resource):
    def get(self, operation=None, continent=None, n_periods=None):

        if operation:
            if operation == 'get_continents':
                return { 'result' : ContinentalEnergyProductionModel.get_continents()}, 200

            elif operation == 'get_years':
                return { 'result' : ContinentalEnergyProductionModel.get_years()}, 200

            elif operation == 'get_actual_consumption':
                if continent:
                    return { 'result' : ContinentalEnergyProductionModel.get_actual_consumption(continent) }
                else:
                    return { 'error' : 'missing continent parameter' }

            elif operation == 'get_prediction':
                if continent:
                    if n_periods:
                        return { 'result' : ContinentalEnergyProductionModel.get_prediction(continent, int(n_periods)) }

                    else:
                        return { 'error' : 'missing n_periods parameter' }

                else:
                    return { 'error' : 'missing continent parameter' }
            else:
                return { 'error' : 'invalid operation' }



