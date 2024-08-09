import { TypeProyectsCreate } from "../domains/proyect_entity";
import IProyectRepository from "../domains/proyect_interface";
import { RepositorioBase } from "../shared/repositorio_base";
import { Proyect } from "../shared/model";

class ProyectRepository
  extends RepositorioBase<Proyect>
  implements IProyectRepository
{
  constructor() {
    super(Proyect, "id");
  }

  async getProyects(): Promise<any[]> {
    return this.findAll();
  }

  async getProyect(id: string): Promise<any> {
    return this.findById(id);
  }

  async createProyect(proyect: Partial<Proyect>): Promise<boolean> {
    return this.create(proyect).then(() => true);
  }

  async updateProyect(
    id: string,
    proyect: TypeProyectsCreate
  ): Promise<boolean> {
    return this.update(id, proyect).then(() => true);
  }

  async deleteProyect(id: string,state:string): Promise<boolean> {
    return this.delete(id,state).then(() => true);
  }
}

export default ProyectRepository;
