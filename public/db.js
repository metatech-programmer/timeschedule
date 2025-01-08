export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('baseMaterias', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('materias')) {
        db.createObjectStore('materias', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error al abrir la base de datos', event);
    };
  });
};

export const agregarMateria = async (materia) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readwrite');
  const store = transaction.objectStore('materias');
  store.add(materia);
  return new Promise((resolve) => {
    transaction.oncomplete = () => resolve('Materia agregada');
  });
};

export const leerMaterias = async () => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readonly');
  const store = transaction.objectStore('materias');
  return new Promise((resolve) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
  });
};

export const leerMateriaHorarioDia = async (dia) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readonly');
  const store = transaction.objectStore('materias');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const materias = request.result;
      const materiasDia = materias.filter((materia) =>
        materia.horarios.some((horario) => horario.dia.toLowerCase() === dia.toLowerCase())
      );
      const materiasOrdenadas = materiasDia.sort((b, a) => {
        const horarioA = a.horarios.find(horario => horario.dia.toLowerCase() === dia.toLowerCase());
        const horarioB = b.horarios.find(horario => horario.dia.toLowerCase() === dia.toLowerCase());
        return horarioB.horaInicio.localeCompare(horarioA.horaInicio);
      });

      resolve(materiasOrdenadas);
    };
    request.onerror = () => reject(request.error);
  });
};

export const leerMateriaDiaHora = async (dia, hora) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readonly');
  const store = transaction.objectStore('materias');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const materias = request.result;
      const materiasDiaHora = materias.filter((materia) =>
        materia.horarios.some((horario) =>      
          horario.dia.toLowerCase() === dia.toLowerCase() &&
           hora >= horario.horaInicio && hora <= horario.horaFin
        )
      );
      resolve(materiasDiaHora);
    };
    request.onerror = () => reject(request.error);
  });
};

export const actualizarMateria = async (id, nuevaMateria) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readwrite');
  const store = transaction.objectStore('materias');
  const request = store.get(id);
  return new Promise((resolve) => {
    request.onsuccess = () => {
      const materia = request.result;
      Object.assign(materia, nuevaMateria); // Actualiza los campos
      store.put(materia);
      transaction.oncomplete = () => resolve('Materia actualizada');
    };
  });
};

export const eliminarMateria = async (id) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readwrite');
  const store = transaction.objectStore('materias');
  store.delete(id);
  return new Promise((resolve) => {
    transaction.oncomplete = () => resolve('Materia eliminada');
  });
};


