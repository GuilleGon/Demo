import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Presupuesto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    numero: number;

    @Column()
    @IsNotEmpty()
    usuario: string;

    @Column()
    cliente: string;

    @Column()
    @CreateDateColumn()
    fecha_emision: Date;

    @Column()
    estado: string;

    @Column()
    observaciones: string;

    @Column()
    descuentos: number;

    @Column()
    recargos: number


    //--------------FORMA DE PAGO/TIPO
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
    fecha_vencimiento: Date;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    monto: number;

    @Column("decimal", { precision: 10, scale: 2 })
    total: number

    //--------------------------ITEMS

    @Column()
    @IsNotEmpty()
    tipo: string;

    @Column()
    descripcion: string;

    @Column()
    @IsNotEmpty()
    cantidad: number;



}