import IProyectRepository from "../domains/proyect_interface";
import { TypeProyects, TypeProyectsCreate } from "../domains/proyect_entity";
import {
  fromToJsonMap,
  fromToJsonMapUpdate,
  fromToJsonMapResponse,
} from "../domains/service";

class ProyectService {
  private proyectRepository: IProyectRepository;

  constructor(proyectRepository: IProyectRepository) {
    this.proyectRepository = proyectRepository;
  }

  async getProyects(): Promise<{
    success: boolean;
    message?: string;
    data?: TypeProyects[];
  }> {
    const resul = await this.proyectRepository.getProyects();
    if (!resul.length) {
      return { success: false, message: "No proyects found" };
    }
    const newResul = resul.map(fromToJsonMapResponse);
    return { success: true, data: newResul };
  }

  async getProyect(id: string): Promise<{
    success: boolean;
    message?: string;
    data?: TypeProyects;
  }> {
    const resul = await this.proyectRepository.getProyect(id);
    if (!resul) {
      return { success: false, message: "Proyect not found" };
    }

    const newResul = fromToJsonMapResponse(resul);
    return { success: true, data: newResul };
  }

  async createProyect(proyect: TypeProyectsCreate): Promise<{
    success: boolean;
    message?: string;
  }> {
    const newProyect = fromToJsonMap(proyect);

    const resul = await this.proyectRepository.createProyect(newProyect);
    if (!resul) {
      return { success: false, message: "Proyect not created" };
    }

    return { success: true, message: "Proyect created" };
  }

  async updateProyect(
    id: string,
    proyect: TypeProyectsCreate
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    const newProyect = fromToJsonMapUpdate(proyect);
    const resul = await this.proyectRepository.updateProyect(id, newProyect);
    if (!resul) {
      return { success: false, message: "Proyect not updated" };
    }
    return { success: true };
  }

  async deleteProyect(
    id: string,
    state: string
  ): Promise<{
    success: boolean;
    message?: string;
  }> {
    const resul = await this.proyectRepository.deleteProyect(id, state);
    if (!resul) {
      return { success: false, message: "Proyect not deleted" };
    }
    return { success: true };
  }
}

export default ProyectService;
