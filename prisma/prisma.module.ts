import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Rend le service disponible partout sans ré-import
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // Indispensable pour que AuthModule le voie
})
export class PrismaModule {}