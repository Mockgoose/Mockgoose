export declare class MockgooseHelper {
    mongoose: any;
    debug: any;
    constructor(mongoose: any);
    reset(): Promise<void>;
    isMocked(): boolean;
}
