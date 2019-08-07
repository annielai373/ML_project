from db import db

from config import ML_REPOSITORY
import pickle

class EmmissionsBySectorsModel(db.Model):
    __tablename__ = 'emmissions_by_econ_sector'
    __table_args__ = {'extend_existing': True}

    year = db.Column(db.Integer, primary_key=True)

    @classmethod
    def get_years(cls):
        return [item.year for item in EmmissionsBySectorsModel.query.all()]

    @classmethod
    def get_sectors(cls):
        return [column for column in db.Model.metadata.tables[EmmissionsBySectorsModel.__tablename__].columns.keys() if column != 'year']

    @classmethod
    def get_actual_consumption(cls, sector):

        try:
           result = []

           for item in EmmissionsBySectorsModel.query.all():
               result.append({
                   'x' : item.year,
                   'y' : item.__getattribute__(sector)
               })

           return result
        except:
            return []

    @classmethod
    def get_prediction(cls, sector, n_periods, model):    

        model_list = []

        if not model:
            model_list.append('arima')
            model_list.append('exponential')

        else:
            model_list.append(model)

        try:            
            model_result = []            

            for template in model_list:                
                result = []  
                last_year = EmmissionsBySectorsModel.query.with_entities(db.func.max(EmmissionsBySectorsModel.year)).scalar()                                          
                model_location = ML_REPOSITORY + EmmissionsBySectorsModel.__tablename__ + '/' + template + '/' + sector + '.pkl'
                
                model = pickle.load(open(model_location, 'rb'))

                if template == 'arima':
                    predictions = model.predict(n_periods=n_periods)

                elif template == 'exponential':
                    predictions = model.forecast(steps=n_periods)

                for item in list(predictions):
                    last_year = last_year + 1                

                    result.append({
                        'x' : last_year,
                        'y' : item
                    })

                model_result.append({template : result})                

            return model_result

        except Exception as e:
            return []         



