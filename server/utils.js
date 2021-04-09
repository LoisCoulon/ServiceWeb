import { SERVER_CONFIG } from './sever-config'

export const utils = {
  themoviedbUrl: _themoviedbUrl,
  getIdMovieFromPathParams: _getIdMovieFromPathParams
}

function _themoviedbUrl(key) {
  let url;
  switch (key) {
    case 'discover':
      url = SERVER_CONFIG.themoviedb_api_config.base_url + 'discover/movie?api_key=' + SERVER_CONFIG.themoviedb_api_config.api_key + '&language=' + SERVER_CONFIG.themoviedb_api_config.language;
      break;
  }
  return url;
}

function _getIdMovieFromPathParams(path) {
    return path.split("/")[1];
}