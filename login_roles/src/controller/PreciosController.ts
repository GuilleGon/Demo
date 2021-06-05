import { validate } from "class-validator";
import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Precios } from "../entity/Precios";

export class PreciosController {

    static getAll = async (req: Request, res: Response) => {
        const precioRepository = getRepository(Precios);
        let precios;

        try {
            precios = await precioRepository.find();
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (precios.length > 0) {
            res.send(precios);
        } else {
            res.status(404).json({ message: 'Not result' });
        }

    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const precioRepository = getRepository(Precios);

        try {
            const precio = await precioRepository.findOneOrFail(id);
            res.send(precio);
        } catch (e) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static newPrecio = async (req: Request, res: Response) => {
        const { descripcion, tipo_servicio, tipo_cliente } = req.body;
        const precios = new Precios();

        precios.descripcion = descripcion;
        precios.tipo_servicio = tipo_servicio;
        precios.tipo_cliente = tipo_cliente;

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(precios, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const precioRepository = getRepository(Precios);
        try {
            await precioRepository.save(precios);
        } catch (e) {
            return res.status(409).json({ message: 'Precio already exist' });
        }

        res.send('Precio created');
    };

    static editPrecio = async (req: Request, res: Response) => {
        let precio;
        const { id } = req.params;
        const {
            descripcion,
            tipo_cliente,
            tipo_servicio
        } = req.body;

        const precioRepository = getRepository(Precios);

        try {
            precio = await precioRepository.findOneOrFail(id);

            precio.descripcion = descripcion;
            precio.tipo_cliente = tipo_cliente;
            precio.tipo_servicio = tipo_servicio;
        } catch (e) {
            return res.status(404).json({ message: 'Precio not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(precio, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await precioRepository.save(precio);
        } catch (e) {
            return res.status(409).json({ message: 'precio already in use' });
        }

        res.status(201).json({ message: 'precio update' });

    };

    static deletePrecio = async (req: Request, res: Response) => {
        const { id } = req.params;
        const preciosRepository = getRepository(Precios);
        let precios: Precios;

        try {
            precios = await preciosRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'precios not found' });
        }

        preciosRepository.delete(id);
        res.status(201).json({ message: 'precios delete' });
    };
}