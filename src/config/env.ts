// The ONLY module that reads `import.meta.env`. Server secrets live in `server-env.ts`.
export const isProductionBuild: boolean = import.meta.env.PROD
