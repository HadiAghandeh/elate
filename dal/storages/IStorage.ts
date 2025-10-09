export default interface IStorage {
    list(model: string): Promise<any>;
    create(model: string, data: any): Promise<any>;
    read(model: string, id: string): Promise<any>;
    update(model: string, id: string, item: any): Promise<any>;
    delete(model: string, id: string): Promise<any>;
}
