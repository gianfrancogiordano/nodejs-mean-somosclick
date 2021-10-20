import { Schema, model } from 'mongoose';

interface Role {
  descripcion: string;
  modulos: any[];
  clinica: string;
}

const RoleSchema = new Schema<Role>({

  descripcion: {
    type: String,
    require: true,
  },
  modulos: [{
    modulo: String,
    visualizar: Boolean,
    editar: Boolean,
    eliminar: Boolean
  }],
  clinica: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Clinica'
  }

});

export const Role = model<Role>('Role', RoleSchema);
