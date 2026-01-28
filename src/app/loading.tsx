import SkeletonCard from '@/components/SkeletonCard';
import styles from './page.module.css';

export default function Loading() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.skeletonTitle}></div>
        </div>
      </section>

      <section id="blog" className={styles.blogSection}>
        <div className={styles.loadingHeader}>
          <div className={styles.skeletonSectionTitle}></div>
        </div>
        <div className={styles.blogGrid}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </>
  );
}
