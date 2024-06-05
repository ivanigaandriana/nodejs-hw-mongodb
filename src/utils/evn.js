
export const evn = (evnName, defaultValue) => {
const value = process.env[`${evnName}`];
if(value)return value;
if(defaultValue)return defaultValue;
throw new Error(`Missing:process.env [${evnName}]`);
};
