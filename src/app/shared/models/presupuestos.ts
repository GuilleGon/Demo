import { UserDetail } from "./user.interface";

export type Estado = 'Borrador | Emitido | En produccion | Entregado';

export interface Presuspuestos {
    id: number;
    numero: number;
    usuario: string;
    cliente: string;
    fecha_emision: Date;
    estado: Estado;
    observaciones: string;
    descuentos: number;
    recargos: number;

    forma_pago: string;
    banco: string;
    nro: number;
    fecha_vencimiento: string;
    monto: number; //Muestra en el recibo
    total: number;

    tipo: string;
    descripcion: string;//Muestra en el recibo
    cantidad: number;//Muestra en el recibo
}
