from flask import Flask, request, jsonify
import os
import random
from google import genai
from google.genai import types
import PIL.Image
from werkzeug.utils import secure_filename
from dotenv import load_dotenv
import re

# Load environment variables
load_dotenv()
GEMINI_API_KEY = 'AIzaSyCoxenFx1l59Llo9Jd-nwuhMmfVMo6gddo'

# Initialize Flask app
app = Flask(__name__)

# Allowed extensions
ALLOWED_EXTENSIONS = {'obj', 'stl', 'cad', 'png', 'jpg', 'jpeg'}

# Function to check allowed file extensions
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Route to handle file uploads
@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    # If user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_ext = filename.rsplit('.', 1)[1].lower()

        if file_ext in {'obj', 'stl', 'cad'}:
            # Generate random score for 3D files
            score = random.randint(0, 100)
            return jsonify({'score': score}), 200

        elif file_ext in {'png', 'jpg', 'jpeg'}:
            # Process image with Google Gemini API
            image = PIL.Image.open(file)
            client = genai.Client(api_key=GEMINI_API_KEY)
            response = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=["you are an accessibility checker. your job is to take in an image that the user gives you. Think logically and give a score out of 100 based on how wheelchair accessible the environment is. You should first display the score as x/100, then give the description of the score. Stucture your output so the description is always around 4 sentences.", image]
            )
            # Parse the response to extract the score and description
            match = re.search(r'(\d+)\s*/\s*100', response.text)
            if match:
                score = int(match.group(1))
                description = response.text[match.end():].strip()
            else:
                score = None
                description = response.text
            return jsonify({'score': score, 'description': description}), 200

    return jsonify({'error': 'File type not allowed'}), 400

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
