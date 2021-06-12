import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presupuesto {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    @IsNotEmpty()
    numero: string;

    @Column({ default: '' })
    @IsNotEmpty()
    usuario: string;

    @Column({ default: '' })
    @IsNotEmpty()
    cliente: string;


    @Column({ default: '' })
    @CreateDateColumn()
    fecha_emision: Date;

    @Column({ default: '' })
    estado: string;

    @Column({ length: 1500 })
    observaciones: string;

    @Column({ default: 0 })
    descuentos: number;

    @Column({ default: 0 })
    recargos: number


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

    @Column("decimal", { precision: 10, scale: 2 })
    total: number

    //--------------------------ITEMS

    @Column({ default: '' })
    montoI: string;

    @Column({ default: '' })
    tipo: string;

    @Column({ default: '' })
    descripcion: string;

    @Column({ default: 0 })
    cantidad: number;


}