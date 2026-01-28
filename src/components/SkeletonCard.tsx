import styles from './SkeletonCard.module.css';

export default function SkeletonCard() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText} style={{ width: '60%' }}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
}
