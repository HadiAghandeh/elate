import IStorage from "../storages/IStorage";

export interface IListResult {
    data: any[];
    errors: any;
    meta?: any;
}

export interface ICreateResult {
    data: any;
    errors: any;
}

export interface IUpdateResult {
    data: any;
    errors: any;
}

export default interface IBasicRepo<T> {
    storage: IStorage;
    findById(id: string): Promise<T | null>;
    list(): Promise<IListResult>;
    create(data: T): Promise<ICreateResult>;
    update(id: string, item: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}