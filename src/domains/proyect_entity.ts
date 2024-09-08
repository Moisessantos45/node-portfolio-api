interface TypeLinks {
  frontend: string;
  backend: string;
}

interface TypeProyects {
  id: string;
  title: string;
  description: string;
  tecnologies: string[];
  caracteristicas: string[];
  image: string;
  imagenesProyect: string[];
  link: string;
  createdAt: string;
  link_gitHub: TypeLinks;
  status: string;
  typeProyect: string;
}

interface TypeProyectsCreate {
  id?: string;
  title: string;
  description: string;
  tecnologies: string;
  caracteristicas: string;
  image: string;
  imagenesProyect: string;
  link: string;
  createdAt?: string;
  link_gitHub: string;
  status: string;
  typeProyect: string;
}

export { TypeProyectsCreate, TypeProyects, TypeLinks };
