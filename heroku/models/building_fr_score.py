from db import db

class BuildingsRandomForestScoreModel(db.Model):
    __tablename__ = 'buildings_fr_score'
    __table_args__ = {'extend_existing': True}

    index = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_score(cls, feature):
        result = []

        for item in BuildingsRandomForestScoreModel.query.filter(BuildingsRandomForestScoreModel.filter == feature).all():
            result.append({
                'train' : item.train,
                'test' : item.test
            })

        return result 

