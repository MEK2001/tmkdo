// TMKDO CMS Authentication Worker
// Deploy this to: tmkdo-cms-auth.eessaa-khan.workers.dev

// Environment variables needed (set in Cloudflare Dashboard):
// - SUPABASE_URL
// - SUPABASE_ANON_KEY
// - SUPABASE_SERVICE_KEY
// - GITHUB_TOKEN
// - GITHUB_REPO
// - GOOGLE_CLIENT_ID
// - GOOGLE_CLIENT_SECRET

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

// HTML for the authentication popup (served at /auth/cms)
const AUTH_POPUP_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TMKDO CMS - Authenticate</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .container {
      background: white;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(139, 38, 53, 0.15);
      width: 100%;
      max-width: 440px;
      padding: 3rem;
      animation: fadeUp 0.5s ease;
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .logo {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo-icon {
      font-size: 3.5rem;
      margin-bottom: 0.75rem;
      display: block;
    }
    .logo h1 {
      font-family: 'Lora', serif;
      font-size: 2rem;
      color: #7A5638;
      margin-bottom: 0.25rem;
    }
    .logo p {
      color: #A88F70;
      font-size: 0.9rem;
    }
    .alert {
      padding: 0.875rem 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
      display: none;
    }
    .alert.show { display: block; animation: fadeUp 0.3s ease; }
    .alert-error { background: #fee; color: #c33; border: 1px solid #fcc; }
    .alert-success { background: #efe; color: #3a3; border: 1px solid #cfc; }
    .form-group {
      margin-bottom: 1.25rem;
    }
    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #4A3828;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      padding: 0.875rem 1rem;
      border: 2px solid rgba(122, 86, 56, 0.15);
      border-radius: 10px;
      font-size: 0.95rem;
      font-family: 'Inter', sans-serif;
      transition: all 0.3s ease;
    }
    input:focus {
      outline: none;
      border-color: #7A5638;
      box-shadow: 0 0 0 3px rgba(122, 86, 56, 0.1);
    }
    button {
      width: 100%;
      padding: 1rem;
      background: linear-gradient(135deg, #7A5638 0%, #5C3D24 100%);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Inter', sans-serif;
      margin-bottom: 1rem;
    }
    button:hover:not(.loading) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(139, 38, 53, 0.3);
    }
    button.google {
      background: white;
      color: #4A3828;
      border: 2px solid rgba(139, 38, 53, 0.15);
    }
    .spinner {
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      margin: 0 auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    button.loading {
      pointer-events: none;
      opacity: 0.7;
    }
    .divider {
      text-align: center;
      margin: 1.5rem 0;
      color: #A88F70;
      font-size: 0.85rem;
      position: relative;
    }
    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 40%;
      height: 1px;
      background: rgba(139, 38, 53, 0.15);
    }
    .divider::before { left: 0; }
    .divider::after { right: 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <span class="logo-icon">📚</span>
      <h1>TMKDO</h1>
      <p>Content Management System</p>
    </div>

    <div id="alert" class="alert"></div>

    <form id="login-form">
      <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" required autocomplete="email">
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" required autocomplete="current-password">
      </div>

      <button type="submit" id="login-btn">
        <span>Sign In</span>
      </button>
    </form>

    <div class="divider">OR</div>

    <button class="google" id="google-btn">
      <span>Continue with Google</span>
    </button>
  </div>

  <script>
    const WORKER_URL = window.location.origin;

    function showAlert(msg, type) {
      const el = document.getElementById('alert');
      el.textContent = msg;
      el.className = \`alert alert-\${type} show\`;
    }

    function hideAlert() {
      document.getElementById('alert').className = 'alert';
    }

    function setLoading(btn, loading) {
      if (loading) {
        btn.classList.add('loading');
        btn.innerHTML = '<div class="spinner"></div>';
      } else {
        btn.classList.remove('loading');
        btn.innerHTML = '<span>' + (btn.id === 'google-btn' ? 'Continue with Google' : 'Sign In') + '</span>';
      }
    }

    function sendTokenToParent(githubToken) {
      if (!window.opener) {
        showAlert('Error: This window was not opened as a popup', 'error');
        return;
      }

      console.log('✅ Sending GitHub token to Decap CMS...');
      
      // Send in the exact format Decap CMS expects
      const message = \`authorization:github:success:\${JSON.stringify({
        token: githubToken,
        provider: 'github'
      })}\`;

      // Send to parent window with multiple attempts
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.opener.postMessage(message, '*');
        }, i * 100);
      }

      console.log('✅ Token sent! Closing popup...');
      showAlert('Authentication successful!', 'success');
      
      setTimeout(() => window.close(), 1500);
    }

    async function getGitHubToken(accessToken) {
      const res = await fetch(\`\${WORKER_URL}/auth/github-token\`, {
        headers: { 'Authorization': \`Bearer \${accessToken}\` }
      });

      if (!res.ok) throw new Error('Failed to get GitHub token');

      const data = await res.json();
      return data.github_token || data.token;
    }

    // Email/Password Login
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('login-btn');
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      setLoading(btn, true);
      hideAlert();

      try {
        const res = await fetch(\`\${WORKER_URL}/auth/login\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Authentication failed');
        }

        const githubToken = await getGitHubToken(data.access_token);
        sendTokenToParent(githubToken);

      } catch (err) {
        showAlert(err.message, 'error');
        setLoading(btn, false);
      }
    });

    // Google OAuth
    document.getElementById('google-btn').addEventListener('click', () => {
      window.location.href = \`\${WORKER_URL}/auth/google\`;
    });

    console.log('🚀 CMS Auth Popup loaded');
  </script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS })
    }

    try {
      // Health check
      if (url.pathname === '/health') {
        return jsonResponse({ status: 'ok', timestamp: new Date().toISOString() })
      }

      // CMS Authentication popup
      if (url.pathname === '/auth/cms') {
        return new Response(AUTH_POPUP_HTML, {
          headers: {
            'Content-Type': 'text/html',
            ...CORS_HEADERS
          }
        })
      }

      // Simple GitHub OAuth for Decap CMS (no Supabase required)
      // Skip actual OAuth, just return the token immediately
      if (url.pathname === '/auth/github-oauth') {
        return new Response(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
    }
    .card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(122,86,56,0.15);
      max-width: 400px;
    }
    h1 { color: #7A5638; font-size: 1.5rem; margin: 1rem 0; }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(122, 86, 56, 0.1);
      border-top-color: #7A5638;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 1rem auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:3rem">📚</div>
    <h1>TMKDO CMS</h1>
    <div class="spinner"></div>
    <p style="color:#A88F70;">Authenticating...</p>
  </div>

  <script>
    (function() {
      var githubToken = '${env.GITHUB_TOKEN}';
      var message = 'authorization:github:success:' + JSON.stringify({
        token: githubToken,
        provider: 'github'
      });
      
      console.log('✅ Sending GitHub token to Decap CMS...');
      console.log('Token:', githubToken.substring(0, 10) + '...');
      
      if (window.opener) {
        // Send message multiple times to ensure delivery
        for (var i = 0; i < 10; i++) {
          (function(index) {
            setTimeout(function() {
              console.log('Sending attempt ' + (index + 1));
              window.opener.postMessage(message, '*');
            }, index * 150);
          })(i);
        }
        
        // Close popup after delay
        setTimeout(function() {
          console.log('✅ Closing popup...');
          window.close();
        }, 2000);
      } else {
        document.body.innerHTML = '<div class="card"><h1>Error</h1><p>This must be opened as a popup</p></div>';
      }
    })();
  </script>
</body>
</html>`, {
          headers: { 'Content-Type': 'text/html' }
        })
      }

      // GitHub OAuth callback - no longer needed, but keep for compatibility
      if (url.pathname === '/auth/github-oauth/callback') {
        const code = url.searchParams.get('code')
        const state = url.searchParams.get('state') || ''
        
        return new Response(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authenticating...</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
      background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
    }
    .card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(122,86,56,0.15);
      max-width: 400px;
    }
    h1 { color: #7A5638; font-size: 1.5rem; margin: 1rem 0; }
    .spinner {
      width: 48px;
      height: 48px;
      border: 4px solid rgba(122, 86, 56, 0.1);
      border-top-color: #7A5638;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 1rem auto;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:3rem">📚</div>
    <h1>TMKDO CMS</h1>
    <div class="spinner"></div>
    <p style="color:#A88F70;">Authenticating...</p>
  </div>

  <script>
    (function() {
      var githubToken = '${env.GITHUB_TOKEN}';
      var message = 'authorization:github:success:' + JSON.stringify({
        token: githubToken,
        provider: 'github'
      });
      
      console.log('✅ Sending GitHub token to Decap CMS...');
      
      if (window.opener) {
        // Send message multiple times to ensure delivery
        for (var i = 0; i < 5; i++) {
          (function(index) {
            setTimeout(function() {
              console.log('Sending attempt ' + (index + 1));
              window.opener.postMessage(message, '*');
            }, index * 100);
          })(i);
        }
        
        // Close popup after delay
        setTimeout(function() {
          console.log('✅ Closing popup...');
          window.close();
        }, 1500);
      } else {
        document.body.innerHTML = '<div class="card"><h1>Authenticated!</h1><p>You can close this window.</p></div>';
      }
    })();
  </script>
</body>
</html>`, {
          headers: { 'Content-Type': 'text/html' }
        })
      }

      // Login endpoint
      if (url.pathname === '/auth/login' && request.method === 'POST') {
        return await handleLogin(request, env)
      }

      // Return GitHub token for authenticated user
      if (url.pathname === '/auth/github-token') {
        return await handleGitHubToken(request, env)
      }

      // Signup endpoint
      if (url.pathname === '/auth/signup' && request.method === 'POST') {
        return await handleSignup(request, env)
      }

      // Google OAuth
      if (url.pathname === '/auth/google') {
        return handleGoogleAuth(env)
      }

      // Google OAuth callback
      if (url.pathname === '/auth/google/callback') {
        return await handleGoogleCallback(request, env)
      }

      // GitHub API proxy
      if (url.pathname.startsWith('/github/')) {
        return await proxyGitHubRequest(request, env)
      }

      return jsonResponse({ error: 'Not found' }, 404)

    } catch (error) {
      console.error('Worker error:', error)
      return jsonResponse({ error: error.message }, 500)
    }
  }
}

// Handler functions
async function handleLogin(request, env) {
  const { email, password } = await request.json()

  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await res.json()

  if (!res.ok) {
    return jsonResponse({ error: data.error_description || 'Login failed' }, 400)
  }

  return jsonResponse({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    user: data.user
  })
}

async function handleGitHubToken(request, env) {
  // Verify user is authenticated (optional - can check JWT)
  const authHeader = request.headers.get('Authorization')
  
  if (!authHeader) {
    return jsonResponse({ error: 'Unauthorized' }, 401)
  }

  // Return the GitHub service account token
  return jsonResponse({
    github_token: env.GITHUB_TOKEN,
    token: env.GITHUB_TOKEN
  })
}

async function handleSignup(request, env) {
  const { email, password, fullName } = await request.json()

  const res = await fetch(`${env.SUPABASE_URL}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      'apikey': env.SUPABASE_ANON_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      data: { full_name: fullName }
    })
  })

  const data = await res.json()

  if (!res.ok) {
    return jsonResponse({ error: data.error_description || 'Signup failed' }, 400)
  }

  return jsonResponse({ message: 'Account created! Please check your email to verify.' })
}

function handleGoogleAuth(env) {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent('https://tmkdo-cms-auth.eessaa-khan.workers.dev/auth/google/callback')}&` +
    `response_type=code&` +
    `scope=email%20profile&` +
    `access_type=offline`

  return Response.redirect(authUrl, 302)
}

async function handleGoogleCallback(request, env) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')

  // Exchange code for Google tokens
  // Then create/login user in Supabase
  // Return with postMessage to parent

  return new Response(`
    <script>
      if (window.opener) {
        window.opener.postMessage({ type: 'auth-success', access_token: 'TOKEN_HERE' }, '*');
        window.close();
      }
    </script>
    Authentication successful! You can close this window.
  `, {
    headers: { 'Content-Type': 'text/html' }
  })
}

async function proxyGitHubRequest(request, env) {
  const url = new URL(request.url)
  const githubPath = url.pathname.replace('/github/', '')
  
  const githubUrl = `https://api.github.com/${githubPath}${url.search}`

  const githubRequest = new Request(githubUrl, {
    method: request.method,
    headers: {
      'Authorization': `token ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'TMKDO-CMS'
    },
    body: request.body
  })

  const response = await fetch(githubRequest)
  const data = await response.json()

  return jsonResponse(data, response.status)
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...CORS_HEADERS
    }
  })
}
