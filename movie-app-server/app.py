from flask import Flask, render_template, request
import MoviesDao

app = Flask(__name__, static_url_path='', static_folder='../movie-app/build/')

@app.route('/')
@app.route('/available-movies')
@app.route('/my-movies')
@app.route('/purchase-movie')
@app.route('/credit-balance')
@app.route('/search-movies')
def index():
    return app.send_static_file('index.html')

@app.route('/api/movies/genre')
def getAvailableMoviesGenre():
    return {'genres': MoviesDao.getAvailableMoviesGenre()}

@app.route('/api/movies/genre/<genre>')
def getGenreMovies(genre):
    return {'movies': MoviesDao.getGenreMovies(genre)}

@app.route('/api/movies/my')
def getmyMovies():
    return {'movies': MoviesDao.getMyMovies()}

@app.route('/api/credit/balance')
def getCreditBalance():
    return {'balance': MoviesDao.getCreditBalance()}

@app.route('/api/movies/search/<query>')
def searchMovies(query):
    return {'movies': MoviesDao.searchMovies(query)}

@app.route('/api/movie/purchase', methods = ['POST'])
def purchaseMovie():
    return MoviesDao.purchaseMovie(request.json['movieName'])

if __name__ == '__main__':
    app.run(debug=False)
