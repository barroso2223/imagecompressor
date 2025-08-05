export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { license_key } = req.body;

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,  // Match Netlify's key name
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

    res.status(200).json({ valid: isValid, data });

  } catch (error) {
    console.error("License activation error:", error);
    res.status(500).json({ error: error.message });
  }
}
