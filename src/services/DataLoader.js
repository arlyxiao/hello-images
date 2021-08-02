export const baseUrl = (function() {
  const API_KEY = process.env.API_KEY;
  return `${process.env.API_URL}?key=${API_KEY}`;
})();

export const buildQueryText = function(queryParams) {
  let data = "";
  Object.keys(queryParams).forEach(function(key) {
    data = `${data}&${key}=${encodeURIComponent(queryParams[key])}`;
  });

  return data;
};

export const buildUrlByQuery = function(queryParams, currentQuery, pagniation) {
  const mergedParams = Object.assign({}, queryParams, currentQuery);
  const queryText = buildQueryText(mergedParams);
  const url =  `${baseUrl}${queryText}&per_page=${pagniation.perPage}&page=${pagniation.page}`;

  return url;
}

export const doFetch = function(url, signal) {
  return fetch(url, {signal})
           .then(res => res.json());
};

