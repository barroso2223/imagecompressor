// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { license_key } = req.body;

//   try {
//     const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
//       },
//       body: JSON.stringify({ license_key })
//     });

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("Error validating license:", error);
//     res.status(500).json({ error: "Server error validating license" });
//   }
// }

// If your environment supports native fetch, you can omit node-fetch import.
// Otherwise, install node-fetch and import as:
// const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const { license_key } = JSON.parse(event.body);

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
