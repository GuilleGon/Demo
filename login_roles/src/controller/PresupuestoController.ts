import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Client } from "../entity/Client";
import { Presupuesto } from "../entity/Presupuestos";

export class PresupuestoController {

    static getAll = async (req: Request, res: Response) => {
        const presuRepository = getRepository(Presupuesto);
        let presupuesto;

        try {
            presupuesto = await presuRepository.find();
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (presupuesto.length > 0) {
            res.send(presupuesto);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const presuRepository = getRepository(Presupuesto);

        try {
            const presupuesto = await presuRepository.findOneOrFail(id);
            res.send(presupuesto);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static newPresupuesto = async (req: Request, res: Response) => {
        const { numero, usuario, cliente, observaciones, descuentos, recargos, estado, forma_pago, banco, nro, fecha_vencimiento, monto, tipo, descripcion, cantidad } = req.body;
        const presupuesto = new Presupuesto();

        let total;
        if ((descuentos && recargos) > 0) {
            total = monto - (monto * descuentos / 100) + (monto * recargos / 100);

        } else if ((descuentos <= 0) && (recargos > 0)) {
            total = monto + (monto * recargos / 100);

        } else if ((descuentos > 0) && (recargos <= 0)) {
            total = monto - (monto * descuentos / 100);

        } else {
            total = monto;
        }


        presupuesto.numero = numero;
        presupuesto.usuario = usuario;
        presupuesto.cliente = cliente;

        presupuesto.observaciones = observaciones;
        presupuesto.descuentos = descuentos;
        presupuesto.recargos = recargos;
        presupuesto.estado = estado;
        presupuesto.forma_pago = forma_pago;

            presupuesto.banco = banco;
            presupuesto.nro = nro;
            presupuesto.monto = monto;
            presupuesto.fecha_vencimiento = fecha_vencimiento;

        presupuesto.total = total;
        presupuesto.tipo = tipo;
        presupuesto.descripcion = descripcion;
        presupuesto.cantidad = cantidad;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(presupuesto, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const presuRepository = getRepository(Presupuesto);
        
        
        try {
            await presuRepository.save(presupuesto);
        } catch (e) {
            return res.status(409).json({ message: 'Presupuesto already exist' });
        }

        res.send('Presupuesto created');
    };

    static editPresupuesto = async (req: Request, res: Response) => {
        let presupuesto;

        const { id } = req.params;
        const {
            numero,
            usuario,
            cliente,
            observaciones,
            descuentos,
            recargos,
            estado,
            forma_pago,
            banco,
            nro,
            fecha_vencimiento,
            monto,
            tipo,
            descripcion,
            cantidad
        } = req.body;

        
        let total;
        total = monto - (monto * descuentos / 100) + (monto * recargos / 100);

        const presuRepository = getRepository(Presupuesto);

        try {
            presupuesto = await presuRepository.findOneOrFail(id);

            presupuesto.numero = numero;
            presupuesto.usuario = usuario;
            presupuesto.cliente = cliente;
            presupuesto.fecha_emision = new Date();
            presupuesto.observaciones = observaciones;
            presupuesto.descuentos = descuentos;
            presupuesto.recargos = recargos;
            presupuesto.estado = estado;
            presupuesto.forma_pago = forma_pago;

            presupuesto.banco = banco;
            presupuesto.nro = nro;
            presupuesto.monto = monto;
            presupuesto.fecha_vencimiento = fecha_vencimiento

            presupuesto.total = total;
            presupuesto.tipo = tipo;
            presupuesto.descripcion = descripcion;
            presupuesto.cantidad = cantidad;

        } catch (e) {
            return res.status(404).json({ message: 'Presupeusto not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(presupuesto, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await presuRepository.save(presupuesto);
        } catch (e) {
            return res.status(409).json({ message: 'Presupuesto already in use' });
        }

        res.status(201).json({ message: 'Presupuesto uptdate' });
    };

    static deletePresupuesto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const presuRepository = getRepository(Presupuesto);
        let presupuesto: Presupuesto;

        try {
            presupuesto = await presuRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Presupuesto not found' });
        }

        presuRepository.delete(id);
        res.status(201).json({ message: 'Presupuesto delete' });
    };
}