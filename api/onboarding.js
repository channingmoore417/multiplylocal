module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const GHL_WEBHOOK = 'https://services.leadconnectorhq.com/hooks/rqfDKEvso1ofKq2wgy5d/webhook-trigger/a53c3bf5-9c17-4277-819f-375d5469de00';

  try {
    const response = await fetch(GHL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    res.status(response.ok ? 200 : 502).json({ success: response.ok });
  } catch (err) {
    res.status(502).json({ success: false });
  }
};
