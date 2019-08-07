import csv

class BuildingLinearRegressionModel:
  def getData(filename):
    with open(filename, mode="r") as csv_file:
      output = []
      lineNumber = 0
      csv_data = csv.reader(csv_file, delimiter=",")
      for row in csv_data:
        if lineNumber == 0:
          header = row

        else:
          currentData = dict()
          currentData.update({"x": lineNumber})
          i = 0
          for col in row:
            currentData.update({header[i]: float(col)})
            i=i+1
          
          output.append(currentData)
        
        lineNumber=lineNumber+1
        
        if lineNumber > 35:
          break;

      return output

  @classmethod
  def getWithFloorArea(cls):
    output = cls.getData("../../Building Performance Database/LR_withFloorPlan_Real_Prediction.csv")
    return output

  @classmethod
  def getNoFloorArea(cls):
    output = cls.getData("../../Building Performance Database/LR_NoFloorPlan_Real_Prediction.csv")
    return output

  @classmethod
  def getWithFloorAreaScore(cls):
    output = cls.getData("../../Building Performance Database/LR_withFloorPlan_score.csv")
    return output

  @classmethod
  def getNoFloorAreaScore(cls):
    output = cls.getData("../../Building Performance Database/LR_NoFloorPlan_score.csv")
    return output