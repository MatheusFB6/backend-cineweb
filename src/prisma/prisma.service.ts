import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 1. Cria o pool de conexão
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    
    // 2. A CORREÇÃO: Passamos o schema 'dev-cinema' diretamente para o adaptador!
    // Isso ensina o Prisma a montar as queries no lugar certo.
    const adapter = new PrismaPg(pool, {
      schema: 'dev-cinema',
    });
    
    // 3. Envia o adaptador para o PrismaClient
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}