import { serve } from "https://deno.land/std/http/server.ts";
import { serveFile } from "https://deno.land/std/http/file_server.ts";

const server = serve({ port: 8000 });
console.log("HTTP web server running. Access it at: http://localhost:8000/");

for await (const req of server) {
  const url = req.url === "/" ? "/index.html" : req.url; // Default to index.html for root
  try {
    const response = await serveFile(req, `.${url}`); // Serve files from the current directory
    req.respond(response);
  } catch {
    req.respond({ status: 404, body: "404 Not Found" });
  }
}
