import { Schema, model } from 'mongoose';

interface Usuario {
  nombre: string;
  user: string;
  email: string;
  activo: string;
  password: string;
  role: string;
  clinica: string;
  avatar?: string;
}

const UsuarioSchema = new Schema<Usuario>({

  nombre: {
    type: String,
    require: true,
  },
  user: {
    type: String,
    require: true,
    unique: true
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  activo: {
    type: Number,
    default: 1,
  },
  role: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Role'
  },
  clinica: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: 'Clinica'
  },
  avatar: {
    type: String,
  }

});

export const Usuario = model<Usuario>('Usuario', UsuarioSchema);
