"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromToJsonMapResponse = exports.fromToJsonMapUpdate = exports.fromToJsonMap = exports.generateDate = void 0;
const generateDate = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
exports.generateDate = generateDate;
const fromToJsonMap = (data) => {
    return Object.assign(Object.assign({}, data), { caracteristicas: JSON.stringify(data.caracteristicas), tecnologies: JSON.stringify(data.tecnologies), imagenesProyect: JSON.stringify(data.imagenesProyect), link_gitHub: JSON.stringify(data.link_gitHub), createdAt: generateDate() });
};
exports.fromToJsonMap = fromToJsonMap;
const fromToJsonMapUpdate = (data) => {
    return Object.assign(Object.assign({}, data), { caracteristicas: JSON.stringify(data.caracteristicas), tecnologies: JSON.stringify(data.tecnologies), imagenesProyect: JSON.stringify(data.imagenesProyect), link_gitHub: JSON.stringify(data.link_gitHub) });
};
exports.fromToJsonMapUpdate = fromToJsonMapUpdate;
const fromToJsonMapResponse = (data) => {
    return {
        id: data["id"],
        title: data["title"],
        description: data["description"],
        image: data["image"],
        link: data["link"],
        createdAt: data["createdAt"],
        status: data["status"],
        caracteristicas: JSON.parse(data.caracteristicas),
        tecnologies: JSON.parse(data.tecnologies),
        imagenesProyect: JSON.parse(data.imagenesProyect),
        link_gitHub: JSON.parse(data.link_gitHub),
    };
};
exports.fromToJsonMapResponse = fromToJsonMapResponse;
