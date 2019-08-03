from flask import render_template, make_response
from flask_restful import Resource, reqparse

class BuildingPredictor(Resource):
    #def get(self):
    #    headers = {'Content-Type': 'text/html'}
    #    return make_response(render_template('index.html'),200, headers)

    def post(self):
        parser = reqparse.RequestParser()
        
        parser.add_argument('floor_area')
        args = parser.parse_args()

        return {
            'status': 'ok',
            'floor_area': args["floor_area"]
        }

