from flask_restful import Resource, reqparse
from models.building_linear_regression import BuildingLinearRegressionModel

class Building(Resource):
    def get(self, operation=None):
      return {"result": BuildingLinearRegressionModel.getData()}, 200