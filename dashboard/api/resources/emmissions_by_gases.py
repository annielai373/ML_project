from flask_restful import Resource
from models.emmissions_by_gases import EmmissionsByGasesModel

class EmmissionsByGases(Resource):
    def get(self, operation=None, gas=None, n_periods=None, model=None):

        if operation:
            if operation == 'get_gases':
                return { 'result' : EmmissionsByGasesModel.get_gases()}, 200

            elif operation == 'get_years':
                return { 'result' : EmmissionsByGasesModel.get_years()}, 200

            elif operation == 'get_actual_consumption':
                if gas:
                    return { 'result' : EmmissionsByGasesModel.get_actual_consumption(gas) }

                else:
                    return { 'error' : 'missing gas parameter' }

            elif operation == 'get_prediction':
                if gas:
                    if n_periods:
                        return { 'result' : EmmissionsByGasesModel.get_prediction(gas, int(n_periods), model) }

                    else:
                        return { 'error' : 'missing n_periods parameter' }

                else:
                    return { 'error' : 'missing gas parameter' }

            else:
                return { 'error' : 'invalid operation' }
