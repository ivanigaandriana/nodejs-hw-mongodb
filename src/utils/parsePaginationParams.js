
import {parseParams} from '../utils/parseNumber.js';

export const parsePaginationParams = (query) => {
    const {page, perPage} = query;
    const parsedPage = parseParams(page, 1);
    const parsedPerPage = parseParams(perPage, 10);
    return {page:parsedPage, perPage:parsedPerPage};
};
