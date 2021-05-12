const sendRequest = function(url) {
  return fetch(url).then(res => res.json());
};

export default fetchData;
