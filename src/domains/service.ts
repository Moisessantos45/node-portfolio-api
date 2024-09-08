import { TypeProyects } from "./proyect_entity";

const generateDate = (): string => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const fromToJsonMap = (data: { [key: string]: any }): any => {
  return {
    ...data,
    caracteristicas: JSON.stringify(data.caracteristicas),
    tecnologies: JSON.stringify(data.tecnologies),
    imagenesProyect: JSON.stringify(data.imagenesProyect),
    link_gitHub: JSON.stringify(data.link_gitHub),
    createdAt: generateDate(),
  };
};

const fromToJsonMapUpdate = (data: { [key: string]: any }): any => {
  return {
    ...data,
    caracteristicas: JSON.stringify(data.caracteristicas),
    tecnologies: JSON.stringify(data.tecnologies),
    imagenesProyect: JSON.stringify(data.imagenesProyect),
    link_gitHub: JSON.stringify(data.link_gitHub),
  };
};

const fromToJsonMapResponse = (data: { [key: string]: any }): TypeProyects => {
  return {
    id: data["id"],
    title: data["title"],
    typeProyect: data["typeProyect"],
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

export {
  generateDate,
  fromToJsonMap,
  fromToJsonMapUpdate,
  fromToJsonMapResponse,
};
