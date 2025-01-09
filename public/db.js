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

  return new Promise((resolve, reject) => {
    const addRequest = store.add(materia);
    addRequest.onsuccess = () => resolve('Materia agregada');
    addRequest.onerror = () => reject(addRequest.error);
  });
};

export const leerMaterias = async () => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readonly');
  const store = transaction.objectStore('materias');

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
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
      const diaBuscado = dia.toLowerCase();
      const materiasDia = materias.filter((materia) =>
        materia.horarios.some((horario) => horario.dia.toLowerCase() === diaBuscado)
      );

      const materiasOrdenadas = materiasDia.sort((a, b) => {
        const horarioA = a.horarios.find(horario => horario.dia.toLowerCase() === diaBuscado);
        const horarioB = b.horarios.find(horario => horario.dia.toLowerCase() === diaBuscado);
        return horarioA.horaInicio.localeCompare(horarioB.horaInicio); // Orden correcto ascendente
      });

      resolve(materiasOrdenadas);
    };
    request.onerror = () => reject(request.error);
  });
};

export const leerMateriaDiaHora = async (dia, horaStr) => {
  const hora = Number(horaStr.replace(/:/g, ''));  // Convertir hora de entrada una vez
  const db = await openDB();
  const transaction = db.transaction('materias', 'readonly');
  const store = transaction.objectStore('materias');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => {
      const materias = request.result;
      const materiasDiaHora = materias.filter((materia) =>
        materia.horarios.some((horario) => {
          const diaHorario = horario.dia.toLowerCase();
          const diaBuscado = dia.toLowerCase();
          const horaInicio = Number(horario.horaInicio.replace(/:/g, ''));
          const horaFin = Number(horario.horaFin.replace(/:/g, ''));

          return diaHorario === diaBuscado && hora >= horaInicio && hora < horaFin;
        })
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

  try {
    const materia = await new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (materia) {
      Object.assign(materia, nuevaMateria);
      await new Promise((resolve, reject) => {
        const updateRequest = store.put(materia);
        updateRequest.onsuccess = () => resolve('Materia actualizada');
        updateRequest.onerror = () => reject(updateRequest.error);
      });
    } else {
      throw new Error(`No se encontró la materia con id: ${id}`);
    }

    transaction.commit?.(); // Commit para navegadores que lo soporten
    return 'Materia actualizada';
  } catch (error) {
    console.error('Error actualizando materia:', error);
    throw error;
  }
};

export const eliminarMateria = async (id) => {
  const db = await openDB();
  const transaction = db.transaction('materias', 'readwrite');
  const store = transaction.objectStore('materias');

  try {
    await new Promise((resolve, reject) => {
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
    });

    transaction.commit?.();
    return 'Materia eliminada';
  } catch (error) {
    console.error('Error eliminando materia:', error);
    throw error;
  }
};
