// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_SOME_KEY: string;
  readonly VITE_USER: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
