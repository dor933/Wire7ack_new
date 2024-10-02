declare module 'json-bigint' {
    type Reviver = (key: string, value: any) => any;
  
    interface Options {
      strict?: boolean;
      storeAsString?: boolean;
      alwaysParseAsBig?: boolean;
      useNativeBigInt?: boolean;
      protoAction?: 'error' | 'ignore' | 'preserve';
      constructorAction?: 'error' | 'ignore' | 'preserve';
    }
  
    interface JSONBig {
      parse(text: string, reviver?: Reviver): any;
      stringify(
        value: any,
        replacer?: (key: string, value: any) => any,
        space?: string | number
      ): string;
    }
  
    function JSONBigFactory(options?: Options): JSONBig;
  
    export default JSONBigFactory;
  }

  declare module 'cors' {
    import { RequestHandler } from 'express';
  
    interface CorsOptions {
      origin?: boolean | string | RegExp | (string | RegExp)[] | ((origin: string) => string);
      methods?: string | string[];
      allowedHeaders?: string | string[];
      exposedHeaders?: string | string[];
      credentials?: boolean;
      maxAge?: number;
      preflightContinue?: boolean;
      optionsSuccessStatus?: number;
    }
  
    function cors(options?: CorsOptions): RequestHandler;
  
    export = cors;
  }
  