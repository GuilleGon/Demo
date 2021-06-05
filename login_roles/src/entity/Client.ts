import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

@Entity()
export class Client {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @MaxLength(100)
    razon_social: string;

    @Column()   //OPCIONAL
    CUIT: number;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    presupuestos_emitidos: number;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    presupuestos_pendientes: number;

    @Column()
    @IsNotEmpty()
    @MaxLength(20)
    telefono: string;

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @Column()
    @MaxLength(100)
    @IsNotEmpty()
    direccion: string;

    @Column()
    @IsNotEmpty()
    tipo_cliente: string;


}