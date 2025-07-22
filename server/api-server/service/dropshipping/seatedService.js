import axios from "axios";

const CJ_AUTH_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";

const email = process.env.CJ_EMAIL;
const password = process.env.CJ_API_KEY;

export async function getCJAccessToken() {
  console.log("🚀 Fetching CJ Access Token...");
  try {
    const response = await axios.post(
      CJ_AUTH_URL,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );



    if (response.data.code === 200 && response.data.result) {
      const { accessToken, accessTokenExpiryDate } = response.data.data;
      console.log("✅ Access Token:", accessToken);
      console.log("🕒 Expires At:", accessTokenExpiryDate);
      return accessToken;
    } else {
      console.error("❌ CJ Token Fetch Failed:", response.data.message);
      return null;
    }
  } catch (err) {
    console.error("🚨 Error fetching CJ token:", err.message);
    return null;
  }
}

export async function fetchCJProducts(accessToken) {
  try {
    const response = await axios.post(
      "https://developers.cjdropshipping.com/api2.0/v1/product/list",
      {
        pageNum: 1,
        pageSize: 1, // fetch 1 product for testing
      },
      {
        headers: {
          "CJ-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    const products = response.data?.data?.list || [];
    console.log("✅ CJ Products Fetched:", products.length);
    return products;
  } catch (err) {
    console.error("❌ Error fetching CJ products:", err.message);
    return [];
  }
}
