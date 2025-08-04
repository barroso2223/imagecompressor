exports.handler = async function(event, context) {
  try {
    const { license_key, instance_name } = JSON.parse(event.body);

    // Call LemonSqueezy activate license endpoint
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        license_key,
        instance_name,  // unique device identifier from client
        metadata: { source: "image-compressor-app" } // optional metadata
      })
    });

    const data = await response.json();
    console.log("License activation response:", data);

    // Determine if valid: activated successfully and no error
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
