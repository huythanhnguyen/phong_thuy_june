# Quick Start - Cloudflare Worker

## Bước 1: Cài đặt Wrangler
```bash
npm install -g wrangler
```

## Bước 2: Đăng nhập
```bash
wrangler login
```

## Bước 3: Tạo project mới
```bash
# Tạo thư mục project
mkdir my-worker && cd my-worker

# Copy files từ example-worker hoặc tạo manual:
```

**File `wrangler.toml`:**
```toml
name = "my-first-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"
```

**File `src/index.js`:**
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/') {
      return new Response('Hello Cloudflare Worker!');
    }
    
    if (url.pathname === '/api/time') {
      return Response.json({
        timestamp: new Date().toISOString(),
        message: 'Current time from worker'
      });
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
```

## Bước 4: Test locally
```bash
wrangler dev
```

Truy cập: `http://localhost:8787`

## Bước 5: Deploy
```bash
wrangler deploy
```

**Xong!** Worker của bạn đã live tại: `https://my-first-worker.<your-subdomain>.workers.dev`

## Test nhanh
```bash
# Test local
curl http://localhost:8787/
curl http://localhost:8787/api/time

# Test production (thay your-subdomain)
curl https://my-first-worker.<your-subdomain>.workers.dev/
curl https://my-first-worker.<your-subdomain>.workers.dev/api/time
```

> 💡 **Tip**: Sử dụng example-worker folder để có ví dụ đầy đủ với nhiều tính năng hơn! 