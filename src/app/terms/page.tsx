import type { Metadata } from 'next';
import styles from './terms.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | The Minimalist Kraft & DO',
  description: 'Terms of Service for The Minimalist Kraft & DO - Read our terms and conditions for using our website.',
};

export default function TermsOfService() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last Updated: March 4, 2026</p>

        <section className={styles.section}>
          <h2>Agreement to Terms</h2>
          <p>
            Welcome to The Minimalist Kraft & DO. By accessing or using our website, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our website.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Use of Our Website</h2>
          
          <h3>Permitted Use</h3>
          <p>You may use our website for lawful purposes only. You agree not to:</p>
          <ul>
            <li>Use the website in any way that violates any applicable local, state, national, or international law</li>
            <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
            <li>Impersonate or attempt to impersonate the website owner, employees, or other users</li>
            <li>Use any automated system to access the website in a manner that sends more requests than a human can reasonably produce</li>
            <li>Transmit any viruses, worms, defects, Trojan horses, or any items of a destructive nature</li>
          </ul>

          <h3>User Account</h3>
          <p>
            If you create an account on our website, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Intellectual Property Rights</h2>
          
          <h3>Our Content</h3>
          <p>
            The content on this website, including but not limited to text, graphics, images, photographs, videos, logos, and other materials ("Content"), is owned by or licensed to The Minimalist Kraft & DO and is protected by copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            You may view, download, and print pages from the website for your personal, non-commercial use, provided you do not modify the content and you keep all copyright and other proprietary notices intact.
          </p>

          <h3>User-Generated Content</h3>
          <p>
            If you submit, post, or display content on our website ("User Content"), you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, and distribute such content in any media or distribution methods.
          </p>
          <p>
            You represent and warrant that you own or have the necessary rights to the User Content and that the posting of your User Content does not violate any rights of any third party.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Third-Party Links and Services</h2>
          <p>
            Our website may contain links to third-party websites, advertisers, services, or other events or activities that are not owned or controlled by us. We do not endorse or assume any responsibility for any such third-party sites, information, materials, products, or services.
          </p>
          <p>
            If you access a third-party website from our site, you do so at your own risk, and you understand that these Terms do not apply to your use of such sites.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Affiliate Marketing Disclosure</h2>
          <p>
            The Minimalist Kraft & DO participates in various affiliate marketing programs, which means we may earn commissions on purchases made through our links to retailer sites. Our reviews and recommendations are based on our honest opinions and experience.
          </p>
          <p>
            We only recommend products and services that we believe will provide value to our readers. The presence of affiliate links does not influence our editorial content or recommendations.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Our website and all content are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to:
          </p>
          <ul>
            <li>Warranties of merchantability or fitness for a particular purpose</li>
            <li>Warranties that the website will be uninterrupted, error-free, or secure</li>
            <li>Warranties regarding the accuracy, reliability, or completeness of any content</li>
          </ul>
          <p>
            We do not warrant that any defects will be corrected, or that the website is free of viruses or other harmful components.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, The Minimalist Kraft & DO and its owners, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the website</li>
            <li>Any conduct or content of any third party on the website</li>
            <li>Any content obtained from the website</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless The Minimalist Kraft & DO and its owners, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with:
          </p>
          <ul>
            <li>Your access to or use of the website</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party right, including any intellectual property or privacy right</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Comments and Submissions</h2>
          <p>
            We welcome your comments and feedback. However, any comments, suggestions, ideas, or other submissions disclosed, submitted, or offered to us become our property. We may use such submissions for any purpose without compensation to you and without acknowledgment or liability.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Copyright Infringement</h2>
          <p>
            We respect the intellectual property rights of others. If you believe that any content on our website infringes your copyright, please contact us with the following information:
          </p>
          <ul>
            <li>A description of the copyrighted work that you claim has been infringed</li>
            <li>A description of where the allegedly infringing material is located on the website</li>
            <li>Your contact information</li>
            <li>A statement that you have a good faith belief that the disputed use is not authorized</li>
            <li>A statement, under penalty of perjury, that the information in your notice is accurate</li>
            <li>An electronic or physical signature of the copyright owner or person authorized to act on their behalf</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which The Minimalist Kraft & DO operates, without regard to its conflict of law provisions.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time at our sole discretion. If we make material changes, we will notify you by updating the "Last Updated" date at the top of these Terms. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms will otherwise remain in full force and effect.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Termination</h2>
          <p>
            We reserve the right to terminate or suspend your access to our website immediately, without prior notice or liability, for any reason, including but not limited to a breach of these Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul>
            <li>Through our <a href="/contact">contact form</a></li>
            <li>Via email (if provided on our contact page)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Entire Agreement</h2>
          <p>
            These Terms, together with our Privacy Policy, constitute the entire agreement between you and The Minimalist Kraft & DO regarding your use of the website and supersede all prior agreements and understandings.
          </p>
        </section>
      </div>
    </div>
  );
}
