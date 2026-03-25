import { Module } from '@nestjs/common';
import { CinemaModule } from './cinema/cinema.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FilmesModule } from './filmes/filmes.module';
import { SalasModule } from './salas/salas.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { IngressosModule } from './ingressos/ingressos.module';
import { LanchesModule } from './lanches/lanches.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { AddressModule } from './address/address.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    CinemaModule,
    FilmesModule,
    SalasModule,
    SessoesModule,
    IngressosModule,
    LanchesModule,
    PedidosModule,
    ProfileModule,
    UserModule,
    AddressModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
