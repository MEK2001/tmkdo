/**
 * Seed script to populate Sanity with sample blog posts
 * Run with: npx tsx scripts/seed-blog-posts.ts
 */

import {createClient} from '@sanity/client';

const client = createClient({
  projectId: 'yr3kaxmk',
  dataset: 'production',
  token: process.env.SANITY_AUTH_TOKEN, // Add this to .env.local
  apiVersion: '2025-02-06',
  useCdn: false,
});

const samplePosts = [
  {
    _type: 'post',
    title: '5 Essential Pieces for a Minimalist Living Room',
    slug: {
      _type: 'slug',
      current: 'minimalist-living-room',
    },
    excerpt:
      "Creating a minimalist living room doesn't mean sacrificing comfort or style. Discover the five essential furniture and decor pieces that form the foundation of a perfectly balanced space.",
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder', // Will use Unsplash URL
      },
      alt: 'Minimalist living room with neutral tones',
    },
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
            text: 'The sofa is undoubtedly the most important piece in any living room, minimalist or otherwise. In a minimalist space, your sofa should be a statement of both comfort and design. Look for clean lines, neutral tones, and timeless silhouettes that won't go out of style.',
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
          {_type: 'span', text: " Choose versatile shades that won't clash with other elements"},
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
    ],
  },
  {
    _type: 'post',
    title: 'Maximize Your Space: The Corner TV Stand Solution',
    slug: {
      _type: 'slug',
      current: 'corner-tv-stand',
    },
    excerpt:
      'Discover how a corner TV stand can maximize your space while maintaining a clean, organized aesthetic.',
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder',
      },
      alt: 'Modern corner TV stand setup',
    },
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
    ],
  },
  {
    _type: 'post',
    title: 'The Art of Layering: Choosing the Perfect Throw Blanket',
    slug: {
      _type: 'slug',
      current: 'throw-blanket-styling',
    },
    excerpt:
      'Learn how to choose and style the perfect throw blanket to add comfort and visual depth to your living room.',
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder',
      },
      alt: 'Cozy throw blanket on sofa',
    },
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
            text: 'A throw blanket is more than just a functional item—it's a design element that adds texture, warmth, and personality to your living space. The right throw can transform a simple sofa into an inviting focal point.',
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
    ],
  },
  {
    _type: 'post',
    title: 'Natural Elegance: Decorating with Pampas Grass',
    slug: {
      _type: 'slug',
      current: 'pampas-grass-decor',
    },
    excerpt:
      'Bring natural elegance into your home with pampas grass—a low-maintenance, sustainable way to add texture and beauty to any space.',
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder',
      },
      alt: 'Pampas grass in a minimalist vase',
    },
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
    _type: 'post',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    slug: {
      _type: 'slug',
      current: 'natural-materials',
    },
    excerpt:
      'Explore how natural materials bring warmth, texture, and authenticity to contemporary interiors. From reclaimed wood to handcrafted ceramics, discover the beauty of organic elements.',
    coverImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder',
      },
      alt: 'Natural materials in modern interior design',
    },
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
    ],
  },
];

async function seedPosts() {
  console.log('🌱 Starting to seed blog posts...\n');

  for (const post of samplePosts) {
    try {
      console.log(`Creating: ${post.title}`);
      const result = await client.create(post);
      console.log(`✅ Created: ${result._id}\n`);
    } catch (error) {
      console.error(`❌ Error creating "${post.title}":`, error);
    }
  }

  console.log('✨ Seeding complete!');
}

seedPosts();
