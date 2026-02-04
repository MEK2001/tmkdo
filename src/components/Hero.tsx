'use client'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import styles from './Hero.module.css'

export default function Hero() {
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const words = useMemo(() => [
    'minimalist spaces',
    'intentional living',
    'timeless design',
    'natural beauty',
    'peaceful sanctuaries'
  ], [])

  useEffect(() => {
    let timer
    const handleType = () => {
      const i = loopNum % words.length
      const fullText = words[i]

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 50 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    timer = setTimeout(handleType, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, words])

  return (
    <section className={styles.hero}>
      {/* Hero Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.brandName}>TMKDO</span>
        </h1>
        <p className={styles.heroSubtitle}>
          The Minimalist Krafts & Decor Outlets
        </p>
        <div className={styles.typingContainer}>
          <span className={styles.typingPrefix}>We create </span>
          <span className={styles.typingText}>
            {text}
            <span className={styles.cursor}>|</span>
          </span>
        </div>
        <p className={styles.heroDescription}>
          Discover the art of minimalist living through curated home decor, 
          natural materials, and timeless design inspiration.
        </p>
        <div className={styles.heroCTA}>
          <Link href="/blog" className={styles.primaryButton}>
            Explore Our Blog
          </Link>
          <Link href="/about" className={styles.secondaryButton}>
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
