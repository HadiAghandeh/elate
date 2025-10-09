import { Amplify } from "aws-amplify";
import Test from "../models/Test";
import IStorage from "../storages/IStorage";
import AmplifyStorage from "../storages/AmplifyStorage";
import IBasicRepo, { ICreateResult, IListResult } from "./IBasicRepo";

export class TestRepo implements IBasicRepo<Test> {
    storage: IStorage;

    constructor() {
        this.storage = new AmplifyStorage();
    }

    async findById(id: string): Promise<Test | null> {
        const result = await this.storage.read('Test', id);
        return result || null;
    }

    async list(): Promise<IListResult> {
        const result = await this.storage.list('Test');

        return result;
    }

    async create(data: Test): Promise<ICreateResult> {
        const result = await this.storage.create('Test', data);
        return result;
    }

    async update(id: string, item: Partial<Test>): Promise<Test | null> {
        const result = await this.storage.update('Test', id, item);
        return result || null;
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.storage.delete('Test', id);
        console.log('delete result', result);
        return !!result;
    }
}