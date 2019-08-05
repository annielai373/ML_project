from db import db

from config import ML_REPOSITORY
import pickle

class ContinentalEnergyProductionModel(db.Model):
     __tablename__ = 'continental_primary_energy_production'
     __table_args__ = {'extend_existing': True} 

     year = db.Column(db.Integer, primary_key=True)

     @classmethod
     def get_years(cls):
         return [item.year for item in ContinentalEnergyProductionModel.query.all()]

     @classmethod
     def get_continents(cls):
         return [column for column in db.Model.metadata.tables[ContinentalEnergyProductionModel.__tablename__].columns.keys() if column != 'year']

     @classmethod
     def get_actual_consumption(cls, continent):

         try:
            result = []

            for item in ContinentalEnergyProductionModel.query.all():
                result.append({
                    'x' : item.year,
                    'y' : item.__getattribute__(continent)
                })

            return result
         except:
             return []
     
     @classmethod
     def get_prediction(cls, continent, n_periods):    

        result = []

        try:
            last_year = ContinentalEnergyProductionModel.query.with_entities(db.func.max(ContinentalEnergyProductionModel.year)).scalar()            
            model_location = ML_REPOSITORY + ContinentalEnergyProductionModel.__tablename__ + '/' + continent + '.pkl'
            
            model = pickle.load(open(model_location, 'rb'))
            predictions = model.predict(n_periods=n_periods)

            for item in list(predictions):
                last_year = last_year + 1                

                result.append({
                    'x' : last_year,
                    'y' : item
                })

            return result

        except:
            return []         

