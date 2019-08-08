from db import db

class BuildingsLinearRegressionPredictionModel(db.Model):
    __tablename__ = 'buildings_lr_pred'
    __table_args__ = {'extend_existing': True}

    index = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_predictions(cls, feature):

        result = []

        for item in BuildingsLinearRegressionPredictionModel.query.filter(BuildingsLinearRegressionPredictionModel.filter == feature).all():
            result.append({
                'real' : item.real,
                'predict' : item.predict
            })

        return result                        


