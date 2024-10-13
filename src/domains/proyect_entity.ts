interface TypeLinks {
  frontend: string;
  backend: string;
}

interface TypeProyectsFull {
  id: string;
  title: string;
  description: string;
  tecnologies: string;
  caracteristicas: string;
  image: string;
  imagenesProyect: string;
  link: string;
  createdAt: string;
  link_gitHub: string;
  status: string;
  typeProyect: string;
  counter_likes: number;
  changelog?: string;
}

interface TypeProyects
  extends Omit<
    TypeProyectsFull,
    "tecnologies" | "caracteristicas" | "imagenesProyect" | "link_gitHub"
  > {
  tecnologies: string[];
  caracteristicas: string[];
  imagenesProyect: string[];
  link_gitHub: TypeLinks;
}

interface TypeProyectsCreate
  extends Omit<TypeProyectsFull, "id" | "createdAt" | "counter_likes"> {}

interface TypeProyectsUpdate
  extends Omit<TypeProyectsFull, "counter_likes" | "id" | "createdAt"> {}

export {
  TypeProyectsFull,
  TypeProyectsCreate,
  TypeProyectsUpdate,
  TypeProyects,
  TypeLinks,
};
