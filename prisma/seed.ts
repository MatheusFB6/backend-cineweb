import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const dbUrl = process.env['DATABASE_URL'] ?? '';
const schemaMatch = dbUrl.match(/[?&]schema=([^&]+)/);
const schema = schemaMatch ? schemaMatch[1] : 'public';

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool, { schema });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Criar Profiles padrão (Admin e User)
  const adminProfile = await prisma.profile.upsert({
    where: { id: 'profile-admin-001' },
    update: { name: 'Admin' },
    create: { id: 'profile-admin-001', name: 'Admin' },
  });

  const userProfile = await prisma.profile.upsert({
    where: { id: 'profile-user-001' },
    update: { name: 'User' },
    create: { id: 'profile-user-001', name: 'User' },
  });

  console.log('✅ Profiles criados:');
  console.log('  - Admin:', adminProfile.id);
  console.log('  - User:', userProfile.id);

  // Criar um Cinema de exemplo
  const cinema = await prisma.cinema.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      nome: 'CineWeb Central',
      endereco: 'Av. Principal, 100 - Centro',
    },
  });

  console.log('✅ Cinema criado:', cinema.nome);
  console.log('🎉 Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
