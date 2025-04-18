/**
 * ⚠️ Supabase foi desativado do front-end.
 * Toda comunicação com o banco agora é feita pelo backend seguro em Render.
 *
 * Se você está vendo este arquivo, não o utilize.
 * Use o arquivo `api.ts` com axios para interagir com o backend.
 */

export const supabase = new Proxy({}, {
  get() {
    throw new Error('❌ Supabase client desativado. Use a API do backend via `services/api.ts`.');
  },
});
