from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

NODES = [
  {
    "_id": "8d36a8c6-b3bc-4e97-ae5e-fe6c5ae792e5",
    "type": "PromptNode",
    "start": True,
    "config": {
      "text": "Das ist ein Test"
    },
    "outputs": ["f4db9b1a-dce2-4060-892f-ff0b2892d730"]
  },
  {
    "_id": "f4db9b1a-dce2-4060-892f-ff0b2892d730",
    "type": "PromptNode",
    "start": True,
    "config": {
      "text": "Das ist ein Test 2"
    },
    "outputs": []
  }
]

@app.route('/process', methods=['GET'])
def api():
    return jsonify(NODES)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1337)