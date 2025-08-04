exports.handler = async function(event, context) {
  const { license_key } = JSON.parse(event.body);

  const response = await fetch("https://api.lemonsqueezy.com/v1/license-keys/validate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
    },
    body: JSON.stringify({ license_key })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
