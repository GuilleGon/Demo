import { IsNotEmpty, IsOptional } from "class-validator/decorator/decorators";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gastos{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    numero: string;

    @Column()
    @IsNotEmpty()
    proveedor: string;

    @Column()
    @CreateDateColumn()
    fecha_emision: Date;

    @Column()
    @IsNotEmpty()
    concepto: string;

    

   //--------------FORMA DE PAGO/TIPO
   @Column({ default: '' })
   @IsNotEmpty()
   forma_pago: string;

   @Column({ default: '' })
   banco: string;

   @Column({ default: '' })
   nro: string;

   @Column({ default: '' })
   fecha: string;

   @Column("decimal", { precision: 15, scale: 2 })
   @IsNotEmpty()
   monto: number;

}