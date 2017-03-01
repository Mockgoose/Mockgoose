import { MockgooseHelper } from './mockgoose-helper';
export declare class Mockgoose {
    helper: MockgooseHelper;
    debug: any;
    mongooseObj: any;
    constructor(mongooseObj: any);
    prepareStorage(): Promise<void>;
    getMockConnectionString(port: string): string;
    mockConnectCalls(connection: string): void;
    getOpenPort(): Promise<number>;
    getMemoryStorageName(): string;
    getTempDBPath(): Promise<string>;
}
export declare class ConnectionWrapper {
    originalArguments: any;
    functionName: string;
    functionCode: any;
    mongoose: any;
    connectionString: string;
    constructor(functionName: string, mongoose: any, connectionString: string);
    run(args: any): void;
}
