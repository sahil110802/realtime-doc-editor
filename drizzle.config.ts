
import 'dotenv/config';
import type { Config } from 'drizzle-kit';
// dotenv.config({path:'.env'})

if(!process.env.DATABASE_URL){
    console.log('🔴 Cannot find database password')
}
export default {
  schema: './src/lib/supabase/schema.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || '',
  },
} satisfies Config;