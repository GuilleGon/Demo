

export interface Presuspuestos {
    id: number;
    numero: string;
    usuario: string;
    cliente: string;
    fecha_emision: string;
    estado: string;
    observaciones: string;
    descuentos: number;
    recargos: number;

    forma_pago: string;
    banco: string;
    nro: string;
    fecha: string;
    monto: number; //Muestra en el recibo
    total: number;

    montoI: number;
    tipo: string;
    descripcion: string;//Muestra en el recibo
    cantidad: number;//Muestra en el recibo
}
