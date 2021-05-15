export const baseUrl = (function() {
  const API_KEY = process.env.API_KEY;
  return `${process.env.API_URL}?key=${API_KEY}`;
})();

export const buildQueryText = function(queryParams) {
  let data = "";
  Object.keys(queryParams).forEach(function(key) {
    data = `${data}&${key}=${queryParams[key]}`;
  });

  return data;
};

export const doFetch = function(url, success, error) {
  fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          // console.log(result);
          if (typeof success === "function") {
            success(result);
          }

        (error) => {
          // console.log("error....");
          if (typeof error === "function") {
            error();
          }
        }
      }
    )
};

