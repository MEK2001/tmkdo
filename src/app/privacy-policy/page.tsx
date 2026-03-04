import type { Metadata } from 'next';
import styles from './privacy.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | The Minimalist Kraft & DO',
  description: 'Privacy Policy for The Minimalist Kraft & DO - Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last Updated: March 4, 2026</p>

        <section className={styles.section}>
          <h2>Introduction</h2>
          <p>
            Welcome to The Minimalist Kraft & DO ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Information We Collect</h2>
          
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Contact us through our contact form</li>
            <li>Leave comments on our blog posts</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This information may include your name, email address, and any other information you choose to provide.</p>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information, including:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent on pages</li>
            <li>Referring website addresses</li>
            <li>Device information</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our website and services</li>
            <li>Send you newsletters and promotional materials (with your consent)</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Analyze usage patterns and trends to improve user experience</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with small amounts of data that are sent to your browser from a website and stored on your device.
          </p>
          <p>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Services</h2>
          <p>We may use third-party services such as:</p>
          <ul>
            <li><strong>Analytics Services:</strong> Google Analytics and similar services to understand how visitors use our website</li>
            <li><strong>Advertising:</strong> Display advertising and affiliate marketing programs</li>
            <li><strong>Email Services:</strong> Email service providers to send newsletters and communications</li>
          </ul>
          <p>These third parties have their own privacy policies addressing how they use such information.</p>
        </section>

        <section className={styles.section}>
          <h2>Affiliate Disclosure</h2>
          <p>
            The Minimalist Kraft & DO participates in affiliate marketing programs. This means that we may receive a commission when you click on or purchase products through links on our website. We only recommend products and services that we believe will add value to our readers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to delete your personal information</li>
            <li>The right to object to or restrict certain processing</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the information provided below.</p>
        </section>

        <section className={styles.section}>
          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.
          </p>
        </section>

        <section className={styles.section}>
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our website, you consent to such transfers.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>Through our <a href="/contact">contact form</a></li>
            <li>Via email (if provided on our contact page)</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
