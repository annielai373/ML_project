from flask_restful import Resource
from models.building_fr_weight import BuildingsRandomForestWeightModel

class BuildingsRandomForestWeight(Resource):
    def get(self, feature=None):

        if feature:
            return { 'result' : BuildingsRandomForestWeightModel.get_weight(feature)}, 200
 
        else:
            return { 'error' : 'invalid operation' }
