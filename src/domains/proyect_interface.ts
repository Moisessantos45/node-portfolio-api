import { TypeProyects, TypeProyectsCreate } from "./proyect_entity";

interface IProyectRepository {
  getProyects(): Promise<TypeProyects[]>;
  getProyect(id: string): Promise<TypeProyects>;
  createProyect(proyect: TypeProyectsCreate): Promise<boolean>;
  updateProyect(id: string, proyect: TypeProyectsCreate): Promise<boolean>;
  deleteProyect(id: string, state: string): Promise<boolean>;
}

export default IProyectRepository;
