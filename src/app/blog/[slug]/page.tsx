import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import styles from './page.module.css';

// Blog post data
const blogPosts: Record<string, BlogPost> = {
  'minimalist-living-room': {
    slug: 'minimalist-living-room',
    title: '5 Essential Pieces for a Minimalist Living Room',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&q=80',
    category: 'Living Room',
    readTime: '8 min read',
    content: `
      <p>Creating a minimalist living room doesn't mean sacrificing comfort or style. In fact, it's quite the opposite. By carefully curating a few essential pieces, you can create a space that's both functional and beautiful, where every item serves a purpose and brings you joy.</p>

      <p>The key to achieving a successful minimalist living room lies in understanding that minimalism isn't about deprivation—it's about intention. It's about surrounding yourself with pieces that truly matter and letting go of everything else. Here are the five essential furniture and decor pieces that form the foundation of a perfectly balanced minimalist space.</p>

      <h2>1. A Quality Sofa: Your Living Room's Centerpiece</h2>
      <p>The sofa is undoubtedly the most important piece in any living room, minimalist or otherwise. In a minimalist space, your sofa should be a statement of both comfort and design. Look for clean lines, neutral tones, and timeless silhouettes that won't go out of style.</p>

      <p>Consider investing in a well-made sofa in natural materials like linen or high-quality cotton. These fabrics age gracefully and develop character over time. Opt for neutral colors like beige, gray, or white that will serve as a calming backdrop for your space.</p>

      <h3>What to Look For:</h3>
      <ul>
        <li><strong>Clean, simple lines:</strong> Avoid overly ornate details or complicated shapes</li>
        <li><strong>Neutral colors:</strong> Choose versatile shades that won't clash with other elements</li>
        <li><strong>Quality construction:</strong> A well-made sofa should last 10-15 years or more</li>
        <li><strong>Comfortable cushions:</strong> Minimalism doesn't mean uncomfortable—test before you buy</li>
      </ul>

      <h2>2. A Versatile Coffee Table</h2>
      <p>Your coffee table should be both functional and beautiful. In a minimalist living room, less is more, so choose a coffee table that serves multiple purposes without overwhelming the space.</p>

      <p>Look for natural materials like solid wood, stone, or even metal with clean lines. The beauty of natural materials is that they bring warmth and texture to your space while maintaining that minimalist aesthetic.</p>

      <h3>Coffee Table Tips:</h3>
      <ul>
        <li>Choose a size proportional to your sofa (roughly two-thirds the length)</li>
        <li>Consider tables with hidden storage to keep surfaces clutter-free</li>
        <li>Natural wood brings warmth; glass or metal creates a lighter feel</li>
        <li>Leave breathing room—your coffee table shouldn't touch the sofa</li>
      </ul>

      <h2>3. Thoughtful Lighting</h2>
      <p>Lighting is crucial in any room, but in a minimalist space, it takes on even greater importance. Good lighting can make or break the atmosphere of your living room.</p>

      <p>Layer your lighting with a combination of ambient, task, and accent lighting. A statement floor lamp or pendant light can serve as both functional lighting and a piece of art. Choose fixtures with simple, sculptural designs that complement your space without overwhelming it.</p>

      <h3>Lighting Essentials:</h3>
      <ul>
        <li>One primary light source (ceiling fixture or large floor lamp)</li>
        <li>Task lighting for reading or working (adjustable floor or table lamp)</li>
        <li>Consider dimmer switches for versatility</li>
        <li>Natural light is your best friend—keep window treatments simple</li>
      </ul>

      <h2>4. A Statement Rug</h2>
      <p>A quality rug anchors your living room and adds warmth, texture, and definition to your space. In a minimalist room, your rug can be a subtle foundation or a bold statement—just make sure it's intentional.</p>

      <p>Natural fiber rugs like jute, sisal, or wool are excellent choices. They're durable, sustainable, and bring organic texture to your space. Stick to neutral tones or simple geometric patterns that won't compete with other elements.</p>

      <h3>Rug Selection Guide:</h3>
      <ul>
        <li>Size matters: Your rug should extend beyond the front legs of your furniture</li>
        <li>Natural fibers are durable and eco-friendly</li>
        <li>Neutral colors provide a calming foundation</li>
        <li>Simple patterns work better than busy designs in minimalist spaces</li>
      </ul>

      <h2>5. Minimal, Meaningful Decor</h2>
      <p>The final essential isn't a single piece but rather a curated selection of meaningful decor items. In minimalist design, every decorative element should serve a purpose, whether functional or emotional.</p>

      <p>This might include a single piece of art that speaks to you, a collection of three ceramic vases, or a carefully chosen plant. The key is to display these items with plenty of breathing room, allowing each piece to shine individually.</p>

      <h3>Decor Guidelines:</h3>
      <ul>
        <li><strong>The rule of three:</strong> Group decorative items in odd numbers for visual appeal</li>
        <li><strong>One statement piece:</strong> Choose one larger item rather than many small ones</li>
        <li><strong>Plants for life:</strong> Living greenery adds vitality without clutter</li>
        <li><strong>Personal meaning:</strong> Display only items that bring you genuine joy</li>
      </ul>

      <h2>Bringing It All Together</h2>
      <p>Creating a minimalist living room is about more than just buying the right furniture—it's about creating a space that feels intentional, calm, and uniquely yours. These five essential pieces provide the foundation, but the magic happens when you arrange them in a way that reflects your personal style and meets your needs.</p>

      <p>Remember, minimalism is a journey, not a destination. Start with these essentials and build from there, always asking yourself if each new item truly adds value to your space. The result will be a living room that not only looks beautiful but also feels like a sanctuary from the chaos of everyday life.</p>
    `,
  },
  'decluttering-guide': {
    slug: 'decluttering-guide',
    title: 'The Art of Decluttering: A Room-by-Room Guide',
    date: 'January 10, 2026',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1200&h=800&fit=crop&q=80',
    category: 'Organization',
    readTime: '12 min read',
    content: `
      <p>Decluttering can feel overwhelming, but it doesn't have to be. With a systematic approach and the right mindset, you can transform your home into a peaceful sanctuary that supports your wellbeing and reflects your values.</p>

      <p>The key to successful decluttering isn't about throwing everything away or living with nothing. It's about intentionally choosing what stays in your life and creating systems that prevent clutter from accumulating again.</p>

      <h2>The Decluttering Mindset</h2>
      <p>Before you start, it's important to understand why you're decluttering. Are you seeking more space? Peace of mind? Easier cleaning? Understanding your "why" will keep you motivated when the process gets challenging.</p>

      <h3>Key Principles:</h3>
      <ul>
        <li>Keep only what serves a purpose or brings genuine joy</li>
        <li>One in, one out—for every new item, remove one</li>
        <li>Everything deserves a designated home</li>
        <li>Maintenance is ongoing, not a one-time event</li>
      </ul>

      <h2>Room 1: The Kitchen</h2>
      <p>Start with the kitchen, as it's often the heart of the home and the most used space. A cluttered kitchen makes cooking stressful and meal planning difficult.</p>

      <h3>Kitchen Decluttering Steps:</h3>
      <ul>
        <li><strong>Countertops:</strong> Keep only daily-use items visible (coffee maker, knife block, utensil holder)</li>
        <li><strong>Cabinets:</strong> Remove duplicate items, broken pieces, and things you never use</li>
        <li><strong>Pantry:</strong> Check expiration dates, consolidate items, use clear containers</li>
        <li><strong>Drawers:</strong> Keep only essential utensils and tools you actually use</li>
        <li><strong>Appliances:</strong> If you haven't used it in 6 months, consider donating it</li>
      </ul>

      <h2>Room 2: The Living Room</h2>
      <p>Your living room should be a place of relaxation and connection. Remove anything that doesn't contribute to these goals.</p>

      <h3>Living Room Focus Areas:</h3>
      <ul>
        <li>Clear coffee tables of everything except 1-2 decorative items</li>
        <li>Reduce throw pillows to a functional number (2-4 is usually plenty)</li>
        <li>Organize media—switch to digital or keep only favorites</li>
        <li>Create dedicated storage for everyday items like remotes and magazines</li>
      </ul>

      <h2>Room 3: The Bedroom</h2>
      <p>Your bedroom should be a peaceful retreat. Remove work items, exercise equipment, and excessive decor to create a space dedicated to rest.</p>

      <h3>Bedroom Decluttering:</h3>
      <ul>
        <li><strong>Closet:</strong> Use the 80/20 rule—you wear 20% of your clothes 80% of the time</li>
        <li><strong>Nightstands:</strong> Keep only essentials (lamp, book, glass of water)</li>
        <li><strong>Under the bed:</strong> Clear it out or use only for seasonal storage</li>
        <li><strong>Surfaces:</strong> Remove all but 1-2 meaningful decorative items</li>
      </ul>

      <h2>Room 4: The Bathroom</h2>
      <p>Bathrooms accumulate products quickly. A streamlined bathroom routine with quality products beats a cluttered counter with dozens of options.</p>

      <h3>Bathroom Tips:</h3>
      <ul>
        <li>Check expiration dates on medications and cosmetics</li>
        <li>Keep only products you use regularly on counters</li>
        <li>Limit towel sets to one per person plus 1-2 for guests</li>
        <li>Use drawer dividers to organize small items</li>
      </ul>

      <h2>Maintaining Your Decluttered Home</h2>
      <p>Decluttering isn't a one-time event—it's an ongoing practice. Implement these habits to maintain your peaceful space:</p>

      <ul>
        <li><strong>Daily reset:</strong> Spend 10 minutes each evening returning items to their homes</li>
        <li><strong>Weekly review:</strong> Check for clutter hot spots and address them</li>
        <li><strong>Monthly evaluation:</strong> Assess if any recent purchases should stay or go</li>
        <li><strong>Seasonal refresh:</strong> Deep declutter once per season</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Remember, decluttering is personal. What works for one person may not work for another. The goal isn't to have the least amount of stuff possible—it's to keep only what serves you and brings value to your life. Start small, be patient with yourself, and celebrate your progress along the way.</p>
    `,
  },
  'natural-materials': {
    slug: 'natural-materials',
    title: 'Natural Materials in Modern Homes: Wood, Stone & Clay',
    date: 'January 5, 2026',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&q=80',
    category: 'Materials',
    readTime: '10 min read',
    content: `
      <p>In an increasingly digital world, bringing natural materials into our homes connects us to the earth and creates spaces that feel grounding, authentic, and timeless. Natural materials like wood, stone, and clay have been used in home design for thousands of years, and their appeal has never been stronger.</p>

      <p>These materials bring more than just visual beauty—they offer texture, warmth, and a sense of permanence that synthetic materials simply can't replicate. Let's explore how to incorporate these organic elements into your modern home.</p>

      <h2>Wood: Warmth and Character</h2>
      <p>Wood is perhaps the most versatile natural material in home design. From structural beams to small decorative accents, wood brings warmth and organic beauty to any space.</p>

      <h3>Types of Wood for Different Uses:</h3>
      <ul>
        <li><strong>Oak:</strong> Durable and timeless, perfect for furniture and flooring</li>
        <li><strong>Walnut:</strong> Rich, dark tones add sophistication to any space</li>
        <li><strong>Pine:</strong> Lighter and more affordable, ideal for rustic or Scandinavian styles</li>
        <li><strong>Teak:</strong> Weather-resistant, excellent for outdoor furniture</li>
        <li><strong>Reclaimed wood:</strong> Sustainable choice with unique character and history</li>
      </ul>

      <h3>How to Use Wood:</h3>
      <ul>
        <li>Wooden furniture as statement pieces</li>
        <li>Exposed beams for architectural interest</li>
        <li>Wood flooring for warmth underfoot</li>
        <li>Cutting boards and serving pieces in the kitchen</li>
        <li>Wooden bowls and trays as decorative accents</li>
      </ul>

      <h2>Stone: Permanence and Elegance</h2>
      <p>Stone brings a sense of permanence and connection to the earth. Each piece is unique, with its own patterns, colors, and textures formed over millions of years.</p>

      <h3>Popular Stone Types:</h3>
      <ul>
        <li><strong>Marble:</strong> Luxurious and classic, beautiful veining patterns</li>
        <li><strong>Granite:</strong> Extremely durable, perfect for high-use surfaces</li>
        <li><strong>Limestone:</strong> Soft, natural appearance with warm tones</li>
        <li><strong>Slate:</strong> Modern look with natural texture</li>
        <li><strong>Travertine:</strong> Porous with natural pits, creates interesting patterns</li>
      </ul>

      <h3>Stone in Your Home:</h3>
      <ul>
        <li>Kitchen and bathroom countertops</li>
        <li>Fireplace surrounds</li>
        <li>Accent walls or backsplashes</li>
        <li>Decorative objects like bookends or sculptures</li>
        <li>Natural stone coasters and trivets</li>
      </ul>

      <h2>Clay & Ceramics: Handcrafted Beauty</h2>
      <p>Clay objects, from handmade pottery to artisan tiles, bring an irreplaceable handcrafted quality to your home. Each piece bears the mark of its maker, connecting you to a tradition of craftsmanship that spans millennia.</p>

      <h3>Incorporating Ceramics:</h3>
      <ul>
        <li><strong>Pottery:</strong> Vases, bowls, and planters in earthy glazes</li>
        <li><strong>Tiles:</strong> Handmade tiles for backsplashes or feature walls</li>
        <li><strong>Tableware:</strong> Artisan plates, mugs, and serving pieces</li>
        <li><strong>Decorative objects:</strong> Sculptural pieces and wall hangings</li>
      </ul>

      <h3>Why Choose Handmade Ceramics:</h3>
      <ul>
        <li>Each piece is unique with subtle variations</li>
        <li>Supports independent artists and craftspeople</li>
        <li>Natural, non-toxic materials</li>
        <li>Timeless beauty that doesn't go out of style</li>
        <li>Develops character with use and age</li>
      </ul>

      <h2>Combining Natural Materials</h2>
      <p>The magic happens when you thoughtfully combine different natural materials. The key is to let each material shine while creating a cohesive whole.</p>

      <h3>Pairing Guidelines:</h3>
      <ul>
        <li><strong>Wood + Stone:</strong> Classic combination, balance warm wood with cool stone</li>
        <li><strong>Clay + Wood:</strong> Earthy and organic, perfect for minimalist spaces</li>
        <li><strong>Stone + Metal:</strong> Modern and sophisticated, metal accents complement stone</li>
        <li><strong>All three together:</strong> Layer textures for depth and interest</li>
      </ul>

      <h2>Caring for Natural Materials</h2>
      <p>Natural materials require some care, but proper maintenance ensures they'll last for generations.</p>

      <h3>Wood Care:</h3>
      <ul>
        <li>Oil regularly to prevent drying and cracking</li>
        <li>Clean with mild soap and water, dry immediately</li>
        <li>Avoid direct sunlight to prevent fading</li>
      </ul>

      <h3>Stone Care:</h3>
      <ul>
        <li>Seal porous stones annually</li>
        <li>Wipe spills immediately to prevent staining</li>
        <li>Use pH-neutral cleaners only</li>
      </ul>

      <h3>Ceramic Care:</h3>
      <ul>
        <li>Most are dishwasher safe, but handwashing extends life</li>
        <li>Avoid thermal shock (extreme temperature changes)</li>
        <li>Store carefully to prevent chipping</li>
      </ul>

      <h2>Sustainability Considerations</h2>
      <p>When choosing natural materials, consider their environmental impact:</p>

      <ul>
        <li>Look for FSC-certified wood from sustainably managed forests</li>
        <li>Choose local stone to reduce transportation emissions</li>
        <li>Support local artisans and small-batch producers</li>
        <li>Consider reclaimed or salvaged materials</li>
        <li>Invest in quality pieces that will last decades</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Natural materials bring irreplaceable beauty, warmth, and authenticity to modern homes. Whether you're incorporating a single wooden bowl or redesigning an entire space around natural elements, these materials create environments that feel grounded, peaceful, and timeless. Start small, choose quality over quantity, and build a home filled with materials that connect you to the natural world.</p>
    `,
  },
};

interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  readTime: string;
  content: string;
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - The Minimalist Kraft & DO`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <article className={styles.article}>
      <header className={styles.articleHeader}>
        <div className={styles.category}>{post.category}</div>
        <h1>{post.title}</h1>
        <div className={styles.articleInfo}>
          <span>📅 {post.date}</span>
          <span>⏱️ {post.readTime}</span>
        </div>
      </header>

      <div className={styles.featuredImage}>
        <img src={post.image} alt={post.title} />
      </div>

      <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
