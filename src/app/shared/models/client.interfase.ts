export type Tipo = 'Privado | Publico';

export interface ClienteDetalle {
    id: number,
    razon_social: string,
    email: string,
    direccion: string,
    tipo_cliente: Tipo,
    CUIT: number,
    presupuestos_emitidos: number,
    presupuestos_pendientes: number,
    telefono: string,
}