/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_POKEMON_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
