import { createClient } from '@supabase/supabase-js';

// Casting import.meta to any allows access to env variables without the vite/client types being present
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://ltkikjyxmxqujexjzlyr.supabase.co';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_ZR7lcrkzqVTLz3D-Os3YFQ_lw5zV72p';

export const supabase = createClient(supabaseUrl, supabaseKey);