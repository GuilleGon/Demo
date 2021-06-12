import { IsNotEmpty, IsOptional } from "class-validator/decorator/decorators";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Gastos{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    numero: number;

    @Column()
    @IsNotEmpty()
    proveedor: string;

    @Column()
    @CreateDateColumn()
    fecha_emision: Date;

    @Column()
    @IsNotEmpty()
    concepto: string;

    

    @Column()
    @IsNotEmpty()
    forma_pago: string;

    @Column()
    @IsOptional()
    banco: string;

    @Column()
    @IsOptional()
    nro: number;

    @Column()
    @IsOptional()
    fecha: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    monto: number;

}