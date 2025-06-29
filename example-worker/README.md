# Cloudflare Worker Example

Ví dụ đơn giản về Cloudflare Worker với REST API cơ bản.

## Cài đặt

1. **Cài đặt Wrangler CLI** (nếu chưa có):
   ```bash
   npm install -g wrangler
   ```

2. **Đăng nhập Cloudflare**:
   ```bash
   wrangler login
   ```

3. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

## Development

### Chạy locally
```bash
npm run dev
# hoặc
wrangler dev
```

Worker sẽ chạy tại `http://localhost:8787`

### Test các endpoints

1. **Home endpoint**:
   ```bash
   curl http://localhost:8787/
   ```

2. **Hello endpoint**:
   ```bash
   curl "http://localhost:8787/api/hello?name=John"
   ```

3. **Time endpoint**:
   ```bash
   curl http://localhost:8787/api/time
   ```

4. **Echo endpoint** (POST):
   ```bash
   curl -X POST http://localhost:8787/api/echo \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello World", "number": 123}'
   ```

5. **Proxy endpoint**:
   ```bash
   curl "http://localhost:8787/api/proxy?url=jsonplaceholder.typicode.com/posts/1"
   ```

6. **IP endpoint**:
   ```bash
   curl http://localhost:8787/api/ip
   ```

## Deployment

### Deploy staging
```bash
npm run deploy:staging
```

### Deploy production
```bash
npm run deploy:production
```

### Deploy default
```bash
npm run deploy
```

## Monitoring

### Xem logs real-time
```bash
npm run tail
# hoặc
wrangler tail
```

### Xem deployments
```bash
wrangler deployments list
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Home page với thông tin về worker |
| GET | `/api/hello?name=<name>` | Chào hỏi với tên tùy chọn |
| GET | `/api/time` | Thông tin thời gian hiện tại |
| POST | `/api/echo` | Echo lại request body |
| GET | `/api/proxy?url=<url>` | Proxy request đến URL khác |
| GET | `/api/ip` | Thông tin IP và geolocation |

## Features

- ✅ CORS support
- ✅ Error handling
- ✅ Environment variables
- ✅ Request routing
- ✅ JSON API responses
- ✅ Proxy functionality
- ✅ IP geolocation
- ✅ Request echo/debugging

## Customization

### Thêm endpoint mới
1. Thêm case mới trong `handleRequest()` function
2. Tạo handler function tương ứng
3. Test locally với `npm run dev`

### Environment Variables
- Sửa file `wrangler.toml` để thêm biến môi trường
- Sử dụng `env.VARIABLE_NAME` trong code

### KV Storage
1. Uncomment KV config trong `wrangler.toml`
2. Tạo KV namespace: `wrangler kv:namespace create "MY_KV"`
3. Update namespace ID trong config
4. Sử dụng `env.MY_KV` trong code

## Troubleshooting

### Common Issues

1. **"Not authorized"**: Chạy `wrangler login` để đăng nhập lại
2. **"Worker name already exists"**: Đổi tên trong `wrangler.toml`
3. **CORS errors**: Kiểm tra CORS headers trong code
4. **CPU time exceeded**: Tối ưu code, sử dụng async/await

### Debug Commands
```bash
# Kiểm tra trạng thái
wrangler whoami

# Validate config
wrangler validate

# List workers
wrangler list
```

## Next Steps

- Thêm authentication/authorization
- Sử dụng KV storage cho data persistence
- Implement rate limiting
- Add caching strategies
- Connect to external databases
- Add monitoring and alerting 