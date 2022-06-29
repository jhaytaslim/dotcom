export default {
  // corsOrigin: process.env.CORS_PATH || "http://localhost:3000",
  corsOrigin: process.env.CORS_PATH || "*",
  port: process.env.PORT || 4001,
  host: "localhost",
  stripeKey: "sk_test_26PHem9AhJZvU623DfE1x4sd",
  jwt: {
    key: "sk_test_26PHem9AhJZvU623DfE1x4sd",
    expireDate: "1200s",
  }
};
