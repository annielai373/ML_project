from flask_restful import Resource
from models.building_lr_pred import BuildingsLinearRegressionPredictionModel

class BuildingsLinearRegressionPrediction(Resource):
    def get(self, feature=None):

        if feature:
            return { 'result' : BuildingsLinearRegressionPredictionModel.get_predictions(feature)}, 200
            

        else:
            return { 'error' : 'invalid operation' }
