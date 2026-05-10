/**
 * Centralized API URL helper.
 * 
 * Uses VITE_API_BASE_URL from environment:
 *   - Development: "" (empty — proxied via Vite dev server)
 *   - Production:  "https://tc4d4uk8sf.execute-api.ap-south-1.amazonaws.com/dev"
 * 
 * Usage:
 *   import { api } from "/src/api";
 *   fetch(api("/auth/login"), { ... })
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export const api = (path) => `${API_BASE}${path}`;
