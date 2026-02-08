/**
 * Comprehensive seed script to populate Sanity with sample blog posts
 * This will upload images from Unsplash and create complete blog posts
 * 
 * Run with: npx tsx scripts/seed-complete-posts.ts
 */

import {createClient} from '@sanity/client';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.resolve(__dirname, '..', '.env.local')});

if (!process.env.SANITY_AUTH_TOKEN) {
  throw new Error('SANITY_AUTH_TOKEN is missing. Check .env.local.');
}

const client = createClient({
  projectId: 'yr3kaxmk',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN, // You'll get this from Sanity manage
  apiVersion: '2025-02-06',
  useCdn: false,
});

// Helper to generate unique keys
function generateKey() {
  return Math.random().toString(36).substring(2, 15);
}

// Helper to add keys to portable text blocks
function addKeysToBlocks(blocks: any[]): any[] {
  return blocks.map((block) => ({
    ...block,
    _key: generateKey(),
    children: block.children?.map((child: any) => ({
      ...child,
      _key: generateKey(),
    })),
  }));
}

// Helper to upload image from URL
async function uploadImageFromUrl(imageUrl: string, altText: string) {
  try {
    console.log(`  Downloading image from ${imageUrl}`);
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    console.log(`  Uploading image to Sanity...`);
    const asset = await client.assets.upload('image', buffer, {
      filename: `${altText.replace(/\s+/g, '-').toLowerCase()}.jpg`,
    });
    
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
      alt: altText,
    };
  } catch (error) {
    console.error(`  ❌ Error uploading image:`, error);
    return null;
  }
}

const samplePosts = [
  {
    title: '5 Essential Pieces for a Minimalist Living Room',
    slug: 'minimalist-living-room',
    excerpt:
      "Creating a minimalist living room doesn't mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.",
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Minimalist living room with neutral tones',
    category: 'Living Room',
    publishedAt: '2026-01-15T10:00:00Z',
    readingTime: 8,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Creating a minimalist living room doesn't mean sacrificing comfort or style. In fact, it's quite the opposite. By carefully curating a few essential pieces, you can create a space that's both functional and beautiful, where every item serves a purpose and brings you joy.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "The key to achieving a successful minimalist living room lies in understanding that minimalism isn't about deprivation—it's about intention. It's about surrounding yourself with pieces that truly matter and letting go of everything else. Here are the five essential furniture and decor pieces that form the foundation of a perfectly balanced minimalist space.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: "1. A Quality Sofa: Your Living Room's Centerpiece"}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The sofa is undoubtedly the most important piece in any living room, minimalist or otherwise. In a minimalist space, your sofa should be a statement of both comfort and design. Look for clean lines, neutral tones, and timeless silhouettes that won\'t go out of style.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Consider investing in a well-made sofa in natural materials like linen or high-quality cotton. These fabrics age gracefully and develop character over time. Opt for neutral colors like beige, gray, or white that will serve as a calming backdrop for your space.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h3',
        children: [{_type: 'span', text: 'What to Look For:'}],
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {_type: 'span', marks: ['strong'], text: 'Clean, simple lines:'},
          {_type: 'span', text: ' Avoid overly ornate details or complicated shapes'},
        ],
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {_type: 'span', marks: ['strong'], text: 'Neutral colors:'},
          {_type: 'span', text: " Choose versatile shades that won\'t clash with other elements"},
        ],
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {_type: 'span', marks: ['strong'], text: 'Quality construction:'},
          {_type: 'span', text: ' A well-made sofa should last 10-15 years or more'},
        ],
      },
      {
        _type: 'block',
        listItem: 'bullet',
        children: [
          {_type: 'span', marks: ['strong'], text: 'Comfortable cushions:'},
          {_type: 'span', text: " Minimalism doesn\'t mean uncomfortable—test before you buy"},
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: '2. A Versatile Coffee Table'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Your coffee table should be both functional and beautiful. In a minimalist living room, less is more, so choose a coffee table that serves multiple purposes without overwhelming the space.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Look for natural materials like solid wood, stone, or even metal with clean lines. The beauty of natural materials is that they bring warmth and texture to your space while maintaining that minimalist aesthetic.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: '3. Thoughtful Lighting'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Lighting is crucial in any room, but in a minimalist space, it takes on even greater importance. Good lighting can make or break the atmosphere of your living room.',
          },
        ],
      },
    ],
  },
  {
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    slug: 'corner-tv-stand',
    excerpt:
      'Discover how a corner TV stand can maximize your space while maintaining a clean, organized aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Modern corner TV stand setup',
    category: 'Organization',
    publishedAt: '2026-01-16T10:00:00Z',
    readingTime: 6,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'When it comes to small space living, every square inch matters. A corner TV stand is one of the most underutilized solutions for maximizing your living space while maintaining a clean, minimalist aesthetic.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: 'Why Choose a Corner TV Stand?'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Corners are often wasted space in living rooms. By placing your TV stand in a corner, you free up valuable wall space for other furniture or leave it empty for a more spacious feel.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'A well-chosen corner TV stand can become a focal point without dominating the room, helping you maintain the open, airy feeling that defines minimalist design.',
          },
        ],
      },
    ],
  },
  {
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    slug: 'throw-blanket-styling',
    excerpt:
      'Learn how to choose and style the perfect throw blanket to add comfort and visual depth to your living room.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Cozy throw blanket on sofa',
    category: 'Living Room',
    publishedAt: '2026-01-17T10:00:00Z',
    readingTime: 5,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'A throw blanket is more than just a functional item—it\'s a design element that adds texture, warmth, and personality to your living space. The right throw can transform a simple sofa into an inviting focal point.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: 'Choosing the Right Material'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The material of your throw blanket affects both its look and feel. Natural fibers like cotton, linen, and wool are excellent choices for a minimalist home.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Cotton and linen throws are perfect for warmer months, offering breathability and easy care. Wool and cashmere provide luxurious warmth for cooler seasons.',
          },
        ],
      },
    ],
  },
  {
    title: 'Natural Elegance: Decorating with Pampas Grass',
    slug: 'pampas-grass-decor',
    excerpt:
      'Bring natural elegance into your home with pampas grass—a low-maintenance, sustainable way to add texture and beauty to any space.',
    imageUrl: 'https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Pampas grass in a minimalist vase',
    category: 'Materials',
    publishedAt: '2026-01-18T10:00:00Z',
    readingTime: 7,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pampas grass has taken the interior design world by storm, and for good reason. This versatile, low-maintenance dried grass brings texture, height, and natural elegance to any space.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: 'What is Pampas Grass?'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Pampas grass (Cortaderia selloana) is a tall, flowering grass native to South America. When dried, its feathery plumes retain their shape and color for months, making it perfect for long-lasting displays.',
          },
        ],
      },
    ],
  },
  {
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    slug: 'natural-materials',
    excerpt:
      'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Natural materials in modern interior design',
    category: 'Materials',
    publishedAt: '2026-01-05T10:00:00Z',
    readingTime: 9,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "In our increasingly digital world, there's a growing desire to reconnect with nature through our living spaces. Natural materials like wood, stone, and clay bring an organic warmth and authenticity that synthetic materials simply cannot replicate.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: 'The Timeless Appeal of Wood'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Wood is perhaps the most versatile natural material in interior design. From rustic reclaimed barn wood to sleek, modern walnut, wood's warmth and character are unmatched.",
          },
        ],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Each piece of wood tells a story through its grain patterns, knots, and coloration. These natural variations ensure that no two pieces are exactly alike, adding uniqueness to your space.',
          },
        ],
      },
    ],
  },
  {
    title: 'Elevate Your Desk with Shagreen: The Luxury Organizer Trend',
    slug: 'shagreen-desk-organizer',
    excerpt:
      'Discover how shagreen desk organizers bring luxury and sophistication to your workspace while maintaining minimalist principles.',
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&h=800&fit=crop&q=80',
    imageAlt: 'Luxury desk organizer in minimalist workspace',
    category: 'Organization',
    publishedAt: '2026-01-20T10:00:00Z',
    readingTime: 6,
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In the world of luxury desk accessories, shagreen stands out as a material that combines elegance with functionality. These distinctive organizers add a sophisticated touch to any workspace.',
          },
        ],
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{_type: 'span', text: 'What Makes Shagreen Special?'}],
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Shagreen's unique texture and natural patterns create visual interest without overwhelming a minimalist aesthetic. The subtle grain adds depth and character to desk accessories.",
          },
        ],
      },
    ],
  },
];

async function seedPosts() {
  console.log('🌱 Starting comprehensive blog post seeding...\n');
  console.log('This will:');
  console.log('  - Download images from Unsplash');
  console.log('  - Upload them to Sanity');
  console.log('  - Create complete blog posts with all content\n');

  for (const post of samplePosts) {
    try {
      console.log(`\n📝 Creating: ${post.title}`);
      console.log(`   Slug: ${post.slug}`);

      // Upload cover image
      const coverImage = await uploadImageFromUrl(post.imageUrl, post.imageAlt);

      if (!coverImage) {
        console.log(`  ⚠️  Skipping post due to image upload failure\n`);
        continue;
      }

      // Create the post document
      const postDoc = {
        _type: 'post',
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        excerpt: post.excerpt,
        coverImage,
        category: post.category,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        body: addKeysToBlocks(post.body),
      };

      const result = await client.create(postDoc);
      console.log(`  ✅ Created successfully: ${result._id}`);
    } catch (error: any) {
      console.error(`  ❌ Error creating "${post.title}":`, error.message);
    }
  }

  console.log('\n\n✨ Seeding complete!');
  console.log('🎉 Your blog posts are now live in Sanity CMS!');
  console.log('\nNext steps:');
  console.log('1. Visit http://localhost:3333 to see them in Sanity Studio');
  console.log('2. Visit http://localhost:3000/blog to see them on your website');
}

seedPosts();
