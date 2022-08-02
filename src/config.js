const config = {
  APIEndpoint: "http://localhost:4000",
  headers: {
    "x-access-token": localStorage.usertoken,
  },
};
export default config;
