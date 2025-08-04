const fetch = require('node-fetch');

exports.handler = async function(event) {
  try {
    const { license_key, instance_id, instance_name } = JSON.parse(event.body);

    // Step 1: Activate the license
    const activationResponse = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key,
        instance_id,      // Optional: uniquely identify the device/browser
        instance_name,    // Optional: user-readable name
        metadata: { source: "shrinkifly" }
      })
    });

    const activationData = await activationResponse.json();
    console.log("License activation response:", activationData);

    const license = activationData.license_key || {};
    const isValid = activationData.activated === true && license.status === 'active';

    return {
      statusCode: 200,
      body: JSON.stringify({
        valid: isValid,
        data: {
          license_key: license,
          instance: activationData.instance || null,
          meta: activationData.meta || null
        }
      })
    };

  } catch (error) {
    console.error("License validation error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
