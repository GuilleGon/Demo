export type Estado = 'Borrador | Emitido | En produccion | Entregado';

export interface Recibo{

    id: number;
    numero: number;
    cliente: string;
    fecha_emision: Date;

    //presupuesto
    forma_pago: string;
    fecha_vencimiento: string;
    monto: number;

    cantidad: number;
    //En la impresión agregar leyenda con el saldo adeudado del comprobante. 
    //impresion x2
}