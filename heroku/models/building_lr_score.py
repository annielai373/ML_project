from db import db

class BuildingsLinearRegressionScoreModel(db.Model):
    __tablename__ = 'buildings_lr_score'
    __table_args__ = {'extend_existing': True}

    index = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_score(cls, feature):
        result = []

        for item in BuildingsLinearRegressionScoreModel.query.filter(BuildingsLinearRegressionScoreModel.filter == feature).all():
            result.append({
                'train' : item.train,
                'test' : item.test
            })

        return result 

