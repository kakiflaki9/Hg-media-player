#!/usr/bin/env python3
"""
Hg+ Media Player
A retro cyberdeck media player with customizable themes
"""

from flask import Flask, render_template, jsonify
import os

app = Flask(__name__, 
            template_folder='themes',
            static_folder='themes/ethereal',
            static_url_path='')

THEMES_DIR = os.path.join(os.path.dirname(__file__), 'themes')
CURRENT_THEME = 'ethereal'

@app.route('/')
def index():
    return render_template(f'{CURRENT_THEME}/index.html')

@app.route('/api/themes')
def get_themes():
    themes = []
    if os.path.exists(THEMES_DIR):
        themes = [d for d in os.listdir(THEMES_DIR)
                 if os.path.isdir(os.path.join(THEMES_DIR, d))]
    return jsonify({'themes': themes})

if __name__ == '__main__':
    print('🎵 Hg+ Media Player starting...')
    print(f'Theme: {CURRENT_THEME}')
    print('Open http://localhost:5000')
    app.run(debug=True, host='0.0.0.0', port=5000)
