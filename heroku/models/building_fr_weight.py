from db import db

class BuildingsRandomForestWeightModel(db.Model):
    __tablename__ = 'buildings_fr_weight'
    __table_args__ = {'extend_existing': True}

    index = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_weight(cls, feature):
        result = []

        for item in BuildingsRandomForestWeightModel.query.filter(BuildingsRandomForestWeightModel.filter == feature).all():
            result.append({
                'features' : item.features,
                'weight' : item.weight
            })

        return result 

