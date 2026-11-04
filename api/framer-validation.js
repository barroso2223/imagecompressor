// File: api/framer-validation.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { license_key } = req.body;

    if (!license_key) {
        return res.status(400).json({ valid: false, error: "License key is required" });
    }

    try {
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

        return res.status(200).json({
            valid: isValid,
            data: {
                license_key: {
                    status: license?.status,
                    expires_at: license?.expires_at,
                    activation_limit: license?.activation_limit,
                    activation_usage: license?.activation_usage
                }
            }
        });

    } catch (error) {
        console.error("License activation error:", error);
        return res.status(500).json({ valid: false, error: "Server error validating license" });
    }
}