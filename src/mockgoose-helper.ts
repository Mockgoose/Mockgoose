const Debug: any = require('debug');
import {each as asyncEach} from 'async';

export class MockgooseHelper {
  debug: any;

  constructor(public mongoose: any, public mockgoose: any) {
    this.debug = Debug('MockgooseHelper');
  }

  setDbVersion(version: string) { {
    this.mockgoose.mongodHelper.mongoBin.mongoDBPrebuilt.mongoDBDownload.options.version = version;
  }}
  
  reset(): Promise<void>  {
    return new Promise<void>((resolve, reject) => {
      asyncEach(this.mongoose.connections, (connection: any, callback: Function) => {
        // check if it is mockgoose connection
        if (!/mockgoose-temp-db-/.test(connection.name)) {
          return callback();
        } 
        if ( connection.readyState !== 1 ) {
          return callback();
        }
        connection.dropDatabase((err: any) => {
          callback();
        }, (e: any) => {
          this.debug(`@reset err dropping database ${e}`);
          callback();
        });
      }, (err) => {
        if ( err ) {
          this.debug(`@reset err ${err}`);
          reject();
        } else {
          resolve();
        }
      })
    });
  };

  isMocked(): boolean {
    return this.mongoose.mocked;
  }
  
}