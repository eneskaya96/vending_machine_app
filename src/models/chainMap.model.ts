export interface  Product {
    name: string;
};

export interface  ChangeMap {
    [denomination: string]: number;
};

export interface  PurchaseResult {
    product: Product;
    changeMap: ChangeMap;
};


export const formatChangeMap = (changeMap: ChangeMap): string => {
    const parts: string[] = [];
    console.log("changeMap", changeMap)
    for (const [denomination, quantity] of Object.entries(changeMap)) {
        const part = `${quantity} unit${quantity > 1 ? 's' : ''} of ${denomination}-unit money`;
        parts.push(part);
    }
    return parts.join(', ');
};