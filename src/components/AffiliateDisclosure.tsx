import styles from './AffiliateDisclosure.module.css';

interface AffiliateDisclosureProps {
  variant?: 'inline' | 'subtle';
}

export default function AffiliateDisclosure({ variant = 'subtle' }: AffiliateDisclosureProps) {
  if (variant === 'subtle') {
    return (
      <div className={styles.subtleDisclosure}>
        <p className={styles.subtleText}>
          Some links in our content are affiliate links. We may earn a small commission if you purchase through them.
        </p>
      </div>
    );
  }

  // Default inline variant
  return (
    <div className={styles.inlineDisclosure}>
      <p className={styles.inlineText}>
        💡 <strong>Disclosure:</strong> Some of the products mentioned in this post are affiliate links. 
        If you purchase through them, we may earn a small commission at no extra cost to you.
      </p>
    </div>
  );
}
