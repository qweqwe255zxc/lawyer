import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TS7 (нативный Go-компилятор) не даёт старый JS compiler API,
  // на котором держится проверка типов в next build — отсюда флаг ниже
  experimental: {
    useTypeScriptCli: true,
  },
};

export default nextConfig;
