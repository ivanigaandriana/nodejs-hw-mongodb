import{SORT_ORDER} from '../constans/index.js';

export const parseSortingParams = (sortOrder) => {
    const isKnowOrder=[SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
    if(isKnowOrder) return sortOrder;
    return SORT_ORDER.ASC;
};
const parseSortBy= (sortBy) => {
    const keysOfSortBy = [
        '_id',
        'name',
        'phoneNumber',
        'email',
        'isFavourite',
        'contactType',
        'createdAt',
        'updatedAt',
    ];
    if(keysOfSortBy.includes(sortBy)) {return sortBy;}
    return '_id';
};
export const parseSortParams = (query) => {
    const {sortBy, sortOrder} = query;
    const parsedSortOrder = parseSortingParams(sortOrder);
    const parsedSortBy = parseSortBy(sortBy);
    return{
        sortOrder:parsedSortOrder,
        sortBy:parsedSortBy,
    };
};
