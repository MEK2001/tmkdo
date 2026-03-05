import styles from './page.module.css';
import SkeletonCard from '@/components/SkeletonCard';

export default function Loading() {
  return (
    <div className={styles.loadingState}>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
