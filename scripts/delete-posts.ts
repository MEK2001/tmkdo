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

async function deleteAllPosts() {
  console.log('\n🗑️  Deleting all existing blog posts...\n');
  
  const posts = await client.fetch(`*[_type == "post"]{ _id }`);
  
  for (const post of posts) {
    await client.delete(post._id);
    console.log(`  ✅ Deleted post: ${post._id}`);
  }
  
  console.log(`\n✨ Deleted ${posts.length} posts\n`);
}

deleteAllPosts().catch(console.error);
