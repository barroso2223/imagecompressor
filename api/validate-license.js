export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { license_key } = req.body;

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ license_key })
    });

    const data = await response.json();

    console.log("🍋 Validation response:", data);

    const isValid = data.valid === true && data.data?.attributes?.status === 'active';
    const expiresAt = data.data?.attributes?.expires_at || null;

    return res.status(200).json({ valid: isValid, expiresAt, data });

  } catch (error) {
    console.error("License validation error:", error);
    return res.status(500).json({ error: "Server error validating license" });
  }
}
