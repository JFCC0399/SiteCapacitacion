import React, { useState,useEffect } from 'react';
import { CSSProperties } from 'react';
import Sidebar from './Sidebar';
import { getUsers } from '../querrys/querrys';


interface CourseJson {
  id: number;
  category: number;
  course_name: string;
  course_description: string; 
  course_category: string; 
  teacher_name: string;
}

const CourseCatalog: React.FC = () => {
 
  const [formatJson, setFormatJson] = useState<CourseJson[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<CourseJson | null>(null);
  const [editCourse, setEditCourse] = useState<CourseJson | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://192.168.36.155:3307/courses");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: CourseJson[] = await response.json();
        setFormatJson(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(e.target.value);
  };

  
  const filteredCourses = formatJson.filter((course) => {
    // Asegúrate de que `fullname` y `description` sean cadenas de texto
    const fullname = course.course_name || '';  // Si no existe, asigna una cadena vacía
    const description = course.course_description || '';  // Si no existe, asigna una cadena vacía
  
    // Asegúrate de que `searchTerm` sea una cadena válida
    const term = searchTerm || '';  // Si searchTerm es undefined, usa una cadena vacía
  
    const matchesSearchTerm = fullname.toLowerCase().includes(term.toLowerCase()) || 
                              description.toLowerCase().includes(term.toLowerCase());
    
    const matchesArea = selectedArea ? course.course_category === selectedArea : true;
    
    return matchesSearchTerm && matchesArea;
  });
  

  const handleOpenDialog = (course: CourseJson) => {
    setSelectedCourse(course);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedCourse(null);
  };

  const handleOpenEditDialog = (course: CourseJson) => {
    setEditCourse(course);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditCourse(null);
  };

  const handleSaveEdit = () => {
    if (editCourse) {
      // Guardar cambios en el curso editado
      setFormatJson((prevCourses) => prevCourses.map((course) =>
        course.id === editCourse.id ? editCourse : course
      ));
    }
    handleCloseEditDialog();
  };

  return (
    <div>     
      <Sidebar />
    <div style={styles.container}>
      <h1 style={styles.heading}>Capacitación Tarahumara</h1>

      {/* Barra de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por título o descripción"
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.input}
        />
        <select value={selectedArea} onChange={handleAreaChange} style={styles.select}>
          <option value="">Todas las áreas</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Finanzas">Finanzas</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
        </select>
      </div>

      {/* Tabla de cursos */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Título</th>
            <th style={styles.th}>Descripción</th>
            <th style={styles.th}>Área</th> 
            <th style={styles.th}>impartido por</th>
            <th style={styles.th}>Acciones</th>
           
          </tr>
        </thead>
        <tbody>
  {filteredCourses.length > 0 ? (
    filteredCourses.map((course, index) => (
      <tr key={course.id ? course.id : `${index}-${course.course_name}`}>
        <td style={styles.td}>{course.course_name}</td>
        <td style={styles.td}>{course.course_description}</td>
        <td style={styles.td}>{course.course_category}</td>
        <td style={styles.td}>{course.teacher_name}</td>
        <td style={styles.td}>
          <button onClick={() => handleOpenDialog(course)} style={styles.button}>
            Ver
          </button>
          <button onClick={() => handleOpenEditDialog(course)} style={styles.button}>
            Editar
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={5} style={styles.noResults}>
        No se encontraron cursos.
      </td>
    </tr>
  )}
</tbody>


      </table>

      {/* Fondo borroso y diálogo para ver la información del curso */}
      {selectedCourse && isDialogOpen && (
        <div>
          <div style={styles.blurBackground}></div>
          <div style={styles.dialog}>
            <h2>Detalles del Curso</h2>
            <p><strong>Título:</strong> {selectedCourse.course_name}</p>
            <p><strong>Descripción:</strong> {selectedCourse.course_description}</p>
            <p><strong>Categoria:</strong> {selectedCourse.course_category}</p>
            <p><strong>Impartido por:</strong>{selectedCourse.teacher_name}</p>
         
            <button onClick={handleCloseDialog} style={styles.closeButton}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Fondo borroso y diálogo para editar la información del curso */}
      {editCourse && isEditDialogOpen && (
        <div>
          <div style={styles.blurBackground}></div>
          <div style={styles.dialog}>
            <h2>Editar Curso</h2>
            <input
              type="text"
              value={editCourse.course_name}
              onChange={(e) => setEditCourse({ ...editCourse, course_name: e.target.value })}
              style={styles.input}
            />
            <textarea
              value={editCourse.course_description}
              onChange={(e) => setEditCourse({ ...editCourse, course_description: e.target.value })}
              style={styles.textarea}
            />
            <select
              value={editCourse.course_category}
              onChange={(e) => setEditCourse({ ...editCourse, course_category: e.target.value })}
              style={styles.select}
            >
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Finanzas">Finanzas</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
            </select>
            <button onClick={handleSaveEdit} style={styles.saveButton}>Guardar Cambios</button>
            <button onClick={handleCloseEditDialog} style={styles.closeButton}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    width: '90%',
    margin: 'auto',
    fontFamily: 'Roboto, sans-serif',
    color: '#333',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  select: {
    width: '25%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
  },
  noResults: {
    textAlign: 'center',
    padding: '20px',
    color: '#888',
  },
  button: {
    margin: '0 5px',
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  dialog: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    zIndex: 1000,
  },
  blurBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)', // Aplicamos el filtro de desenfoque aquí
    zIndex: 999, // Asegura que el fondo borroso esté detrás del diálogo
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default CourseCatalog;
