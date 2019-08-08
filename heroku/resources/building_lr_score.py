from flask_restful import Resource
from models.building_lr_score import BuildingsLinearRegressionScoreModel

class BuildingsLinearRegressionScore(Resource):
    def get(self, feature=None):

        if feature:
            return { 'result' : BuildingsLinearRegressionScoreModel.get_score(feature)}, 200
 
        else:
            return { 'error' : 'invalid operation' }
