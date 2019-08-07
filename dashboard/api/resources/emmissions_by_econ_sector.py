from flask_restful import Resource
from models.emmissions_by_econ_sector import EmmissionsBySectorsModel

class EmmissionsBySectors(Resource):
    def get(self, operation=None, sector=None, n_periods=None, model=None):

        if operation:
            if operation == 'get_sectors':
                return { 'result' : EmmissionsBySectorsModel.get_sectors()}, 200

            elif operation == 'get_years':
                return { 'result' : EmmissionsBySectorsModel.get_years()}, 200

            elif operation == 'get_actual_consumption':
                if sector:
                    return { 'result' : EmmissionsBySectorsModel.get_actual_consumption(sector) }

                else:
                    return { 'error' : 'missing sector parameter' }

            elif operation == 'get_prediction':
                if sector:
                    if n_periods:
                        return { 'result' : EmmissionsBySectorsModel.get_prediction(sector, int(n_periods), model) }

                    else:
                        return { 'error' : 'missing n_periods parameter' }

                else:
                    return { 'error' : 'missing sector parameter' }


            else:
                return { 'error' : 'invalid operation' }




