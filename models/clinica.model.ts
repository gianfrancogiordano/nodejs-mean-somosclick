import { Schema, model } from 'mongoose';

interface Clinica {
  razon_social: string;
  documento: string;
  representante: string;
  direccion: string;
  telefono: string;
  email?: string;
  avatar?: string;
}

const ClinicaSchema = new Schema<Clinica>({

  razon_social: {
    type: String,
    require: true,
  },
  documento: {
    type: String,
    require: true,
    unique: true
  },
  representante: {
    type: String,
    require: true,
  },
  direccion: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
    require: true,
  },
  activo: {
    type: Number,
    default: 1
  },
  email: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: true,
  }

});

export const Clinica = model<Clinica>('Clinica', ClinicaSchema);
