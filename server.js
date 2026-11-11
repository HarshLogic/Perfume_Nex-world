const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const initialPort = parseInt(process.env.PORT, 10) || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    // Health check endpoint
    server.get("/api/health", (req, res) => {
      res.json({
        status: "ok",
        maison: "NEXWORLD PARFUMS",
        mode: dev ? "development" : "production",
        time: new Date().toISOString(),
      });
    });

    // Delegate all page and API requests to Next.js handler
    server.use((req, res) => {
      return handle(req, res);
    });

    function startListening(portToTry) {
      const listener = server.listen(portToTry, "0.0.0.0", () => {
        console.log(`\n==================================================`);
        console.log(`  ✨ NEXWORLD LUXURY PARFUMS SERVER ONLINE`);
        console.log(`  🌐 Boutique: http://localhost:${portToTry}`);
        console.log(`  🛡️ Admin:    http://localhost:${portToTry}/admin`);
        console.log(`  📦 Mode:     ${dev ? "Development" : "Production"}`);
        console.log(`==================================================\n`);
      });

      listener.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.warn(`Port ${portToTry} is already in use. Retrying on port ${portToTry + 1}...`);
          startListening(portToTry + 1);
        } else {
          console.error("Server listener error:", err);
          process.exit(1);
        }
      });
    }

    startListening(initialPort);
  })
  .catch((err) => {
    console.error("Error during server initialization:", err);
    process.exit(1);
  });
