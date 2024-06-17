 const parseFilterParams = (gender) => {
   const isString = typeof gender === 'string';
   if(!isString) return ;
   const isGender=(gender)=>['male','female','other' ].includes(gender);
   if(isGender(gender)) return gender;
};
export const parseFilterParams = (query) => {
    const {gender} = query;
    return parseFilterParams(gender);
};
