import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmesModule } from './filmes/filmes.module';
import { SalasModule } from './salas/salas.module';
import { SessoesModule } from './sessoes/sessoes.module';
import { IngressosModule } from './ingressos/ingressos.module';
import { LanchesModule } from './lanches/lanches.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [FilmesModule, SalasModule, SessoesModule, IngressosModule, LanchesModule, PedidosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
