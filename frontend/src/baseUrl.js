const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000"
    : "https://faeshare.herokuapp.com";

export default baseUrl;