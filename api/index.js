const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
  let { data, error } = await supabase
    .from('view_counter')
    .select('count')
    .eq('id', 1)
    .maybeSingle(); // instead of .single()

  if (!data) {
    await supabase
      .from('view_counter')
      .insert({ id: 1, count: 0 });

    data = { count: 0 };
  }

  let newCount = data.count + 1;

  await supabase
    .from('view_counter')
    .update({ count: newCount })
    .eq('id', 1);

  res.setHeader('Content-Type', 'image/svg+xml');
  res.status(200).send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="30">
      <rect width="160" height="30" fill="#0e75b6"/>
      <text x="10" y="20" font-size="16" fill="#fff">Views: ${newCount}</text>
    </svg>
  `);
};
