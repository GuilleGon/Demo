import { IsNotEmpty, IsOptional } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proveedores{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    razon_social: string;

    @Column()
    @IsOptional()
    CUIT: string;

    @Column()
    @IsNotEmpty()
    telefono: string;

    @Column()
    @IsNotEmpty()
    email: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

}