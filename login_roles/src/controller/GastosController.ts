import { validate } from "class-validator";
import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Gastos } from "../entity/Gastos";

export class GastosController{

    static getAll = async (req: Request, res: Response) => {
        const gastoRepository = getRepository(Gastos);
        let gastos;

        try {
            gastos = await gastoRepository.find()
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (gastos.length > 0) {
            res.send(gastos);
        } else {
            res.status(404).json({ message: "Not result" });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const gastoRepository = getRepository(Gastos);

        try {
            const gasto = await gastoRepository.findOneOrFail(id);
            res.send(gasto);
        } catch (e) {
            res.status(404).json({ message: 'Not Result' });
        }
    }

    static newGasto = async (req: Request, res: Response) => {
        const { numero, proveedor, fecha_emision, concepto, forma_pago, banco, monto, nro, fecha } = req.body;
        const gasto = new Gastos();

        gasto.numero = numero;
        gasto.proveedor = proveedor;
        gasto.fecha_emision = fecha_emision;
        gasto.concepto = concepto;
        gasto.forma_pago = forma_pago;
        
        if (forma_pago == "Cheque") {
            gasto.banco = banco;
            gasto.nro = nro;
            gasto.monto = monto;
            gasto.fecha = fecha
        } else if (forma_pago == "Efectivo") {
            gasto.monto = monto;
        } else {
            gasto.banco = banco;
            gasto.nro = nro;
            gasto.monto = monto;
        }

        //validacion
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(gasto, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const gastoRepository = getRepository(Gastos);
        try {
            await gastoRepository.save(gasto);
        } catch (e) {
            return res.status(409).json({ message: `Gasto already exist ${e}` });
        }

        res.send('gasto created')
    }

    static editGasto = async (req: Request, res: Response) => {
        let gasto;
        const { id } = req.params;
        const {
            numero,
            proveedor,
            fecha_emision,
            concepto,
            forma_pago,
            banco,
            nro,
            monto,
            fecha
        } = req.body;

        const gastoRepository = getRepository(Gastos);

        try {
            gasto = await gastoRepository.findOneOrFail(id);

            gasto.numero = numero;
            gasto.proveedor = proveedor;
            gasto.fecha_emision = fecha_emision;
            gasto.concepto = concepto;
            gasto.forma_pago = forma_pago;
            
            
            if (forma_pago == "Cheque") {
                gasto.banco = banco;
                gasto.nro = nro;
                gasto.monto = monto;
                gasto.fecha = fecha
            } else if (forma_pago == "Efectivo") {
                gasto.monto = monto;
            } else {
                gasto.banco = banco;
                gasto.nro = nro;
                gasto.monto = monto;
            }
        } catch (e) {
            return res.status(404).json({ message: 'gasto not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(gasto, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await gastoRepository.save(gasto);
        } catch (e) {
            return res.status(409).json({ message: 'gasto already in use' });
        }

        res.status(201).json({ message: 'gasto update' });
    }

    static deleteGasto = async (req: Request, res: Response) => {
        const { id } = req.params;
        const gastoRepository = getRepository(Gastos);
        let gasto: Gastos;

        try {
            gasto = await gastoRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'gasto not found' });
        }

        gastoRepository.delete(id);
        res.status(201).json({ message: 'gasto delete' });
    }
    

}