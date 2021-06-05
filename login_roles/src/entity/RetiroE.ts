import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";
import { IsNotEmpty, MaxLength } from 'class-validator';

@Entity()
export class RetiroE {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    numero: number;

    @Column()
    @IsNotEmpty()
    responsable: string;

    @Column()
    @UpdateDateColumn()
    fecha: Date;

    @Column()
    @IsNotEmpty()
    @MaxLength(75)
    concepto: string;

    @Column("decimal", { precision: 10, scale: 2 })
    @IsNotEmpty()
    monto: number;


}