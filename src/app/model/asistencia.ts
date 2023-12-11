export class Asistencia {

    public sede: string;
    public idAsignatura: string;
    public seccion: string;
    public nombreAsignatura: string;
    public nombreProfesor: string;
    public dia: string;
    public bloqueInicio: number;
    public bloqueTermino: number;
    public horaInicio: string;
    public horaFin: string;
    
    constructor() {
      this.sede = '';
      this.idAsignatura = '';
      this.seccion = '';
      this.nombreAsignatura = '';
      this.nombreProfesor = '';
      this.dia = '';
      this.bloqueInicio = 0;
      this.bloqueTermino = 0;
      this.horaInicio = '';
      this.horaFin = '';
    }
  
    public setAsistencia(
      sede: string,
      idAsignatura: string,
      seccion: string,
      nombreAsignatura: string,
      nombreProfesor: string,
      dia: string,
      bloqueInicio: number,
      bloqueTermino: number,
      horaInicio: string,
      horaFin: string,
      ): void
    {
      this.sede = sede;
      this.idAsignatura = idAsignatura;
      this.seccion = seccion;
      this.nombreAsignatura = nombreAsignatura;
      this.nombreProfesor = nombreProfesor;
      this.dia = dia;
      this.bloqueInicio = bloqueInicio;
      this.bloqueTermino = bloqueTermino;
      this.horaInicio = horaInicio;
      this.horaFin = horaFin;
    }
  
    obtenerAsistenciaDesdeQR(datosQR: string) {
      if (this.verificarAsistenciaDesdeQR(datosQR)) {
        return JSON.parse(datosQR) as Asistencia;
      }
      return new Asistencia();
    }
  
    verificarAsistenciaDesdeQR(datosQR: string) {
      if (datosQR !== '') {
        try {
          const json = JSON.parse(datosQR);
          if (json.sede !== undefined
            && json.idAsignatura !== undefined
            && json.seccion !== undefined
            && json.nombreAsignatura !== undefined
            && json.nombreProfesor !== undefined
            && json.dia !== undefined
            && json.bloqueInicio !== undefined
            && json.bloqueTermino !== undefined
            && json.horaInicio !== undefined
            && json.horaFin !== undefined
            ) {
            return true;
          }
        } catch(error: any) {}
      }
      return false;
    }
  
  }
