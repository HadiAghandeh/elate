import IStorage from "./IStorage";
import { Amplify } from 'aws-amplify';
import outputs from "../../amplify_outputs.json";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default class AmplifyStorage implements IStorage {

    async list(model: string): Promise<any> {
        const { data, errors, nextToken } = await (client.models as any)[model]?.list();

        return { data, errors, meta: { nextToken } };
    }

    async create(model: string, payload: any): Promise<any> {
        const { data, errors } = await (client.models as any)[model].create(payload);

        return { data, errors };
    }
    async read(model: string, id: string): Promise<any> {
        // Implementation for reading an item from Amplify storage
    }
    async update(model: string, id: string, item: any): Promise<any> {
        // Implementation for updating an item in Amplify storage
    }
    async delete(model: string, id: string): Promise<any> {
        const {data, error} = await (client.models as any)[model]?.delete({id});

        return {data, error};
    }   
}
