let apiRoot = "";

if (process.env.BUILD_MODE === "dev") {
  apiRoot = "http://localhost:8000";
}

if (process.env.BUILD_MODE === "production") {
  apiRoot = "https://chello-api-r2zn.onrender.com";
}

console.log(apiRoot);

export const API_ROOT = apiRoot;
