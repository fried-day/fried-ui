import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "fried-ui",
  version: "0.1.0",
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("fried-ui MCP server running on stdio");
