const Debug: any = require('debug');

export class MockgooseHelper {
  debug: any;
  constructor(public mongoose: any) {
    this.debug = Debug('MockgooseHelper');
  }
  
  reset(): Promise<void>  {
    return new Promise<void>((resolve, reject) => {
      this.mongoose.connection.db.dropDatabase((err: any) => {
        if ( err ) {
          this.debug(`@reset err ${err}`);
          reject();
        } else {
          resolve();
        }
      });
    });
  };

  isMocked(): boolean {
    return this.mongoose.mocked;
  }
  
}