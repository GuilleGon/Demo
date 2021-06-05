import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Client } from "../entity/Client";
import { validate } from "class-validator";

export class ClientController {


    static getAll = async (req: Request, res: Response) => {
        const clientRepository = getRepository(Client);
        let clients;

        try {
            clients = await clientRepository.find()
        } catch (e) {
            res.status(404).json({ message: 'Something goes wrong' });
        }

        if (clients.length > 0) {
            res.send(clients);
        } else {
            res.status(404).json({ message: "Not result" });
        }
    }

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const clientRepository = getRepository(Client);

        try {
            const user = await clientRepository.findOneOrFail(id);
            res.send(user);
        } catch (e) {
            res.status(404).json({ message: 'Not Result' });
        }
    };

    static newClient = async (req: Request, res: Response) => {
        const { razon_social, email, direccion, tipo_cliente, CUIT, presupuestos_emitidos, presupuestos_pendientes, telefono } = req.body;
        const client = new Client();

        client.razon_social = razon_social;
        client.email = email;
        client.direccion = direccion;
        client.tipo_cliente = tipo_cliente;
        client.CUIT = CUIT;
        client.presupuestos_emitidos = presupuestos_emitidos;
        client.presupuestos_pendientes = presupuestos_pendientes;
        client.telefono = telefono;

        //validacion
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(client, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const clientRepository = getRepository(Client);
        try {
            await clientRepository.save(client);
        } catch (e) {
            return res.status(409).json({ message: 'Client already exist' });
        }

        res.send('client created')

    };

    static editClient = async (req: Request, res: Response) => {
        let client;
        const { id } = req.params;
        const {
            razon_social,
            email,
            direccion,
            tipo_cliente,
            CUIT,
            presupuestos_emitidos,
            presupuestos_pendientes,
            telefono
        } = req.body;

        const clientRepository = getRepository(Client);

        try {
            client = await clientRepository.findOneOrFail(id);

            client.razon_social = razon_social;
            client.email = email;
            client.direccion = direccion;
            client.tipo_cliente = tipo_cliente;
            client.CUIT = CUIT;
            client.presupuestos_emitidos = presupuestos_emitidos;
            client.presupuestos_pendientes = presupuestos_pendientes;
            client.telefono = telefono
        } catch (e) {
            return res.status(404).json({ message: 'Client not found' });
        }

        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(client, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        try {
            await clientRepository.save(client);
        } catch (e) {
            return res.status(409).json({ message: 'Client already in use' });
        }

        res.status(201).json({ message: 'Client update' });
    };

    static deleteClient = async (req: Request, res: Response) => {
        const { id } = req.params;
        const clientRepository = getRepository(Client);
        let client: Client;

        try {
            client = await clientRepository.findOneOrFail(id);
        } catch (e) {
            return res.status(404).json({ message: 'Client not found' });
        }

        clientRepository.delete(id);
        res.status(201).json({ message: 'Client delete' });

    }

}