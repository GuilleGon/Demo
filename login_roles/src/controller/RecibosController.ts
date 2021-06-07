import { validate } from "class-validator";
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Recibos } from "../entity/Recibos";

export class RecibosController {

    static getAll = async (req: Request, res: Response) => { 
        const reciboRepository = getRepository(Recibos);
        let recibos;

        try {
            recibos = await reciboRepository.find()
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (recibos.length > 0) {
            res.send(recibos);
        } else {
            res.status(404).json({ message: "Not result" });
        }

    };

    static getById = async (req: Request, res: Response) => { 

        const { id } = req.params;
        const reciboRepository = getRepository(Recibos);

        try {
            const user = await reciboRepository.findOneOrFail(id);
            res.send(user);
        } catch (e) {
            res.status(404).json({ message: 'Not Result' });
        }

    };

    static newRecibos = async (req: Request, res: Response) => { 

        const { numero, cliente, fecha_emision, forma_pago, monto, cantidad} = req.body;
        const recibo = new Recibos();

        recibo.numero = numero;
        recibo.cliente = cliente;
        recibo.fecha_emision = fecha_emision;
        recibo.forma_pago = forma_pago;
        recibo.monto = monto;
        recibo.cantidad = cantidad;

        //validacion
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(recibo, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const reciboRepository = getRepository(Recibos);
        try {
            await reciboRepository.save(recibo);
        } catch (e) {
            return res.status(409).json({ message: 'Recibo already exist' });
        }

        res.send('recibo created')

    };

    static editRecibos = async (req: Request, res: Response) => { 

        let recibo;
        const { id } = req.params;
        const {
            numero,
            cliente,
            fecha_emision,
            monto,
            forma_pago,
            cantidad
        } = req.body;

        const reciboRepository = getRepository(Recibos);

        try {
            recibo = await reciboRepository.findOneOrFail(id);

            recibo.numero = numero;
            recibo.cliente = cliente;
            recibo.fecha_emision = fecha_emision;
            recibo.forma_pago = forma_pago;
            recibo.monto = monto;
            
            recibo.cantidad = cantidad
        } catch (e) {
            return res.status(404).json({ message: 'Recibo not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(recibo, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await reciboRepository.save(recibo);
        } catch (e) {
            return res.status(409).json({ message: 'Recibo already in use' });
        }

        res.status(201).json({ message: 'Recibo update' });

    };

    static deleteRecibos = async (req: Request, res: Response) => {

        const { id } = req.params;
        const reciboRepository = getRepository(Recibos);
        let recibo: Recibos;

        try {
            recibo = await reciboRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Recibo not found' });
        }

        reciboRepository.delete(id);
        res.status(201).json({ message: 'Recibo delete' });

     };

}