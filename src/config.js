const config = {
  APIEndpoint: "https://kwizapp.herokuapp.com",
  headers: {
    "x-access-token": localStorage.usertoken,
  },
};
export default config;
