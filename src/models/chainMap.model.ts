// Define types for product and change map
export interface  Product {
    name: string;
};

export interface  ChangeMap {
    [denomination: string]: number;
};

// Define a type for the result of the purchase operation
export interface  PurchaseResult {
    product: Product;
    changeMap: ChangeMap;
};


// Function to format the change map into a human-readable string
export const formatChangeMap = (changeMap: ChangeMap): string => {
    const parts: string[] = [];
    console.log("changeMap", changeMap)
    for (const [denomination, quantity] of Object.entries(changeMap)) {
        const part = `${quantity} unit${quantity > 1 ? 's' : ''} of ${denomination}-unit money`;
        parts.push(part);
    }
    return parts.join(', ');
};