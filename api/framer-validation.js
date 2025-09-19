// File: api/framer-validation.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { license_key } = req.body;
    if (!license_key) {
        return res.status(400).json({ valid: false, message: "License key is required." });
    }

    const LEMONSQUEEZY_API_KEY = process.env.LEMONSQUEEZY_API_KEY;

    try {
        const response = await fetch("https://api.lemonsqueezy.com/v1/licenses/validate", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${LEMONSQUEEZY_API_KEY}`,
            },
            body: JSON.stringify({ license_key }),
        });

        const data = await response.json();
        const isValid = data.valid && data.meta.status === 'active';

        if (isValid) {
            return res.status(200).json({ valid: true, message: "License is active!", license_data: data });
        } else {
            return res.status(200).json({ valid: false, message: data.error || `License is not active. Status: ${data.meta.status}`, license_data: data });
        }

    } catch (error) {
        console.error("License validation error:", error);
        return res.status(500).json({ error: "Server error validating license" });
    }
}