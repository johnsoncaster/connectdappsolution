import { serveFile } from "https://deno.land/std@0.146.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);

  // Resolve the requested path
  let pathname = url.pathname;

  // Serve 'app/index.html' when '/app/' is requested
  if (pathname === "/connect/") {
    pathname = "/connect/index.html";
  }

  // Serve index.html for root path
  if (pathname === "/") {
    pathname = "/index.html";
  }

  // Prevent path traversal attacks by ensuring only allowed directories are accessed
  if (pathname.includes("..")) {
    return new Response("400 Bad Request", { status: 400 });
  }

  try {
    // Try to serve the file
    const response = await serveFile(req, `.${pathname}`);
    return response;
  } catch {
    // If the file is not found, return a 404 error
    return new Response("404 Not Found", { status: 404 });
  }
};

// Start the server on the appropriate port (environment variable or 8000)
const port = Number(Deno.env.get("PORT")) || 8000;
console.log(`HTTP web server running. Access it at: http://localhost:${port}/`);

await serve(handler, { port });
