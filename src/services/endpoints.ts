export enum Endpoint {
    PRODUCTS = "PRODUCTS",
    MONEY_TYPES = "MONEY_TYPES",
    TRANSACTION_SESSIONS= "TRANSACTION_SESSIONS"
}

const endpoints: Record<Endpoint, string> = {
    [Endpoint.PRODUCTS]: 'products',
    [Endpoint.MONEY_TYPES]: 'money-types',
    [Endpoint.TRANSACTION_SESSIONS]: 'transaction-sessions'
};

const getUrl = (endpoint: Endpoint) => {
    return endpoints[endpoint];
};

export default getUrl;
