import { IsNotEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Recibos {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    numero: number;

    @Column()
    @IsNotEmpty()
    cliente: string;

    @Column()
    @CreateDateColumn()
    fecha_emision: Date;

    @Column()
    @IsNotEmpty()
    forma_pago: string;

    @Column()
    @IsNotEmpty()
    monto: number;

    @Column()
    @IsNotEmpty()
    cantidad: number;


}