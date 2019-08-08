from flask_restful import Resource
from models.building_fr_score import BuildingsRandomForestScoreModel

class BuildingsRandomForestScore(Resource):
    def get(self, feature=None):

        if feature:
            return { 'result' : BuildingsRandomForestScoreModel.get_score(feature)}, 200
 
        else:
            return { 'error' : 'invalid operation' }
