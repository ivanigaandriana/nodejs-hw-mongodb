export const parseParams = (number, defaultValue) => {
    const isString = typeof number === 'string';
    if(!isString) return defaultValue;
    const parsedParams = parseInt(number);
    if(Number.isNaN(parseParams)){ return defaultValue;};
    return parsedParams;
    };
