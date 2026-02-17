// Rich Markdown Editor Component
'use client';

import { useState, useRef } from 'react';
import styles from './MarkdownEditor.module.css';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function insertMarkdown(before: string, after: string = '') {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + before.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }

  function insertLine(text: string) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const beforeCursor = value.substring(0, start);
    const afterCursor = value.substring(start);
    
    // Find the start of the current line
    const lineStart = beforeCursor.lastIndexOf('\n') + 1;
    const newText = value.substring(0, lineStart) + text + value.substring(lineStart);
    
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + text.length, start + text.length);
    }, 0);
  }

  function insertList(type: 'ul' | 'ol') {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    if (selectedText) {
      // Convert selected lines to list
      const lines = selectedText.split('\n');
      const listItems = lines.map((line, i) => {
        if (type === 'ul') {
          return `- ${line}`;
        } else {
          return `${i + 1}. ${line}`;
        }
      }).join('\n');
      
      const newText = value.substring(0, start) + listItems + value.substring(end);
      onChange(newText);
    } else {
      // Insert single list item
      const listItem = type === 'ul' ? '- ' : '1. ';
      insertLine(listItem);
    }
  }

  function insertLink() {
    const url = prompt('Enter URL:');
    if (url) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = value.substring(start, end) || 'link text';
      
      insertMarkdown('[', `](${url})`);
    }
  }

  function insertImage() {
    const url = prompt('Enter image URL:');
    if (url) {
      const alt = prompt('Enter alt text:') || 'image';
      insertMarkdown(`![${alt}](`, ')');
    }
  }

  // Simple markdown to HTML preview
  function renderPreview() {
    let html = value;
    
    // Headers
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');
    
    // Images
    html = html.replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;" />');
    
    // Lists
    html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    
    // Code blocks
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Paragraphs
    html = html.split('\n\n').map(p => {
      if (!p.match(/^<[h|u|o|l]/)) {
        return `<p>${p}</p>`;
      }
      return p;
    }).join('\n');
    
    return html;
  }

  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => insertLine('# ')}
            className={styles.toolBtn}
            title="Heading 1"
          >
            <strong>H1</strong>
          </button>
          <button
            type="button"
            onClick={() => insertLine('## ')}
            className={styles.toolBtn}
            title="Heading 2"
          >
            <strong>H2</strong>
          </button>
          <button
            type="button"
            onClick={() => insertLine('### ')}
            className={styles.toolBtn}
            title="Heading 3"
          >
            <strong>H3</strong>
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => insertMarkdown('**', '**')}
            className={styles.toolBtn}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('*', '*')}
            className={styles.toolBtn}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('`', '`')}
            className={styles.toolBtn}
            title="Code"
          >
            {'</>'}
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => insertList('ul')}
            className={styles.toolBtn}
            title="Bullet List"
          >
            • List
          </button>
          <button
            type="button"
            onClick={() => insertList('ol')}
            className={styles.toolBtn}
            title="Numbered List"
          >
            1. List
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={insertLink}
            className={styles.toolBtn}
            title="Insert Link"
          >
            🔗 Link
          </button>
          <button
            type="button"
            onClick={insertImage}
            className={styles.toolBtn}
            title="Insert Image"
          >
            🖼️ Image
          </button>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.toolbarGroup}>
          <button
            type="button"
            onClick={() => insertMarkdown('> ')}
            className={styles.toolBtn}
            title="Quote"
          >
            " Quote
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('---\n')}
            className={styles.toolBtn}
            title="Horizontal Rule"
          >
            ─ HR
          </button>
        </div>
      </div>

      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'write' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('write')}
        >
          ✏️ Write
        </button>
        <button
          type="button"
          className={`${styles.tab} ${activeTab === 'preview' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('preview')}
        >
          👁️ Preview
        </button>
      </div>

      {activeTab === 'write' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || 'Write your content in Markdown...'}
          className={styles.editor}
        />
      ) : (
        <div 
          className={styles.preview}
          dangerouslySetInnerHTML={{ __html: renderPreview() }}
        />
      )}

      <div className={styles.footer}>
        <span className={styles.wordCount}>
          {value.split(/\s+/).filter(Boolean).length} words
        </span>
        <span className={styles.charCount}>
          {value.length} characters
        </span>
      </div>
    </div>
  );
}
