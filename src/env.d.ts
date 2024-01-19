/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly PUBLIC_POKEMON_API: string;
    readonly PUBLIC_ELECTIONS_LIVE_S3: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
