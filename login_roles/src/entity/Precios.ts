import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Precios {


    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    @IsNotEmpty()
    @MaxLength(50)
    descripcion: string;

    @Column()
    @IsNotEmpty()
    tipo_servicio: string;

    @Column()
    @IsNotEmpty()
    @MaxLength(100)
    tipo_cliente: string;
}