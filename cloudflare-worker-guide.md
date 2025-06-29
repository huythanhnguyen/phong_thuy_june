# Hướng dẫn triển khai Cloudflare Worker

## 1. Chuẩn bị môi trường

### Bước 1: Tạo tài khoản Cloudflare
- Truy cập [cloudflare.com](https://cloudflare.com) và đăng ký tài khoản miễn phí
- Xác thực email và hoàn tất quá trình đăng ký

### Bước 2: Cài đặt Wrangler CLI
```bash
# Cài đặt Wrangler CLI globally
npm install -g wrangler

# Hoặc sử dụng yarn
yarn global add wrangler

# Kiểm tra version
wrangler --version
```

### Bước 3: Đăng nhập vào Cloudflare
```bash
# Đăng nhập vào tài khoản Cloudflare
wrangler login
```
- Lệnh này sẽ mở trình duyệt để bạn đăng nhập
- Authorize Wrangler để truy cập tài khoản của bạn

## 2. Khởi tạo dự án Worker

### Tạo dự án mới
```bash
# Tạo worker mới
wrangler generate my-worker

# Hoặc tạo với template cụ thể
wrangler generate my-worker https://github.com/cloudflare/worker-template
```

### Cấu trúc thư mục cơ bản
```
my-worker/
├── src/
│   └── index.js         # Code chính của worker
├── wrangler.toml        # File cấu hình
└── package.json         # Dependencies
```

## 3. Cấu hình Worker

### File wrangler.toml
```toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

# Biến môi trường
[env.production.vars]
API_KEY = "your-api-key"

# KV storage (tùy chọn)
kv_namespaces = [
  { binding = "MY_KV", id = "your-kv-id" }
]

# Custom domains (tùy chọn)
routes = [
  { pattern = "api.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

## 4. Phát triển Worker

### Ví dụ Worker cơ bản
```javascript
// src/index.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Routing cơ bản
    if (url.pathname === '/') {
      return new Response('Hello from Cloudflare Worker!', {
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    if (url.pathname === '/api/health') {
      return Response.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString() 
      });
    }
    
    // Handle POST request
    if (request.method === 'POST' && url.pathname === '/api/data') {
      const data = await request.json();
      return Response.json({ 
        message: 'Data received', 
        data: data 
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
```

### Worker với nhiều tính năng
```javascript
// src/index.js
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // Routing
      const response = await handleRequest(request, env, url);
      
      // Add CORS headers to response
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
    } catch (error) {
      return Response.json(
        { error: 'Internal Server Error' }, 
        { status: 500, headers: corsHeaders }
      );
    }
  }
};

async function handleRequest(request, env, url) {
  const { pathname } = url;
  
  switch (pathname) {
    case '/':
      return new Response('API is running');
      
    case '/api/users':
      if (request.method === 'GET') {
        return handleGetUsers(env);
      } else if (request.method === 'POST') {
        return handleCreateUser(request, env);
      }
      break;
      
    case '/api/proxy':
      return handleProxy(request);
      
    default:
      return new Response('Not Found', { status: 404 });
  }
}

async function handleGetUsers(env) {
  // Sử dụng KV storage
  const users = await env.MY_KV.get('users', 'json') || [];
  return Response.json(users);
}

async function handleCreateUser(request, env) {
  const userData = await request.json();
  
  // Validation
  if (!userData.name || !userData.email) {
    return Response.json(
      { error: 'Name and email are required' }, 
      { status: 400 }
    );
  }
  
  // Save to KV
  const users = await env.MY_KV.get('users', 'json') || [];
  users.push({ ...userData, id: Date.now() });
  await env.MY_KV.put('users', JSON.stringify(users));
  
  return Response.json({ message: 'User created successfully' });
}

async function handleProxy(request) {
  // Proxy request to external API
  const targetUrl = 'https://jsonplaceholder.typicode.com/posts';
  const response = await fetch(targetUrl);
  const data = await response.json();
  
  return Response.json(data);
}
```

## 5. Testing và Development

### Chạy worker locally
```bash
# Start development server
wrangler dev

# Chạy với port cụ thể
wrangler dev --port 8787

# Chạy với logging
wrangler dev --log-level debug
```

### Testing với curl
```bash
# Test GET request
curl http://localhost:8787/

# Test POST request
curl -X POST http://localhost:8787/api/data \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello World"}'
```

## 6. Triển khai Worker

### Deploy lên Cloudflare
```bash
# Deploy worker
wrangler deploy

# Deploy với tên cụ thể
wrangler deploy --name my-production-worker

# Deploy environment cụ thể
wrangler deploy --env production
```

### Quản lý versions
```bash
# Xem danh sách deployments
wrangler deployments list

# Rollback về version trước
wrangler rollback
```

## 7. Cấu hình nâng cao

### Environment Variables
```bash
# Set biến môi trường
wrangler secret put API_KEY

# List secrets
wrangler secret list

# Delete secret
wrangler secret delete API_KEY
```

### KV Storage
```bash
# Tạo KV namespace
wrangler kv:namespace create "MY_KV"

# Put data vào KV
wrangler kv:key put --binding=MY_KV "key1" "value1"

# Get data từ KV
wrangler kv:key get --binding=MY_KV "key1"

# List keys
wrangler kv:key list --binding=MY_KV
```

### Custom Domains
```bash
# Add custom domain
wrangler route add "api.yourdomain.com/*" my-worker

# List routes
wrangler route list
```

## 8. Monitoring và Logs

### Xem logs
```bash
# Xem logs real-time
wrangler tail

# Xem logs với filter
wrangler tail --format pretty

# Xem logs của environment cụ thể
wrangler tail --env production
```

### Analytics
- Truy cập Cloudflare Dashboard
- Vào phần Workers & Pages
- Chọn worker của bạn để xem analytics

## 9. Best Practices

### Performance
```javascript
// Cache responses
const cache = caches.default;
const cacheKey = new Request(url.toString(), request);
let response = await cache.match(cacheKey);

if (!response) {
  response = await fetch(request);
  // Cache for 1 hour
  response.headers.set('Cache-Control', 'max-age=3600');
  ctx.waitUntil(cache.put(cacheKey, response.clone()));
}
```

### Error Handling
```javascript
export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (error) {
      console.error('Worker error:', error);
      return new Response('Internal Server Error', { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
```

### Security
```javascript
// Rate limiting
const RATE_LIMIT = 100; // requests per minute
const rateLimitKey = `rate_limit:${clientIP}`;
const currentCount = await env.MY_KV.get(rateLimitKey) || 0;

if (currentCount > RATE_LIMIT) {
  return new Response('Rate limit exceeded', { status: 429 });
}

await env.MY_KV.put(rateLimitKey, currentCount + 1, { expirationTtl: 60 });
```

## 10. Troubleshooting

### Common Issues
1. **Worker exceeds CPU time limit**: Optimize code, use async operations
2. **KV operations timeout**: Implement proper error handling
3. **CORS issues**: Configure proper CORS headers
4. **Environment variables not found**: Check wrangler.toml configuration

### Debug commands
```bash
# Check worker status
wrangler status

# Validate wrangler.toml
wrangler validate

# Get worker info
wrangler whoami
```

## 11. Pricing và Limits

### Free Tier
- 100,000 requests/day
- 10ms CPU time per request
- 128MB memory

### Paid Tier
- $5/month cho 10 million requests
- 50ms CPU time per request
- 128MB memory

## Kết luận

Cloudflare Worker là một platform mạnh mẽ để triển khai serverless functions với hiệu suất cao và độ trễ thấp. Với hướng dẫn này, bạn có thể bắt đầu triển khai các ứng dụng của mình lên Cloudflare Worker một cách dễ dàng.

### Tài liệu tham khảo
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Workers Examples](https://developers.cloudflare.com/workers/examples/) 