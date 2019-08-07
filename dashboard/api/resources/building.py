from flask_restful import Resource, reqparse
from models.building_linear_regression import BuildingLinearRegressionModel

class Building(Resource):
    def get(self, feature=None, score=None):
      if feature:
        if feature == "floorarea":
          if score == "score":
            return {"result": BuildingLinearRegressionModel.getWithFloorAreaScore()}, 200

          else:
            return {"result": BuildingLinearRegressionModel.getWithFloorArea()}, 200

        else:
          if score == "score":
            return {"result": BuildingLinearRegressionModel.getNoFloorAreaScore()}, 200

          else:
            return {"result": BuildingLinearRegressionModel.getNoFloorArea()}, 200

      else:
        abort(501)