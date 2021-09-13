export interface Gastos{

    id:number;
    numero: string;
    proveedor: string;
    fecha_emision: Date;
    concepto: string;

    forma_pago: string;
    banco: string;
    nro: string;
    fecha: string;
    monto: number;
}