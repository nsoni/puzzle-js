import nock from "nock";
import {IExposeConfig} from "../../src/types/gateway";

export const createGateway = (gatewayName: string, gatewayUrl: string, config: IExposeConfig, persist = false) => {
    let scope = nock(gatewayUrl);

    if (persist) {
        scope = scope.persist();
    }

    scope = scope
        .get('/')
        .reply(200, config);

    return scope;
};


export const createExpressMock = (extendable?: {write?: Function, end?: Function, set?: Function, status?: Function}) => {
    let expressMock = {
        write: extendable && extendable.write || (()  => ''),
        end: extendable && extendable.end || (()  => ''),
        set: extendable && extendable.set || (()  => ''),
        status: () => {
            if(extendable && extendable.status){
                extendable.status();
            }
            return expressMock;
        }
    };

    return expressMock;
};