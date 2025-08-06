export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { license_key } = req.body;

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/activate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
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

    const isValid = data.license_key?.status === 'active' && !data.error;

    return res.status(200).json({ valid: isValid, data });

  } catch (error) {
    console.error("License activation error:", error);
    return res.status(500).json({ error: "Server error validating license" });
  }
}
