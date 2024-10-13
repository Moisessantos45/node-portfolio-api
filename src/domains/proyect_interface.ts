import { TypeProyects, TypeProyectsFull,TypeProyectsUpdate } from "./proyect_entity";

interface IProyectRepository {
  getProyects(): Promise<TypeProyects[]>;
  getProyect(id: string): Promise<TypeProyects>;
  createProyect(proyect: TypeProyectsFull): Promise<boolean>;
  updateProyect(id: string, proyect: TypeProyectsUpdate): Promise<boolean>;
  updateStateProyect(id: string, state: string): Promise<boolean>;
  updateLikesCount(id: string, count: number): Promise<boolean>;
  deleteProyect(id: string, state: string): Promise<boolean>;
}

export default IProyectRepository;
