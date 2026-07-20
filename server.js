require('dotenv').config();
const express = require('express');
const app = express();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY; // service_role key, server-side only

app.use(express.static('public')); // put index.html in ./public

app.get('/api/check-passport', async (req, res) => {
  const pn = (req.query.number || '').trim();
  if (!pn) return res.status(400).json({ error: 'missing number' });

  const r = await fetch(
    `${SUPABASE_URL}/rest/v1/passports?passport_number=eq.${encodeURIComponent(pn)}&select=passport_number,status,surname,firstname,expires_at`,
    { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
  );
  const data = await r.json();
  res.json(data);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));