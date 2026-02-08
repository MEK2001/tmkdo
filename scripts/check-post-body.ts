import {createClient} from '@sanity/client';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '..', '.env.local')});

const client = createClient({
  projectId: 'yr3kaxmk',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN,
  apiVersion: '2025-02-06',
  useCdn: false,
});

async function checkPostBody() {
  const post = await client.fetch(`
    *[_type == "post"][0] {
      _id,
      title,
      "slug": slug.current,
      body
    }
  `);
  
  console.log('\n📄 First Post Data:');
  console.log('Title:', post.title);
  console.log('Slug:', post.slug);
  console.log('Body exists:', !!post.body);
  console.log('Body length:', post.body?.length || 0);
  console.log('\nFirst 3 blocks:');
  console.log(JSON.stringify(post.body?.slice(0, 3), null, 2));
}

checkPostBody().catch(console.error);
