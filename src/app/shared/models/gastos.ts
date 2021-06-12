export interface Gastos{

    id:number;
    numero: number;
    proveedor: string;
    fecha_emision: Date;
    concepto: string;

    forma_pago: string;
    banco: string;
    nro: number;
    fecha: Date;
    monto: number;
}