import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import {MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;
    
    hashPassword(): void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    checkPassword(password: string): boolean{
        return bcrypt.compareSync(password, this.password);
    }

}
