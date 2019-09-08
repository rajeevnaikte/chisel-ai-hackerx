import json

myMovieFile = '../master/my_movies.json'
availableMoviesCache = None
with open('../master/available_movies.json') as json_file:
    availableMoviesCache = json.load(json_file)

myMoviesCache = []
with open(myMovieFile) as json_file:
    myMoviesCache = json.load(json_file)

creditBalance = 100

def getCreditBalance():
    return creditBalance

def getAvailableMoviesGenre():
    return [*availableMoviesCache]

def getGenreMovies(genre):
    return availableMoviesCache[genre]

def getMyMovies():
    myMovies = []
    for genre in myMoviesCache:
        myMovies += myMoviesCache[genre]
    return myMovies

def isMoviePurchased(movieName):
    for genre in myMoviesCache:
        for myMovie in myMoviesCache[genre]:
            if myMovie.title == movieName:
                return True
    return False

def getMovie(movieName):
    for genre in availableMoviesCache:
        for movie in availableMoviesCache[genre]:
            if movie['title'] == movieName:
                return genre, movie
    return None

def addMovieToMyList(genre, moive):
    if genre not in myMoviesCache:
        myMoviesCache[genre] = []
    moive['watched'] = False
    myMoviesCache[genre] += [moive]
    with open(myMovieFile, 'w') as outfile:
        json.dump(myMoviesCache, outfile)

def purchaseMovie(movieName):
    genre, movie = getMovie(movieName)
    global creditBalance
    if creditBalance < movie['cost']:
        return {'noBalance': True}
    addMovieToMyList(genre, movie)
    creditBalance -= movie['cost']
    return {'success': True}

def searchMovies(query):
    result = {'purchased': [], 'available': []}
    myMovies = []
    for genre in myMoviesCache:
        for movie in myMoviesCache[genre]:
            if query in movie['title'].lower():
                result['purchased'] += [movie]
                myMovies += [movie['title']]
    for genre in availableMoviesCache:
        for movie in availableMoviesCache[genre]:
            if query in movie['title'].lower() and movie['title'] not in myMovies:
                result['available'] += [movie]
    return result
