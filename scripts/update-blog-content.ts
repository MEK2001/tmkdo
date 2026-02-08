/**
 * Script to update Sanity blog posts with content from remote repository
 * Converts HTML content to Portable Text format
 */

import {createClient} from '@sanity/client';
import {JSDOM} from 'jsdom';
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

// Helper to generate unique keys
function generateKey() {
  return Math.random().toString(36).substring(2, 15);
}

// Convert HTML to Portable Text blocks
function htmlToPortableText(html: string): any[] {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const blocks: any[] = [];

  // Get all direct children of the content
  const elements = doc.body.children;

  for (const element of Array.from(elements)) {
    const tagName = element.tagName.toLowerCase();

    if (tagName === 'p') {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'normal',
        children: convertInlineElements(element),
      });
    } else if (tagName === 'h2') {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h2',
        children: convertInlineElements(element),
      });
    } else if (tagName === 'h3') {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'h3',
        children: convertInlineElements(element),
      });
    } else if (tagName === 'ul') {
      const listItems = element.querySelectorAll('li');
      listItems.forEach((li) => {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'bullet',
          children: convertInlineElements(li),
        });
      });
    } else if (tagName === 'ol') {
      const listItems = element.querySelectorAll('li');
      listItems.forEach((li) => {
        blocks.push({
          _type: 'block',
          _key: generateKey(),
          style: 'normal',
          listItem: 'number',
          children: convertInlineElements(li),
        });
      });
    } else if (tagName === 'blockquote') {
      blocks.push({
        _type: 'block',
        _key: generateKey(),
        style: 'blockquote',
        children: convertInlineElements(element),
      });
    }
  }

  return blocks;
}

// Convert inline elements (strong, em, links) to Portable Text marks
function convertInlineElements(element: Element): any[] {
  const children: any[] = [];
  const childNodes = element.childNodes;

  for (const node of Array.from(childNodes)) {
    if (node.nodeType === 3) {
      // Text node
      const text = node.textContent || '';
      if (text.trim()) {
        children.push({
          _type: 'span',
          _key: generateKey(),
          text: text,
          marks: [],
        });
      }
    } else if (node.nodeType === 1) {
      // Element node
      const el = node as Element;
      const tagName = el.tagName.toLowerCase();
      const text = el.textContent || '';

      if (text.trim()) {
        const marks: string[] = [];

        if (tagName === 'strong') {
          marks.push('strong');
        } else if (tagName === 'em') {
          marks.push('em');
        }

        children.push({
          _type: 'span',
          _key: generateKey(),
          text: text,
          marks: marks,
        });
      }
    }
  }

  // If no children were created, add an empty span
  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: generateKey(),
      text: '',
      marks: [],
    });
  }

  return children;
}

// Blog post content from remote (HTML format)
const remoteBlogContent: Record<string, string> = {
  'minimalist-living-room': `
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

  'corner-tv-stand': `
    <p>When it comes to small space living, every square inch matters. A corner TV stand is one of the most underutilized solutions for maximizing your living space while maintaining a clean, minimalist aesthetic.</p>
    <h2>Why Choose a Corner TV Stand?</h2>
    <p>Corners are often wasted space in living rooms. By placing your TV stand in a corner, you free up valuable wall space for other furniture or leave it empty for a more spacious feel.</p>
    <p>A well-chosen corner TV stand can transform an awkward corner into a functional entertainment hub while maintaining the clean lines and uncluttered look essential to minimalist design.</p>
    <h2>Benefits of Corner Placement</h2>
    <ul>
      <li><strong>Space Optimization:</strong> Utilizes otherwise unused corner space</li>
      <li><strong>Better Traffic Flow:</strong> Keeps TV and equipment out of main walkways</li>
      <li><strong>Flexible Seating:</strong> Opens up multiple seating arrangement options</li>
      <li><strong>Cable Management:</strong> Easier to hide wires and cables in corners</li>
    </ul>
    <h2>Choosing the Right Corner TV Stand</h2>
    <p>Not all corner TV stands are created equal. Here's what to look for when selecting the perfect one for your minimalist space:</p>
    <h3>Size and Proportion</h3>
    <ul>
      <li>Measure your corner space carefully, including ceiling height</li>
      <li>Ensure the stand supports your TV's size and weight</li>
      <li>Leave at least 3-4 inches on each side of the TV for ventilation</li>
      <li>Consider the depth—deeper stands offer more storage but take more space</li>
    </ul>
    <h3>Material and Design</h3>
    <ul>
      <li><strong>Wood:</strong> Warm, natural, timeless—perfect for minimalist spaces</li>
      <li><strong>Metal and Glass:</strong> Creates an open, airy feel</li>
      <li><strong>Simple Lines:</strong> Avoid ornate details or excessive decoration</li>
      <li><strong>Neutral Colors:</strong> Black, white, natural wood tones work best</li>
    </ul>
    <h2>Styling Your Corner TV Stand</h2>
    <p>Once you've chosen the perfect corner TV stand, it's time to style it minimally and intentionally:</p>
    <ul>
      <li>Keep the top surface minimal—TV only, or add one small plant</li>
      <li>Use lower shelves for essential equipment (streaming devices, gaming consoles)</li>
      <li>Hide cables with cable management solutions</li>
      <li>Add one or two decorative items maximum on open shelves</li>
      <li>Consider closed storage to hide less attractive items</li>
    </ul>
    <h2>Maintenance Tips</h2>
    <p>Keep your minimalist corner TV setup looking its best:</p>
    <ul>
      <li>Dust regularly to prevent buildup on electronics and surfaces</li>
      <li>Organize cables monthly to prevent tangling</li>
      <li>Remove items that aren't regularly used</li>
      <li>Clean the TV screen weekly with appropriate cleaner</li>
    </ul>
  `,

  'throw-blanket-styling': `
    <p>A throw blanket is more than just a practical item to keep you warm—it's a styling tool that adds texture, color, and coziness to any room. The art of layering throw blankets can transform your minimalist space from stark to inviting without adding clutter.</p>
    <h2>Why Throw Blankets Matter</h2>
    <p>In minimalist design, every item should serve multiple purposes. Throw blankets excel at this:</p>
    <ul>
      <li><strong>Function:</strong> Provides warmth and comfort</li>
      <li><strong>Texture:</strong> Adds depth and tactile interest</li>
      <li><strong>Color:</strong> Introduces subtle or bold hues</li>
      <li><strong>Coziness:</strong> Makes spaces feel more inviting</li>
    </ul>
    <h2>Choosing the Perfect Throw Blanket</h2>
    <p>Not all throw blankets are suitable for minimalist spaces. Here's what to look for:</p>
    <h3>Material Matters</h3>
    <ul>
      <li><strong>Cotton:</strong> Breathable, washable, perfect for year-round use</li>
      <li><strong>Linen:</strong> Lightweight, textured, ages beautifully</li>
      <li><strong>Wool:</strong> Warm, durable, natural insulation</li>
      <li><strong>Cashmere:</strong> Luxurious, soft, ultimate comfort (investment piece)</li>
      <li><strong>Chunky Knit:</strong> Adds significant texture, statement piece</li>
    </ul>
    <h3>Color and Pattern Selection</h3>
    <p>For minimalist spaces, choose throw blankets that complement your existing palette:</p>
    <ul>
      <li><strong>Neutral Base:</strong> Beige, gray, cream, taupe work everywhere</li>
      <li><strong>Accent Colors:</strong> Use one throw in a bolder shade for interest</li>
      <li><strong>Subtle Patterns:</strong> Stripes, simple geometric, or texture over busy prints</li>
      <li><strong>Seasonal Rotation:</strong> Lighter colors in summer, richer tones in winter</li>
    </ul>
    <h2>Styling Techniques</h2>
    <h3>The Casual Drape</h3>
    <p>Simply drape the blanket over one corner or arm of your sofa. This creates a lived-in, welcoming look while keeping the blanket easily accessible.</p>
    <h3>The Folded Layer</h3>
    <p>Fold the blanket neatly in thirds lengthwise, then drape it over the back of your sofa or chair. This looks intentional and tidy while still being decorative.</p>
    <h3>The Pooled Effect</h3>
    <p>For a more relaxed look, let the blanket pool naturally on one end of the sofa or at the foot of the bed. This works especially well with chunky knit throws.</p>
    <h3>The Basket Method</h3>
    <p>Store rolled or loosely folded throw blankets in a beautiful basket near your seating area. This keeps them accessible while adding texture to the room.</p>
    <h2>Layering Multiple Throws</h2>
    <p>In minimalist spaces, less is more, but that doesn't mean you can't layer throws:</p>
    <ul>
      <li>Use a maximum of 2-3 throws in the same space</li>
      <li>Vary textures while keeping colors complementary</li>
      <li>Place throws in different locations (sofa, chair, basket)</li>
      <li>Mix weight and material—chunky with smooth, heavy with light</li>
    </ul>
    <h2>Care and Maintenance</h2>
    <p>Keep your throw blankets looking fresh:</p>
    <ul>
      <li>Follow care instructions specific to each material</li>
      <li>Air out regularly to prevent odors</li>
      <li>Rotate blankets seasonally to prevent wear</li>
      <li>Store off-season throws in breathable containers</li>
      <li>Spot clean as needed; deep clean quarterly</li>
    </ul>
  `,

  'pampas-grass-decor': `
    <p>Pampas grass has become the darling of minimalist interior design, and for good reason. These tall, feathery plumes bring natural elegance, texture, and a sense of calm to any space. Better yet, they're incredibly low-maintenance and can last for years.</p>
    <h2>What is Pampas Grass?</h2>
    <p>Pampas grass (Cortaderia selloana) is a tall, ornamental grass native to South America. Its distinctive fluffy plumes come in shades of white, cream, beige, and even pink. Once dried, these plumes create stunning natural decor that requires virtually no maintenance.</p>
    <h2>Why Pampas Grass Works in Minimalist Spaces</h2>
    <ul>
      <li><strong>Natural Texture:</strong> Adds softness without overwhelming the space</li>
      <li><strong>Neutral Tones:</strong> Complements any color palette</li>
      <li><strong>Height and Drama:</strong> Creates visual interest without clutter</li>
      <li><strong>Low Maintenance:</strong> No water, no care needed once dried</li>
      <li><strong>Sustainable:</strong> Natural, biodegradable, eco-friendly choice</li>
    </ul>
    <h2>Choosing Quality Pampas Grass</h2>
    <p>Not all pampas grass is created equal. Here's what to look for:</p>
    <h3>Color</h3>
    <ul>
      <li><strong>Natural White/Cream:</strong> Most versatile for minimalist spaces</li>
      <li><strong>Beige/Tan:</strong> Adds warmth to cooler-toned rooms</li>
      <li><strong>Dyed Colors:</strong> Use sparingly; natural tones work best</li>
    </ul>
    <h3>Plume Quality</h3>
    <ul>
      <li>Look for full, fluffy plumes without bare spots</li>
      <li>Stems should be sturdy and straight</li>
      <li>Avoid plumes that shed excessively</li>
      <li>Consider the size—taller isn't always better for your space</li>
    </ul>
    <h2>Styling Pampas Grass</h2>
    <h3>In a Tall Floor Vase</h3>
    <p>The classic approach: Use a tall, simple floor vase (ceramic, concrete, or glass) and create an asymmetrical arrangement of 5-7 stems. Place in a corner or beside furniture for dramatic effect.</p>
    <h3>As a Centerpiece</h3>
    <p>Create a low arrangement in a wide, shallow vessel for dining tables or coffee tables. Keep it short enough to see over for conversations.</p>
    <h3>In Clusters</h3>
    <p>Group several smaller arrangements in different heights throughout a room for cohesive styling.</p>
    <h3>Solo Statement</h3>
    <p>One or two tall stems in a simple bud vase can make a striking minimalist statement.</p>
    <h2>Ideal Locations for Pampas Grass</h2>
    <ul>
      <li><strong>Living Room:</strong> Beside a sofa or in an empty corner</li>
      <li><strong>Bedroom:</strong> On a dresser or in a corner for soft, calming vibes</li>
      <li><strong>Entryway:</strong> Creates a dramatic welcome</li>
      <li><strong>Dining Room:</strong> As a centerpiece or on a sideboard</li>
      <li><strong>Bathroom:</strong> Adds spa-like elegance</li>
    </ul>
    <h2>Care and Maintenance</h2>
    <p>One of the best things about pampas grass is how little care it needs:</p>
    <ul>
      <li><strong>Initial Prep:</strong> Spray with hairspray to minimize shedding</li>
      <li><strong>Dust:</strong> Gently shake outside or use a hair dryer on cool setting</li>
      <li><strong>Keep Dry:</strong> Avoid humid areas that could cause moisture damage</li>
      <li><strong>Rotate:</strong> Turn arrangements occasionally to prevent sun bleaching</li>
      <li><strong>Replace:</strong> Every 2-3 years as plumes naturally deteriorate</li>
    </ul>
    <h2>Styling Do's and Don'ts</h2>
    <h3>Do:</h3>
    <ul>
      <li>Choose vases that complement your space</li>
      <li>Trim stems to the height you need</li>
      <li>Combine with other dried elements (eucalyptus, bunny tails)</li>
      <li>Use odd numbers of stems for visual balance</li>
    </ul>
    <h3>Don't:</h3>
    <ul>
      <li>Overcrowd your arrangement—let plumes breathe</li>
      <li>Mix too many colors—stick to 1-2 complementary tones</li>
      <li>Place near fireplaces or candles (fire hazard)</li>
      <li>Overstuff vases—minimalism means restraint</li>
    </ul>
  `,

  'natural-materials': `
    <p>In our increasingly digital world, there's a growing desire to reconnect with nature through our living spaces. Natural materials like wood, stone, and clay bring warmth, authenticity, and a sense of groundedness to modern homes—especially those following minimalist principles.</p>
    <h2>Why Natural Materials Matter</h2>
    <p>Natural materials offer benefits that synthetic alternatives simply can't match:</p>
    <ul>
      <li><strong>Authenticity:</strong> Each piece is unique with natural variations</li>
      <li><strong>Sustainability:</strong> Biodegradable and often renewable resources</li>
      <li><strong>Aging Gracefully:</strong> Develop character and patina over time</li>
      <li><strong>Health Benefits:</strong> Non-toxic, improve indoor air quality</li>
      <li><strong>Timelessness:</strong> Never go out of style</li>
      <li><strong>Warmth:</strong> Create inviting, lived-in spaces</li>
    </ul>
    <h2>Wood: The Foundation of Natural Design</h2>
    <p>Wood is perhaps the most versatile natural material in interior design.</p>
    <h3>Types and Applications</h3>
    <ul>
      <li><strong>Oak:</strong> Durable, beautiful grain, perfect for furniture and flooring</li>
      <li><strong>Walnut:</strong> Rich, dark tones, ideal for statement pieces</li>
      <li><strong>Pine:</strong> Light, affordable, great for Scandinavian-style spaces</li>
      <li><strong>Teak:</strong> Water-resistant, excellent for bathrooms and kitchens</li>
      <li><strong>Bamboo:</strong> Rapidly renewable, contemporary look</li>
    </ul>
    <h3>Using Wood Effectively</h3>
    <ul>
      <li>Mix different wood tones for depth (but keep finishes similar)</li>
      <li>Balance warm and cool tones in your space</li>
      <li>Show natural grain and texture—don't over-paint</li>
      <li>Invest in quality pieces that will last decades</li>
      <li>Maintain with appropriate oils and treatments</li>
    </ul>
    <h2>Stone: Strength and Serenity</h2>
    <p>Stone brings a sense of permanence and natural beauty that's hard to replicate.</p>
    <h3>Popular Stone Materials</h3>
    <ul>
      <li><strong>Marble:</strong> Luxurious, veined, perfect for surfaces</li>
      <li><strong>Granite:</strong> Durable, speckled, ideal for high-use areas</li>
      <li><strong>Limestone:</strong> Soft, matte, creates calm atmospheres</li>
      <li><strong>Slate:</strong> Textured, layered, excellent for floors and walls</li>
      <li><strong>Concrete:</strong> Industrial, modern, surprisingly versatile</li>
    </ul>
    <h3>Incorporating Stone</h3>
    <ul>
      <li><strong>Countertops:</strong> Kitchen and bathroom surfaces</li>
      <li><strong>Flooring:</strong> Adds thermal mass and timeless beauty</li>
      <li><strong>Accent Walls:</strong> Creates focal points</li>
      <li><strong>Decor:</strong> Stone vases, bowls, sculptures</li>
      <li><strong>Fireplaces:</strong> Natural stone surrounds</li>
    </ul>
    <h2>Clay and Ceramics: Artisan Touch</h2>
    <p>Clay-based materials bring handcrafted warmth and earthy tones to minimalist spaces.</p>
    <h3>Clay Material Types</h3>
    <ul>
      <li><strong>Terracotta:</strong> Warm, orange-red, Mediterranean vibe</li>
      <li><strong>Stoneware:</strong> Durable, various finishes, everyday use</li>
      <li><strong>Porcelain:</strong> Refined, smooth, elegant</li>
      <li><strong>Earthenware:</strong> Rustic, handmade aesthetic</li>
    </ul>
    <h3>Clay Applications</h3>
    <ul>
      <li><strong>Planters:</strong> Terracotta pots for plants</li>
      <li><strong>Dinnerware:</strong> Handmade plates and bowls</li>
      <li><strong>Vases:</strong> Display dried or fresh flowers</li>
      <li><strong>Tiles:</strong> Backsplashes and accent areas</li>
      <li><strong>Decorative Objects:</strong> Sculptural pieces</li>
    </ul>
    <h2>Combining Natural Materials</h2>
    <p>The magic happens when you thoughtfully combine these materials:</p>
    <h3>Pairing Guidelines</h3>
    <ul>
      <li><strong>Wood + Stone:</strong> Classic combination, balance warm and cool</li>
      <li><strong>Clay + Wood:</strong> Earthy, organic, texture-rich</li>
      <li><strong>Stone + Clay:</strong> Creates depth through similar tones</li>
      <li><strong>All Three:</strong> Use one as dominant, others as accents</li>
    </ul>
    <h3>Balance Principles</h3>
    <ul>
      <li>Don't overwhelm—choose 2-3 natural materials per room</li>
      <li>Vary textures: smooth marble with rough-hewn wood</li>
      <li>Consider color temperature: balance warm and cool tones</li>
      <li>Mix finished and unfinished surfaces</li>
      <li>Let each material shine—don't compete for attention</li>
    </ul>
    <h2>Care and Maintenance</h2>
    <h3>Wood Care</h3>
    <ul>
      <li>Clean with gentle, wood-specific cleaners</li>
      <li>Oil regularly to prevent drying and cracking</li>
      <li>Avoid water damage and direct sunlight</li>
      <li>Use coasters and trivets to protect surfaces</li>
    </ul>
    <h3>Stone Care</h3>
    <ul>
      <li>Seal porous stones like marble and granite</li>
      <li>Clean with pH-neutral cleaners</li>
      <li>Wipe spills immediately to prevent staining</li>
      <li>Reseal annually for high-use surfaces</li>
    </ul>
    <h3>Clay Care</h3>
    <ul>
      <li>Hand wash delicate pieces</li>
      <li>Avoid thermal shock (sudden temperature changes)</li>
      <li>Soak terracotta planters before first use</li>
      <li>Store carefully to prevent chips and cracks</li>
    </ul>
    <h2>Sourcing Responsibly</h2>
    <p>When choosing natural materials, consider:</p>
    <ul>
      <li>Source locally when possible</li>
      <li>Look for sustainable forestry certifications</li>
      <li>Support artisan makers for clay pieces</li>
      <li>Choose reclaimed or salvaged materials</li>
      <li>Invest in quality over quantity</li>
    </ul>
  `,

  'shagreen-desk-organizer': `
    <p>In the world of luxury accessories, shagreen stands out as a material that perfectly balances sophistication with functionality. Originally crafted from stingray skin, modern shagreen (and its ethical alternatives) brings texture, elegance, and timeless appeal to your workspace.</p>
    <h2>What is Shagreen?</h2>
    <p>Traditional shagreen is made from stingray or shark skin, prized for its distinctive pebbly texture and remarkable durability. Modern shagreen includes:</p>
    <ul>
      <li><strong>Authentic</strong> Shagreen: Real stingray or shark skin</li>
      <li><strong>Faux Shagreen:</strong> Embossed leather with the same texture</li>
      <li><strong>Vegan Alternatives:</strong> Synthetic materials mimicking the look</li>
    </ul>
    <h2>Why Shagreen for Desk Organization?</h2>
    <p>Shagreen desk organizers offer unique benefits:</p>
    <ul>
      <li><strong>Durability:</strong> Extremely resistant to wear and scratching</li>
      <li><strong>Texture:</strong> Unique, tactile surface that's pleasant to touch</li>
      <li><strong>Luxury:</strong> Elevates everyday objects to designer status</li>
      <li><strong>Timelessness:</strong> Classic look that never goes out of style</li>
      <li><strong>Versatility:</strong> Works with both traditional and modern decor</li>
    </ul>
    <h2>Types of Shagreen Desk Organizers</h2>
    <h3>Trays and Catchalls</h3>
    <p>Perfect for corralling small items like paper clips, USB drives, and business cards. Shallow shagreen trays keep essentials visible and accessible without creating clutter.</p>
    <h3>Pen Holders and Cups</h3>
    <p>A shagreen pen holder transforms a basic necessity into a statement piece. Choose cylindrical designs for pencils and pens, or rectangular boxes for larger writing instruments.</p>
    <h3>Letter Trays</h3>
    <p>Stack papers, folders, and notebooks in elegant shagreen letter trays. Multiple tiers help categorize documents while keeping your desk surface clear.</p>
    <h3>Desk Sets</h3>
    <p>Coordinated collections including multiple pieces (tray, pen holder, letter tray) create a cohesive, professional look.</p>
    <h2>Choosing the Right Color</h2>
    <p>Shagreen comes in various colors, each creating a different mood:</p>
    <ul>
      <li><strong>Classic Gray:</strong> Neutral, professional, versatile</li>
      <li><strong>Navy Blue:</strong> Sophisticated, calm, traditional</li>
      <li><strong>Emerald Green:</strong> Bold, luxurious, makes a statement</li>
      <li><strong>Chocolate Brown:</strong> Warm, rich, classic</li>
      <li><strong>Black:</strong> Dramatic, modern, sleek</li>
      <li><strong>White/Cream:</strong> Fresh, contemporary, minimalist</li>
    </ul>
    <h2>Styling Your Shagreen Organizers</h2>
    <h3>Minimalist Approach</h3>
    <ul>
      <li>Choose one statement piece (tray or pen holder)</li>
      <li>Keep the surface mostly clear</li>
      <li>Let the shagreen texture be the focus</li>
      <li>Pair with simple, unadorned items</li>
    </ul>
    <h3>Coordinated Look</h3>
    <ul>
      <li>Use a matching shagreen desk set</li>
      <li>Keep to one color family</li>
      <li>Add metallic accents (brass, gold, silver)</li>
      <li>Incorporate complementary materials like marble or wood</li>
    </ul>
    <h3>Eclectic Mix</h3>
    <ul>
      <li>Combine different shagreen colors</li>
      <li>Mix with other luxury materials</li>
      <li>Create visual interest through varied textures</li>
      <li>Balance bold shagreen with neutral surroundings</li>
    </ul>
    <h2>Care and Maintenance</h2>
    <p>Keep your shagreen organizers looking pristine:</p>
    <h3>Daily Care</h3>
    <ul>
      <li>Dust regularly with a soft, dry cloth</li>
      <li>Avoid placing wet items directly on shagreen</li>
      <li>Keep away from direct sunlight to prevent fading</li>
      <li>Don't overload organizers (respects the structure)</li>
    </ul>
    <h3>Deep Cleaning</h3>
    <ul>
      <li>Wipe with a slightly damp cloth (water only)</li>
      <li>Dry immediately with a soft towel</li>
      <li>Never use harsh chemicals or cleaners</li>
      <li>Condition leather-backed pieces annually</li>
    </ul>
    <h3>Stain Removal</h3>
    <ul>
      <li>Blot spills immediately with absorbent cloth</li>
      <li>For stubborn marks, use a barely damp cloth</li>
      <li>Consider professional cleaning for serious stains</li>
      <li>Test any cleaning method on inconspicuous areas first</li>
    </ul>
    <h2>Ethical Considerations</h2>
    <p>When purchasing shagreen items, consider:</p>
    <ul>
      <li><strong>Faux Shagreen:</strong> Embossed leather provides the look without marine animal sourcing</li>
      <li><strong>Vegan Options:</strong> Synthetic materials offer cruelty-free alternatives</li>
      <li><strong>Certified Sources:</strong> If buying authentic, ensure sustainable sourcing</li>
      <li><strong>Quality Over Quantity:</strong> Invest in fewer, well-made pieces that last</li>
    </ul>
    <h2>Investment Pieces</h2>
    <p>Shagreen desk accessories are investment items. Here's why they're worth it:</p>
    <ul>
      <li>Exceptional durability—can last decades with proper care</li>
      <li>Timeless design that won't go out of style</li>
      <li>Potential to become heirloom pieces</li>
      <li>Elevate your daily work experience</li>
      <li>Professional appearance in home offices</li>
    </ul>
    <h2>pairing Shagreen with Other Materials</h2>
    <h3>Best Combinations</h3>
    <ul>
      <li><strong>Brass/Gold:</strong> Classic luxury pairing</li>
      <li><strong>Marble:</strong> Sophisticated, modern contrast</li>
      <li><strong>Wood:</strong> Warmth balanced with texture</li>
      <li><strong>Glass:</strong> Light, contemporary feel</li>
      <li><strong>Leather:</strong> Cohesive, professional look</li>
    </ul>
    <h2>Beyond the Desk</h2>
    <p>Shagreen organizers work beautifully in other spaces too:</p>
    <ul>
      <li><strong>Bathroom:</strong> Vanity trays for cosmetics and jewelry</li>
      <li><strong>Bedroom:</strong> Nightstand organizers for small items</li>
      <li><strong>Entryway:</strong> Key and mail catchalls</li>
      <li><strong>Kitchen:</strong> Countertop organizers for tea, coffee, or spices</li>
    </ul>
  `,
};

async function updateBlogPosts() {
  console.log('\n📝 Updating Sanity blog posts with new content...\n');

  const posts = await client.fetch(`*[_type == "post"]{ _id, "slug": slug.current }`);

  for (const post of posts) {
    const htmlContent = remoteBlogContent[post.slug];

    if (!htmlContent) {
      console.log(`  ⚠️  No content found for: ${post.slug}`);
      continue;
    }

    console.log(`  Updating: ${post.slug}`);

    try {
      // Convert HTML to Portable Text
      const portableTextBody = htmlToPortableText(htmlContent);

      // Update the post
      await client
        .patch(post._id)
        .set({
          body: portableTextBody,
        })
        .commit();

      console.log(`  ✅ Updated successfully: ${post.slug}\n`);
    } catch (error) {
      console.error(`  ❌ Error updating ${post.slug}:`, error);
    }
  }

  console.log('\n✨ Blog content update complete!\n');
}

updateBlogPosts().catch(console.error);
