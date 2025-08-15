const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

module.exports = async (req, res) => {
  // Read current count
  let { data, error } = await supabase
    .from('view_counter')
    .select('count')
    .eq('id', 1)
    .single();

  if (error) {
    console.log(error);
    res.status(500).send("Database error");
    return;
  }

  let newCount = data.count + 1;

  // Update count
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
