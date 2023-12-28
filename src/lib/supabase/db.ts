import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from './schema';
dotenv.config({ path: '.env' });

if(!process.env.DATABASE_URL)throw new Error('🔴 no database URL');

const client=postgres(process.env.DATABASE_URL as string,{max:1});

const db=drizzle(client,{schema});

const migrateDb=async ()=>{
    try{
        console.log('🟠 Migrating Client');
        await migrate(db,{migrationsFolder:'migrations'});
        console.log('🟢 Successfully Migrated');
    }
    catch(error){
        console.log('❌ Failed to Migrate');
    }
}
migrateDb();
export default db;