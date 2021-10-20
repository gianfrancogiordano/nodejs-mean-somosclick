import { sign } from 'jsonwebtoken';

export const generarJWT = ( uid: string, role: any, clinica: any ) => {

  // Devolvemos una promesa para poder utilizar async/await en donde lo necesitemos para avanzar ...
  return new Promise((resolve, reject) => {

    const payload = { uid, role, clinica };

    sign( payload, process.env.JWT_SECRET || '', {
      expiresIn: '24h',
    }, (err, token) => {

      if (err) {
        return reject( err );
      }

      return resolve( token );

    });

  });

};

export const getMenu = (role: any) => {

  let menu: any = [];
  let subAdmin: any = [];
  let subPacientes: any = [];

  role.modulos.forEach( (m:any) => {

    // Menu Administrativo
    if (m.modulo === 'administrativo[Menu]' && m.visualizar) {
      menu.push({
        titulo: 'Administrativo',
        icono: 'mdi mdi-gauge',
        submenu: subAdmin
      });

    } else if (m.modulo === 'dashboard[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Dashboard', url: '' });

    } else if (m.modulo === 'roles[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Gestión de roles', url: 'roles' });

    } else if (m.modulo === 'usuarios[SubMenu]' && m.visualizar) {
      subAdmin.push({ titulo: 'Gestión de usuarios', url: 'usuarios' });

    }

    // Menu Pacientes
    if (m.modulo === 'pacientes[Menu]' && m.visualizar) {
      menu.push({
        titulo: 'Pacientes',
        icono: 'mdi mdi-medical-bag',
        submenu: subPacientes
      });

    } else if (m.modulo === 'pacientes[SubMenu]' && m.visualizar) {
      subPacientes.push({ titulo: 'Gestión de pacientes', url: 'pacientes' });

    }
    
  });

  return menu;
}
