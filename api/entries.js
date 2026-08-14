const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { name, dept, years, facebook, phone } = req.body;

    if (!name || !dept || !years) {
      return res.status(400).json({ error: 'name, dept, years প্রয়োজন' });
    }

    const { data, error } = await supabase
      .from('entries')
      .insert([{ name, dept, years, facebook, phone }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
};
