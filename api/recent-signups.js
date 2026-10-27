// Returns the most recent real webinar registrants (first name + signup time only) for the
// social-proof toast on /lake-charles-webinar. Needs GHL_API_TOKEN (a GoHighLevel Private
// Integration token with contacts.readonly) set in the Vercel project's environment variables.
const LOCATION_ID = 'rqfDKEvso1ofKq2wgy5d';
const TAG = process.env.WEBINAR_SIGNUP_TAG || 'webinar-registered';

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60, stale-while-revalidate=120');
  const token = process.env.GHL_API_TOKEN;
  if (!token) { res.status(200).json({ signups: [] }); return; }

  try {
    const response = await fetch('https://services.leadconnectorhq.com/contacts/search', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        locationId: LOCATION_ID,
        pageLimit: 10,
        filters: [{ field: 'tags', operator: 'contains', value: [TAG] }],
        sort: [{ field: 'dateAdded', direction: 'desc' }],
      }),
    });
    if (!response.ok) { res.status(200).json({ signups: [] }); return; }
    const data = await response.json();
    const signups = (data.contacts || [])
      .map(c => ({
        name: String(c.firstName || c.firstNameLowerCase || '').trim().split(/\s+/)[0].slice(0, 20),
        at: c.dateAdded,
      }))
      .filter(s => s.name && s.at)
      .map(s => ({ name: s.name.charAt(0).toUpperCase() + s.name.slice(1).toLowerCase(), at: s.at }));
    res.status(200).json({ signups });
  } catch (err) {
    res.status(200).json({ signups: [] });
  }
};
