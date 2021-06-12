import { validate } from "class-validator";
import { Request, Response } from "express"
import { getRepository } from "typeorm"
import { RetiroE } from "../entity/RetiroE"

export class RetiroController {

    static getAll = async (req: Request, res: Response) => {
        const retiroRepository = getRepository(RetiroE);
        let retiro;

        try {
            retiro = await retiroRepository.find()
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (retiro.length > 0) {
            res.send(retiro);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const retiroRepository = getRepository(RetiroE);

        try {
            const retiro = await retiroRepository.findOneOrFail(id);
            res.send(retiro);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static newRetiro = async (req: Request, res: Response) => {
        const { concepto, fecha, numero, monto, responsable } = req.body;
        const retiro = new RetiroE();

        retiro.concepto = concepto;
        retiro.fecha = fecha;
        retiro.monto = monto;
        retiro.numero = numero;
        retiro.responsable = responsable;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(retiro, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const retiroRepository = getRepository(RetiroE);
        try {
            await retiroRepository.save(retiro);
        } catch (e) {
            return res.status(409).json({ message: `retiro already exist: ${e}` });
        }

        res.send('retiro created');
    };

    static editRetiro = async (req: Request, res: Response) => {
        let retiro;
        const { id } = req.params;
        const { concepto, fecha, numero, monto, responsable } = req.body;

        const retiroRepository = getRepository(RetiroE);

        try {
            retiro = await retiroRepository.findOneOrFail(id);

            retiro.concepto = concepto;
            retiro.fecha = fecha;
            retiro.monto = monto;
            retiro.numero = numero;
            retiro.responsable = responsable;
        } catch (e) {
            return res.status(404).json({ message: 'Retiro not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(retiro, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await retiroRepository.save(retiro);
        } catch (e) {
            return res.status(409).json({ message: 'Retiro already in use' });
        }

        res.status(201).json('retiro update');
    };

    static deleteRetiro = async (req: Request, res: Response) => {
        const { id } = req.params;
        const retiroRepository = getRepository(RetiroE);
        let retiro: RetiroE;

        try {
            retiro = await retiroRepository.findOneOrFail(id)
        } catch (e) {
            return res.status(404).json({ message: 'Retiro not found' });
        }

        retiroRepository.delete(id);
        res.status(201).json({ message: 'Retiro delete' });
    };

}