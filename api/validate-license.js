export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { license_key } = req.body;

  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/license-keys/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
      },
      body: JSON.stringify({ license_key })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error validating license:", error);
    res.status(500).json({ error: "Server error validating license" });
  }
}
