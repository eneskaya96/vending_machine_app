export enum Endpoint {
    PRODUCTS = "PRODUCTS",
    MONEY_TYPES = "MONEY_TYPES",
}

const endpoints: Record<Endpoint, string> = {
    [Endpoint.PRODUCTS]: 'products',
    [Endpoint.MONEY_TYPES]: 'money-types'
};

const getUrl = (endpoint: Endpoint) => {
    return endpoints[endpoint];
};

export default getUrl;
