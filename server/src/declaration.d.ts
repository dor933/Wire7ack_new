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
  