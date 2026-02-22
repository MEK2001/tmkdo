// GitHub API Integration for Content Management

const GITHUB_API = 'https://api.github.com';
const REPO_OWNER = 'MEK2001';
const REPO_NAME = 'tmkdo';
const BRANCH = 'main'; // Working branch - CMS edits go directly to main

export interface GitHubFile {
  path: string;
  content: string;
  sha?: string;
}

async function handleGitHubResponse(response: Response, operation: string): Promise<any> {
  const contentType = response.headers.get('content-type');
  
  if (!response.ok) {
    let errorMessage = `${operation} failed (${response.status})`;
    
    if (contentType?.includes('application/json')) {
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('Failed to parse error response as JSON');
      }
    } else {
      const textError = await response.text();
      console.error('Non-JSON error response:', textError.substring(0, 200));
      errorMessage = textError.substring(0, 100) || errorMessage;
    }
    
    throw new Error(errorMessage);
  }
  
  if (!contentType?.includes('application/json')) {
    throw new Error(`Expected JSON response but got: ${contentType}`);
  }
  
  return await response.json();
}

export async function listFiles(path: string, token: string): Promise<any[]> {
  console.log(`[GitHub API] Listing files: ${path}`);
  
  // Try CMS-changes branch first, fallback to main if it fails
  let response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TMKDO-CMS'
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
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'TMKDO-CMS'
        }
      }
    );
  }

  return await handleGitHubResponse(response, 'List files');
}

export async function getFile(path: string, token: string): Promise<GitHubFile> {
  console.log(`[GitHub API] Getting file: ${path}`);
  
  // Try CMS-changes branch first, fallback to main if it fails
  let response = await fetch(
    `${GITHUB_API}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`,
    {
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TMKDO-CMS'
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
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'TMKDO-CMS'
        }
      }
    );
  }

  const data = await handleGitHubResponse(response, 'Get file');
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
  console.log(`[GitHub API] ${sha ? 'Updating' : 'Creating'} file: ${path}`);
  
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
        'Content-Type': 'application/json',
        'User-Agent': 'TMKDO-CMS'
      },
      body: JSON.stringify(body)
    }
  );

  await handleGitHubResponse(response, 'Save file');
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
        'Content-Type': 'application/json',
        'User-Agent': 'TMKDO-CMS'
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
  console.log(`[GitHub API] Uploading image: ${file.name} (${file.size} bytes)`);
  
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
        'Content-Type': 'application/json',
        'User-Agent': 'TMKDO-CMS'
      },
      body: JSON.stringify({
        message: `Upload image: ${filename}`,
        content,
        branch: BRANCH
      })
    }
  );

  await handleGitHubResponse(response, 'Upload image');
  console.log(`[GitHub API] Image uploaded successfully: ${filename}`);
  
  return `/images/blog/${filename}`;
}
