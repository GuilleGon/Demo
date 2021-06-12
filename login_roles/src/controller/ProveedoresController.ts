import { validate } from "class-validator";
import { Request, Response } from "express"
import { getRepository } from "typeorm";
import { Proveedores } from "../entity/Proveedores";

export class ProveedoresController{

    static getAll = async (req: Request, res: Response) => {
        const proveedorRepository = getRepository(Proveedores);
        let proveedor;

        try {
            proveedor = await proveedorRepository.find()
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (proveedor.length > 0) {
            res.send(proveedor);
        } else {
            res.status(404).json({ message: "Not result" });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proveedorRepository = getRepository(Proveedores);

        try {
            const prov = await proveedorRepository.findOneOrFail(id);
            res.send(prov);
        } catch (e) {
            res.status(404).json({ message: 'Not Result' });
        }
    };

    static newProveedor = async (req: Request, res: Response) => {
        const { razon_social, CUIT, email, direccion, telefono } = req.body;
        const proveedor = new Proveedores();

        proveedor.razon_social = razon_social;
        proveedor.CUIT = CUIT;
        proveedor.email = email;
        proveedor.direccion = direccion;
        proveedor.telefono = telefono;

        //validacion
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(proveedor, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const proveedorRepository = getRepository(Proveedores);
        try {
            await proveedorRepository.save(proveedor);
        } catch (e) {
            return res.status(409).json({ message: `Proveedor already exist: ${e}` });
        }

        res.send('proveedor created');
    };

    static editProveedor = async (req: Request, res: Response) => {
        let proveedor;
        const { id } = req.params;
        const {
            razon_social, CUIT, email, direccion, telefono
        } = req.body;

        const proveedorRepository = getRepository(Proveedores);

        try {
            proveedor = await proveedorRepository.findOneOrFail(id);

            proveedor.razon_social = razon_social;
            proveedor.email = email;
            proveedor.direccion = direccion;
            proveedor.CUIT = CUIT;
            proveedor.telefono = telefono
        } catch (e) {
            return res.status(404).json({ message: 'proveedor not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(proveedor, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await proveedorRepository.save(proveedor);
        } catch (e) {
            return res.status(409).json({ message: 'proveedor already in use' });
        }

        res.status(201).json({ message: 'proveedor update' });
    };

    static deleteProveedor = async (req: Request, res: Response) => {
        const { id } = req.params;
        const proveedorRepository = getRepository(Proveedores);
        let proveedor: Proveedores;

        try {
            proveedor = await proveedorRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'proveedor not found' });
        }

        proveedorRepository.delete(id);
        res.status(201).json({ message: 'proveedor deleted' });
    };
    

}