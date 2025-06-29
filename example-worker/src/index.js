/**
 * Cloudflare Worker Example
 * Ví dụ một REST API đơn giản với các tính năng cơ bản
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS headers cho phép truy cập từ frontend
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Xử lý preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { 
        status: 200,
        headers: corsHeaders 
      });
    }
    
    try {
      const response = await handleRequest(request, env, url);
      
      // Thêm CORS headers vào response
      Object.entries(corsHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });
      
      return response;
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error', message: error.message }), 
        { 
          status: 500, 
          headers: { 
            'Content-Type': 'application/json',
            ...corsHeaders 
          }
        }
      );
    }
  }
};

async function handleRequest(request, env, url) {
  const { pathname, searchParams } = url;
  const method = request.method;
  
  // Router đơn giản
  switch (pathname) {
    case '/':
      return handleHome(env);
      
    case '/api/hello':
      return handleHello(searchParams);
      
    case '/api/time':
      return handleTime();
      
    case '/api/echo':
      if (method === 'POST') {
        return handleEcho(request);
      }
      break;
      
    case '/api/proxy':
      return handleProxy(searchParams);
      
    case '/api/ip':
      return handleGetIP(request);
      
    default:
      return new Response(
        JSON.stringify({ error: 'Not Found', path: pathname }), 
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      );
  }
  
  return new Response('Method not allowed', { status: 405 });
}

// Handler functions
async function handleHome(env) {
  const response = {
    message: 'Welcome to Cloudflare Worker!',
    environment: env.ENVIRONMENT || 'development',
    timestamp: new Date().toISOString(),
    endpoints: [
      'GET /',
      'GET /api/hello?name=YourName',
      'GET /api/time',
      'POST /api/echo',
      'GET /api/proxy?url=example.com',
      'GET /api/ip'
    ]
  };
  
  return new Response(JSON.stringify(response, null, 2), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleHello(searchParams) {
  const name = searchParams.get('name') || 'World';
  
  return new Response(JSON.stringify({ 
    message: `Hello ${name}!`,
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleTime() {
  const now = new Date();
  
  return new Response(JSON.stringify({
    timestamp: now.toISOString(),
    unix: Math.floor(now.getTime() / 1000),
    timezone: 'UTC',
    formatted: now.toUTCString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleEcho(request) {
  try {
    const body = await request.text();
    const contentType = request.headers.get('Content-Type') || 'text/plain';
    
    let parsedBody;
    try {
      parsedBody = JSON.parse(body);
    } catch {
      parsedBody = body;
    }
    
    return new Response(JSON.stringify({
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: parsedBody,
      contentType: contentType,
      timestamp: new Date().toISOString()
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to parse request body',
      message: error.message 
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleProxy(searchParams) {
  const targetUrl = searchParams.get('url');
  
  if (!targetUrl) {
    return new Response(JSON.stringify({ 
      error: 'Missing url parameter',
      usage: '/api/proxy?url=example.com'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    // Thêm https:// nếu không có protocol
    const fullUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    
    const response = await fetch(fullUrl, {
      cf: {
        // Cloudflare-specific options
        cacheTtl: 300, // Cache for 5 minutes
        cacheEverything: true
      }
    });
    
    const data = await response.text();
    
    return new Response(JSON.stringify({
      url: fullUrl,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      data: data.substring(0, 1000) + (data.length > 1000 ? '...' : '') // Limit response size
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch URL',
      message: error.message,
      url: targetUrl
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleGetIP(request) {
  const ip = request.headers.get('CF-Connecting-IP') || 
            request.headers.get('X-Forwarded-For') || 
            'Unknown';
  
  const country = request.cf?.country || 'Unknown';
  const city = request.cf?.city || 'Unknown';
  const timezone = request.cf?.timezone || 'Unknown';
  
  return new Response(JSON.stringify({
    ip: ip,
    country: country,
    city: city,
    timezone: timezone,
    userAgent: request.headers.get('User-Agent'),
    timestamp: new Date().toISOString()
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
} 