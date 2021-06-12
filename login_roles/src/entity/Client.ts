import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    razon_social: string;

    @Column()
    @IsNotEmpty()
    CUIT: string;

    @Column()
    @IsNotEmpty()
    presupuestos_emitidos: number;

    @Column()
    @IsNotEmpty()
    presupuestos_pendientes: number;

    @Column()
    @IsNotEmpty()
    telefono: string;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

    @Column()
    @IsNotEmpty()
    tipo_cliente: string;

}