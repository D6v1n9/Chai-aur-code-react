## Cross-Origin Resource Sharing (CORS)
![](https://i.postimg.cc/zftTKP48/image.png)

## To remove CORS error 
### At backend 
- You can use CORS npm package
### At frontend
- Adding proxy at frontend so that you dont have to write full url only end point 
- How to use Proxy documentation ar proxy vite
- If your backend expects routes like /api/login, you should use:
```javascript
proxy: {
  "/api": "http://localhost:5000",
},
```
-  If your backend expects routes like /login (without /api), you can do:
```javascript
proxy: {
  "/api": {
    target: "http://localhost:5000/api",
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, ""),
  },
},

```

### What is Proxy ?
- A proxy is like a middleman between your frontend (React/Vite app) and the backend (API server).

**💡 Example:**

Your frontend runs at: http://localhost:5173

Your backend API runs at: http://localhost:5000

If you try to call the backend directly from the frontend (fetch("http://localhost:5000/api/data")), it might cause a CORS error (Cross-Origin Request Blocked), because the ports are different and the browser thinks you're accessing another domain.

### Why is Proxy needed and How it works
- **Frotend(Vite+React) - localhost:5173**
- **Backend(Node+express) - localhost:5000**

Now you try this in your React code:
`fetch("http://localhost:5000/api/students");`

💥 Browser says:

❌ "Blocked by CORS policy"

## Why does CORS happens
Because the frontend and backend run on different ports (5173 vs 5000), the browser thinks:

"You’re trying to access another domain. Is this safe?"

Unless your backend adds specific headers to allow it, the request gets blocked.

## How Proxy Fixes This(in Vite)
1. Vite acts like a shield/middleman:

    - You write:

    - `fetch("/api/students");`
2. Vite sees /api/... and says: 
    - “Oh! This is meant for the backend at localhost:5000. Let me send it there for you.”
3. So it secretly calls:
    - `http://localhost:5000/api/students`
    - But the browser thinks the request stayed on the same server, so CORS issue is avoided ✅

## Why its useful
Avoids CORS errors without touching backend

Keeps frontend code clean — no hardcoded server URLs

You can deploy frontend and backend separately later

It works only in development, perfect for local testing

Easy to switch backend URLs (just update vite.config.js)

## Real life analogy
Imagine a student (React app) in a college (browser).
They want a file from the admin building (backend).
But direct access is not allowed (CORS).
So they give the request to the college receptionist (Vite proxy),
and she sends it internally to the admin.

Student gets the file — no rules broken ✅



# Cross-Origin Resource Sharing (CORS) Overview

## Key Points for Interviews

### 1. What is CORS?

- **Definition**: CORS is a browser security mechanism that allows or restricts web applications at one origin (domain, protocol, or port) to request resources from a different origin.
- **Relation to SOP**: Extends the Same-Origin Policy (SOP), which prevents cross-origin requests by default for security.

### 2. Why is CORS Needed?

- Enables secure cross-origin requests for:
  - Fetching APIs from different domains (e.g., frontend at `example.com` calling `api.example.com`).
  - Loading resources like fonts, images, or scripts from CDNs.
- Prevents unauthorized access to sensitive data by malicious websites.

### 3. How CORS Works

- Browser sends an HTTP request to a cross-origin server.
- Server responds with CORS headers (e.g., `Access-Control-Allow-Origin`) to indicate permission.
- **Simple Requests**: Directly checked for CORS headers.
- **Complex Requests**: Require a preflight `OPTIONS` request to verify server permissions.

### 4. Key CORS Headers

- `Access-Control-Allow-Origin`: Specifies allowed origins (e.g., `https://example.com` or `*`).
- `Access-Control-Allow-Methods`: Lists allowed HTTP methods (e.g., `GET, POST, PUT`).
- `Access-Control-Allow-Headers`: Lists allowed custom headers (e.g., `Authorization, Content-Type`).
- `Access-Control-Allow-Credentials`: Allows credentials like cookies (`true` or omitted).
- `Access-Control-Max-Age`: Duration to cache preflight results.

### 5. Preflight Requests

- Triggered for non-simple requests (e.g., `PUT`, `DELETE`, custom headers).
- Browser sends an `OPTIONS` request to check permissions before the actual request.
- Server must respond with appropriate CORS headers.

### 6. Simple vs. Non-Simple Requests

- **Simple**: GET, POST, HEAD with standard headers (e.g., `Content-Type: application/x-www-form-urlencoded`).
- **Non-Simple**: Requires preflight (e.g., JSON `Content-Type`, custom headers, `PATCH`).

### 7. Common CORS Errors

- **Error**: `No 'Access-Control-Allow-Origin' header is present.`
  - **Cause**: Server lacks CORS header or origin not allowed.
  - **Fix**: Add `Access-Control-Allow-Origin` on server.
- **Error**: Preflight request fails.
  - **Cause**: Server doesn’t handle `OPTIONS` or disallows method/headers.
  - **Fix**: Support `OPTIONS` with correct CORS headers.

### 8. Security Considerations

- Using `*` for `Access-Control-Allow-Origin` is insecure, especially with credentials.
- Validate origins server-side to prevent unauthorized access.
- Use `Access-Control-Allow-Credentials: true` cautiously to avoid exposing sensitive data.

### 9. CORS vs. Other Mechanisms

- **JSONP**: Insecure, older workaround using `<script>` tags.
- **Proxies**: Route requests through same-origin server to bypass CORS.
- **WebSockets**: Not subject to CORS but need similar cross-origin configuration.

## Key Points for Development

### 1. Server-Side Configuration

- **Node.js/Express**:

  ```javascript
  const express = require('express');
  const cors = require('cors');
  const app = express();
  
  // Enable CORS for specific origins
  app.use(cors({ origin: 'https://example.com', credentials: true }));
  
  // Or enable for all origins (less secure)
  app.use(cors({ origin: '*' }));
  ```

- **Spring Boot (Java)**:

  ```java
  @CrossOrigin(origins = "https://example.com", allowCredentials = "true")
  @RestController
  public class MyController {
      @GetMapping("/data")
      public Data getData() {
          return new Data();
      }
  }
  ```

- **Nginx**:

  ```
  add_header 'Access-Control-Allow-Origin' 'https://example.com';
  add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
  add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
  ```

### 2. Handling Preflight Requests

- Ensure server responds to `OPTIONS` requests with status `200` and CORS headers.
- Use middleware (e.g., `cors` in Express) to automate.

### 3. Frontend Considerations

- Use `fetch` or `XMLHttpRequest` with:

  - `mode: 'cors'` (default in `fetch`).
  - `credentials: 'include'` for cookies or authentication.

  ```javascript
  fetch('https://api.example.com/data', {
      method: 'GET',
      credentials: 'include',
      headers: { 'Authorization': 'Bearer token' }
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('CORS error:', error));
  ```

### 4. Debugging CORS Issues

- Use browser DevTools (Network tab) to inspect headers.
- Check `OPTIONS` requests and responses.
- Verify server logs for CORS header issues.

### 5. Best Practices

- Restrict `Access-Control-Allow-Origin` to trusted domains.
- Use environment-specific CORS settings (stricter in production).
- Test cross-origin requests thoroughly.
- Consider reverse proxy (e.g., Nginx) for development.

### 6. Common Pitfalls

- Not handling `OPTIONS` requests.
- Missing `Access-Control-Allow-Headers` for custom headers.
- Combining `Access-Control-Allow-Origin: *` with `Access-Control-Allow-Credentials: true` (invalid).

### 7. Tools for Testing

- **Postman**: For API testing (bypasses CORS, so use browser tools for accuracy).
- **cURL**: Simulate requests and check responses.
- **Browser DevTools**: Inspect CORS headers and errors.

## Interview Tips

- Explain CORS with a real-world example (e.g., frontend calling backend API).
- Draw a diagram (browser → server → CORS headers).
- Share experience debugging CORS issues.
- Highlight security implications and best practices.

## Development Tips

- Use libraries (e.g., `cors` middleware) to simplify configuration.
- Set up local proxy (e.g., Webpack) to bypass CORS in development.
- Document CORS requirements for APIs.

