import { connect } from 'mongoose';

export const mongoConnection = async () => {

  try {

    await connect( process.env.DB_CNN || '', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('[MongoDB - Online]');

  } catch ( error ) {
    console.log(error);
    throw new Error('Error a la hora de iniciar Mongo Atlas');
  }

};
