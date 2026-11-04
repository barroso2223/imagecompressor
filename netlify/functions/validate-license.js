// If your environment supports native fetch, you can omit node-fetch import.
// Otherwise, install node-fetch and import as:
// const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  try {
    const { license_key } = JSON.parse(event.body);

    if (!license_key) {
      return {
        statusCode: 400,
        body: JSON.stringify({ valid: false, error: "License key is required" })
      };
    }

    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        license_key,
        instance_name: "ShrinkiFly",
        metadata: { source: "image-compressor-app" }
      })
    });

    const data = await response.json();
    console.log("🍋 Validation response:", data);

    // Check if activation was successful and license is active
    const license = data.license_key;
    const isValid = data.activated === true && license?.status === 'active' && !data.error;

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: isValid,
        data: {
          license_key: {
            status: license?.status,
            expires_at: license?.expires_at,
            activation_limit: license?.activation_limit,
            activation_usage: license?.activation_usage
          }
        }
      })
    };

  } catch (error) {
    console.error("License activation error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ valid: false, error: "Server error validating license" })
    };
  }
};
