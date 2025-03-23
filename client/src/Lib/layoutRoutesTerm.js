import { routes } from "../Constants";

export const layoutRoutesTerm = (path) => {
    if(path.includes('/')) {
        const pathArr = path.split('/');
        if(routes.includes(pathArr[0])) return false
    };
    if(routes.includes(path)) return false;
    return true;
};