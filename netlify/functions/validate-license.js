// validate-license.js (Netlify serverless function)

const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  try {
    const { license_key, instance_id, instance_name } = JSON.parse(event.body);

    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key,
        instance_id,
        instance_name,
        metadata: { source: "shrinkifly" }
      })
    });

    const data = await response.json();
    console.log("License activation response:", data);

    const isValid = data.activated === true && !data.error;

    return {
      statusCode: 200,
      body: JSON.stringify({ valid: isValid, data })
    };

  } catch (error) {
    console.error("License activation error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
