// Blog Post Editor Page
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAdmin } from '@/components/admin/AdminContext';
import MarkdownEditor from '@/components/admin/MarkdownEditor';
import { BlogPost } from '@/lib/admin/content';
import styles from './page.module.css';

export default function PostEditorPage() {
  const router = useRouter();
  const params = useParams();
  const { githubToken } = useAdmin();
  const isNew = params.slug === 'new';

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'metadata' | 'content'>('metadata');

  const [post, setPost] = useState<BlogPost>({
    slug: '',
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    author: 'TMKDO Team',
    category: 'Home Decor',
    tags: [],
    image: '',
    published: false,
    content: ''
  });

  useEffect(() => {
    if (!isNew && githubToken) {
      loadPost();
    }
  }, [params.slug, githubToken, isNew]);

  async function loadPost() {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/posts/${params.slug}`, {
        headers: {
          'x-github-token': githubToken!
        }
      });

      if (!response.ok) {
        throw new Error('Failed to load post');
      }

      const data = await response.json();
      setPost(data.post);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!post.title || !post.slug) {
      alert('Title and slug are required');
      return;
    }

    try {
      setSaving(true);
      setError('');
      
      console.log('Saving post:', post.slug);
      
      const url = isNew
        ? '/api/admin/posts/create'
        : `/api/admin/posts/${params.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-github-token': githubToken!
        },
        body: JSON.stringify(post)
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to save post';
        
        if (contentType?.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = 'Save failed - server returned invalid response';
          }
        } else {
          const textError = await response.text();
          console.error('Save error response:', textError);
          errorMessage = 'Save failed - server error';
        }
        
        throw new Error(errorMessage);
      }

      console.log('Post saved successfully');
      router.push('/admin/posts');
    } catch (err: any) {
      console.error('Save error:', err);
      setError(err.message);
      alert(err.message);
      setSaving(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setError('');
      
      console.log('Uploading image:', file.name, file.size, 'bytes');
      
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: {
          'x-github-token': githubToken!
        },
        body: formData
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Failed to upload image';
        
        if (contentType?.includes('application/json')) {
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch (e) {
            errorMessage = 'Upload failed - server returned invalid response';
          }
        } else {
          const textError = await response.text();
          console.error('Upload error response:', textError);
          errorMessage = 'Upload failed - server error';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Image uploaded successfully:', data.url);
      setPost({ ...post, image: data.url });
    } catch (err: any) {
      console.error('Image upload error:', err);
      setError(err.message);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  function generateSlug() {
    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    setPost({ ...post, slug });
  }

  function addTag() {
    const tag = prompt('Enter tag:');
    if (tag && !post.tags.includes(tag)) {
      setPost({ ...post, tags: [...post.tags, tag] });
    }
  }

  function removeTag(tagToRemove: string) {
    setPost({ ...post, tags: post.tags.filter(t => t !== tagToRemove) });
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading post...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <h1>{isNew ? 'Create New Post' : 'Edit Post'}</h1>
          <div className={styles.actions}>
            <button
              onClick={() => router.back()}
              className={styles.cancelBtn}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={styles.saveBtn}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Post'}
            </button>
          </div>
        </div>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tab === 'metadata' ? styles.active : ''}`}
            onClick={() => setTab('metadata')}
          >
            📋 Metadata
          </button>
          <button
            className={`${styles.tab} ${tab === 'content' ? styles.active : ''}`}
            onClick={() => setTab('content')}
          >
            ✍️ Content
          </button>
        </div>

        <div className={styles.editor}>
          {tab === 'metadata' ? (
            <div className={styles.metadata}>
              <div className={styles.formGroup}>
                <label>Title *</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  placeholder="Enter post title"
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Slug *</label>
                  <div className={styles.slugInput}>
                    <input
                      type="text"
                      value={post.slug}
                      onChange={(e) => setPost({ ...post, slug: e.target.value })}
                      placeholder="post-url-slug"
                    />
                    <button onClick={generateSlug} className={styles.generateBtn}>
                      Generate
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label>Date</label>
                  <input
                    type="date"
                    value={post.date}
                    onChange={(e) => setPost({ ...post, date: e.target.value })}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Excerpt</label>
                <textarea
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  placeholder="Brief description of the post"
                  rows={3}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Author</label>
                  <input
                    type="text"
                    value={post.author}
                    onChange={(e) => setPost({ ...post, author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Category</label>
                  <select
                    value={post.category}
                    onChange={(e) => setPost({ ...post, category: e.target.value })}
                  >
                    <option value="Home Decor">Home Decor</option>
                    <option value="Minimalist Living">Minimalist Living</option>
                    <option value="Design Tips">Design Tips</option>
                    <option value="Product Reviews">Product Reviews</option>
                    <option value="DIY">DIY</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Featured Image</label>
                <div className={styles.imageUpload}>
                  {post.image && (
                    <div className={styles.imagePreview}>
                      <img src={post.image} alt="Featured" />
                      <button
                        onClick={() => setPost({ ...post, image: '' })}
                        className={styles.removeImageBtn}
                      >
                        ✕
                      </button>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="image-upload"
                    disabled={uploading}
                  />
                  <label htmlFor="image-upload" className={styles.uploadBtn}>
                    {uploading ? 'Uploading...' : '📤 Upload Image'}
                  </label>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Tags</label>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                      <button onClick={() => removeTag(tag)}>✕</button>
                    </span>
                  ))}
                  <button onClick={addTag} className={styles.addTagBtn}>
                    + Add Tag
                  </button>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={post.published}
                    onChange={(e) => setPost({ ...post, published: e.target.checked })}
                  />
                  <span>Publish this post</span>
                </label>
              </div>
            </div>
          ) : (
            <div className={styles.content}>
              <div className={styles.formGroup}>
                <label>Content (Markdown)</label>
                <MarkdownEditor
                  value={post.content}
                  onChange={(newContent) => setPost({ ...post, content: newContent })}
                  placeholder="Write your post content in Markdown..."
                />
              </div>
            </div>
          )}
        </div>
      </div>
  );
}
