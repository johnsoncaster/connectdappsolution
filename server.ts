import { serveFile } from "https://deno.land/std@0.146.0/http/file_server.ts";
import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
  try {
    const response = await serveFile(req, `.${pathname}`);
    return response;
  } catch {
    return new Response("404 Not Found", { status: 404 });
  }
};

// Start the HTTP server on port 8000 or the provided environment variable PORT
const port = Number(Deno.env.get("PORT")) || 8000;
console.log(`HTTP web server running. Access it at: http://localhost:${port}/`);

await serve(handler, { port });
