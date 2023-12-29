import yfinance as yf
from flask import request, render_template, jsonify, Flask

app = Flask(__name__, template_folders-'templates')

@app.route('/')
def ticker_index():
  return render_template('ticker_index.html')

@app.route(rule:'/get_stock_data', methods=['POST'])
def get_stock_data():
  ticker = request.get_json()['ticker']
  data = yf.Ticker(ticker).history(period='1y')
  return jsonify({'curentPrice': data.iloc[-1].Close, 'openPrice': data.iloc[-1].Open})

if __name__ == '__main__':
  app.run(debug=True)
