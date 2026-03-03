import type { Metadata } from 'next'
import Link from 'next/link'
import AffiliateDisclosure from '@/components/AffiliateDisclosure'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About  The Minimalist Kraft & DO',
  description: 'Our story, values, and philosophy of intentional, beautiful living.',
}

export default function AboutPage() {
  const values = [
    {
      icon: '',
      title: 'Simplicity',
      body: 'We believe in the power of simplicity to create calm, functional spaces that serve your life.',
    },
    {
      icon: '',
      title: 'Sustainability',
      body: 'We prioritize natural materials and eco-conscious choices that respect our planet.',
    },
    {
      icon: '',
      title: 'Timelessness',
      body: 'We curate pieces that transcend trends, offering lasting beauty and value.',
    },
    {
      icon: '',
      title: 'Intentionality',
      body: 'Every choice should be deliberate, meaningful, and aligned with your values.',
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
        <div className={styles.storySplit}>
          <div className={styles.storyImage}>
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&h=1100&fit=crop"
              alt="Minimalist interior"
            />
            <div className={styles.imageCaption}>Our design philosophy in practice</div>
          </div>

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
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

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
