import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const dbUrl = process.env.DATABASE_URL ?? '';
    const schemaMatch = dbUrl.match(/[?&]schema=([^&]+)/);
    const schema = schemaMatch ? schemaMatch[1] : 'public';

    const adapter = new PrismaPg(pool, { schema });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
