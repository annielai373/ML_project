import csv

class BuildingLinearRegressionModel:
  @classmethod
  def getData(cls):
    with open("../../data/SAS/build_lr.csv", mode="r") as csv_file:
      output = []
      lineNumber = 0
      csv_data = csv.reader(csv_file, delimiter=",")
      for row in csv_data:
        if lineNumber == 0:
          header = row
        else:
          currentData = dict()
          i = 0
          for col in row:
            currentData.update({header[i]: float(col)})
            i=i+1
          
          output.append(currentData)
        
        lineNumber=lineNumber+1

      return output

  @classmethod
  def getPredictData(cls):
    output = []
    return output