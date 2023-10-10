from flask import Flask, jsonify, request
from flask_cors import CORS
import base64, sys, os

SIGNATURE_FOLDER = 'signatures'

app = Flask(__name__)
app.config['SIGNATURE_FOLDER'] = SIGNATURE_FOLDER
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
    "config": {
      "text": "Das ist ein Test 2"
    },
    "outputs": ["3"]
  },
  {
    "_id": "3",
    "type": "SignatureNode",
    "config": {
      "text": "Das ist ein Test 3"    
    },
    "outputs": []
  }
]
    
USER_INPUT = []

@app.route('/process', methods=['GET', 'POST'])
def api():
  if request.method == 'GET':
    return jsonify(NODES)
  if request.method == 'POST':
    data = request.get_json()
    key = data[len(data) - 2]["associatedBlock"]["id"]
    USER_INPUT.append({key : data[len(data) - 1]["content"]["value"]})
    
    return jsonify(success=True)

@app.route('/update', methods=['POST'])
def update():
  #to be implemented
  return jsonify(success=False)

@app.route('/delete', methods=['POST'])
def delete():
  itemToDelete = request.get_json();
  if itemToDelete in USER_INPUT: 
    USER_INPUT.remove(itemToDelete)
    return jsonify(success=True)
  else:
    return jsonify(success=False)
  
@app.route('/store-signature', methods=['POST'])
def storeSignature():
  data = request.get_json();
  key = data[len(data) - 2]['associatedBlock']['id']
  value = data[len(data) - 1]['content']['value']
  if 'data:image/png;base64' not in value:
    return jsonify(success=False)
  filename = key + "_signature.png"
  b64_string = value.removeprefix('data:image/png;base64,')
  with open(os.path.join(app.config['SIGNATURE_FOLDER'], filename), 'wb') as fh:
    fh.write(base64.decodebytes(b64_string.encode()))
  return jsonify(success=True)
  
@app.route('/data', methods=['GET'])
def get_data():
  return jsonify(USER_INPUT)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1337)
