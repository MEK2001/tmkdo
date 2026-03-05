import type { Metadata } from 'next'
import Link from 'next/link'
import Newsletter from '@/components/Newsletter'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About  The Minimalist Kraft & DO',
  description: 'Our story, values, and philosophy of intentional, beautiful living.',
}

export default function AboutPage() {
  const values = [
    {
      title: 'Quality over Quantity',
      body: 'Embrace imperfecturities carefully crafted. Establish sophistication and concentrated presence.',
    },
    {
      title: 'Embrace Imperfections',
      body: 'Embrace imperfectted esotericities a tactfully petitocube superficiality and ambient easies.',
    },
    {
      title: 'Sustainable Styling',
      body: 'Sustainable typing sans enstuigner oe consomtible and socialist consatede st mindrel opacity.',
    },
  ]

  return (
    <main className={styles.aboutPage}>
      {/*  Banner  */}
      <section className={styles.banner}>
        <p className={styles.bannerTag}>Our Story</p>
        <h1 className={styles.bannerTitle}>The Minimalist Kraft &amp; DO</h1>
        <p className={styles.bannerSub}>Curating intentional beauty for modern living</p>
        <div className={styles.bannerRule} />
      </section>

      {/*  Story  */}
      <section className={styles.storySection}>
        <div className={styles.storyContent}>
          <h2 className={styles.storyTitle}>Our Story</h2>
          <div className={styles.storyText}>
            <span className={styles.dropCap}>T</span>
            <p className={styles.storyPara}>
              he Minimalist Krafts &amp; Decor Outlets began with a simple belief:
              that less can indeed be more. In a world overwhelmed by excess,
              we saw the need for a sanctuary of simplicity and intentional design.
            </p>
            <p className={styles.storyPara}>
              We curate home decor pieces and share insights that celebrate
              natural materials, clean lines, and the timeless beauty of minimalism.
              Each item we feature tells a story of craftsmanship, sustainability,
              and purposeful living.
            </p>
            <p className={styles.storyPara}>
              Our mission is to help you create spaces that bring peace, clarity,
              and joy  spaces that reflect who you are and how you want to live.
            </p>
            <AffiliateDisclosure variant="inline" />
          </div>
        </div>
      </section>

      {/*  Values  */}
      <section className={styles.valuesSection}>
        <div className={styles.valuesBanner}>
          <p className={styles.valuesEyebrow}>What We Stand For</p>
          <h2 className={styles.valuesTitle}>Our Values</h2>
          <div className={styles.valuesRule} />
        </div>
        <div className={styles.valuesGrid}>
          {values.map((v) => (
            <div key={v.title} className={styles.valueCard}>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <div className={styles.valueOrnament} />
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/*  Section Divider  */}
      <section className={styles.sectionDivider}>
        <div className={styles.dividerLine} />
      </section>

      {/*  Newsletter  */}
      <Newsletter />

      {/*  CTA  */}
      <section className={styles.cta}>
        <div className={styles.ctaInner}>
          <p className={styles.ctaEyebrow}>Ready to Begin?</p>
          <h2 className={styles.ctaTitle}>Let&apos;s Create Something Beautiful</h2>
          <p className={styles.ctaSub}>
            Explore our journal for inspiration, tips, and curated recommendations
            for your minimalist sanctuary.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/blog" className={styles.ctaPrimary}>Browse the Journal</Link>
            <Link href="/contact" className={styles.ctaSecondary}>Get in Touch</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
