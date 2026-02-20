// GitHub API Integration for Content Management

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'MEK2001';
const REPO_NAME = 'tmkdo';
const BRANCH = 'CMS-changes'; // Working branch

export interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

export async function listFiles(path: string, token: string): Promise<any[]> {
  // Try CMS-changes branch first, fallback to main if it fails
  let response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );

  // If CMS-changes branch fails, try main branch
  if (!response.ok && response.status === 404) {
    console.log(`Path ${path} not found on ${BRANCH}, trying main branch...`);
    response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=main`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Failed to list files: ${errorData.message || response.statusText}`);
  }

  return await response.json();
}

export async function getFile(path: string, token: string): Promise<GitHubFile> {
  // Try CMS-changes branch first, fallback to main if it fails
  let response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    }
  );

  // If CMS-changes branch fails, try main branch
  if (!response.ok && response.status === 404) {
    console.log(`File ${path} not found on ${BRANCH}, trying main branch...`);
    response = await fetch(
      `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=main`,
      {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(`Failed to get file: ${errorData.message || response.statusText}`);
  }

  const data = await response.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');

  return {
    path: data.path,
    content,
    sha: data.sha
  };
}

export async function createOrUpdateFile(
  path: string,
  content: string,
  message: string,
  token: string,
  sha?: string
): Promise<void> {
  const body: any = {
    message,
    content: Buffer.from(content).toString('base64'),
    branch: BRANCH // Use working branch
  };

  if (sha) {
    body.sha = sha;
  }

  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save file');
  }
}

export async function deleteFile(
  path: string,
  message: string,
  token: string,
  sha: string
): Promise<void> {
  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'DELETE',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message,
        sha,
        branch: BRANCH
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}

export async function uploadImage(
  file: File,
  token: string
): Promise<string> {
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`;
  const path = `public/images/blog/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  const content = Buffer.from(arrayBuffer).toString('base64');

  const response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content,
        branch: BRANCH
      })
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  return `/images/blog/${filename}`;
}
