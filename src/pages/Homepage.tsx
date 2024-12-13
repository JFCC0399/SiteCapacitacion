// HomePage.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Asegúrate de que la ruta sea correcta

const HomePage: React.FC = () => {
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: '70px', marginRight: '10px', padding: '20px' }}><header className="py-3 text-black bg-white">
          <Container>
            <Row className="align-items-center">
              <Col xs={3}>
                <img
                  src="https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/6088316/314367_858588.png"
                  alt="Grupo Tarahumara"
                  style={{
                    maxHeight: '80px',
                    backgroundColor: 'white',
                    padding: '5px',
                    borderRadius: '5px'
                  }}
                />
              </Col>
              <Col xs={6} className="text-right">
                <h1>Capacitación Tarahumara</h1>
              </Col>
            </Row>
          </Container>
        </header>
        <section
          style={{
            backgroundColor: '#9A3324',
            color: 'white',
            padding: '20px',
            borderRadius: '30px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
            textAlign: 'center',
          }}
        >
          <Container>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>
              ¡Bienvenidos a Capacitación Tarahumara!
            </h1>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '15px', lineHeight: '1.6' }}>
              Descubre herramientas, presentaciones, guías y contenido multimedia diseñados
              para potenciar tu desarrollo profesional en tu área laboral.
            </h4>
            <h4 style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
              ¡Aquí tienes todo lo necesario para crecer y avanzar!
            </h4>
          </Container>
        </section>


        <section className="py-5">
  <Container>
    <h3 className="mb-4 text-center" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9A3324' }}>
      Herramientas y plataformas
    </h3>
    <Row className="overflow-auto d-flex flex-nowrap">
      {[
        {
          title: 'Moodle',
          image: '/images/logomoodle.jpg',
          alt: 'Herramienta 1',
          text: 'Da clic en ver más y entérate de qué es Crehana y para qué sirve esta plataforma E-learning.',
          link: 'http://192.168.32.6/moodle/',
        },
        {
          title: 'Crehana',
          image: '/images/crehana.png',
          alt: 'Herramienta 2',
          text: 'Da clic en ver más y entérate de qué es Crehana y para qué sirve esta plataforma E-learning.',
          link: 'https://www.crehana.com/blog/comunidad-crehana/que-significa-crehana/',
        },
        {
          title: 'Plan de Capacitación',
          image: '/images/Plan.webp',
          alt: 'Herramienta 3',
          text: 'Da clic en ver más y conoce el plan de capacitación anual 2024.',
          link: '',
        },
        {
          title: 'Asistencia',
          image: '/images/asistencia.png',
          alt: 'Asistencia',
          text: 'Da clic en ver más y descarga la lista de asistencia.',
          link: '',
        },
        {
          title: 'Formato de solicitud',
          image: '/images/solicitud.jpg',
          alt: 'Solicitud',
          text: 'Descarga el formato de solicitud de cursos.',
          link: 'https://www.ejemplo.com/solicitud',
        },
        {
          title: 'Formato de registro',
          image: '/images/registro.jpg',
          alt: 'Registro',
          text: 'Registra tu asistencia al curso que hayas tomado.',
          link: 'https://forms.office.com/Pages/ResponsePage.aspx?id=LDytcFJyrUi7M1L4QTUoz_rKDb0ihM5Lsj7Mgq1j1XVUNE4yMVlZSVFHNjZWTVZPREVZUDVWQkVYQS4u',
        },
      ].map((item, idx) => (
        <Col key={idx} md={3} className="mb-4">
          <div className="custom-card h-100">
            <div className="image-wrapper">
              <img src={item.image} alt={item.alt} className="img-fluid" />
            </div>
            <div className="content">
              <h5 className="card-title">{item.title}</h5>
              <p>{item.text}</p>
              <Button
                style={{
                  backgroundColor: '#9A3324',
                  borderColor: '#9A3324',
                  borderRadius: '25px',
                  fontWeight: 'bold',
                }}
                className="text-white w-100"
                onClick={() => item.link && window.open(item.link, '_blank')}
              >
                Ver más
              </Button>
            </div>
          </div>
        </Col>
      ))}
    </Row>

    <style>{`
      .custom-card {
        background-color: white;
        border-radius: 15px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .custom-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
      }

      .image-wrapper {
        position: relative;
        overflow: hidden;
        height: 200px;
      }

      .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .custom-card:hover .image-wrapper img {
        transform: scale(1.1);
      }

      .content {
        padding: 20px;
        text-align: center;
      }

      .card-title {
        font-size: 1.25rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #333;
      }

      p {
        font-size: 0.95rem;
        color: #6c757d;
      }
    `}</style>
  </Container>
</section>


        <section className="text-center">
          <Container className="rounded-container">
            <a href="/notitarahumara" style={{ textDecoration: 'none' }}>
            <img
              src="/images/noti.png" // Ruta de la imagen
              alt="Noti-Tarahumara"
              className="my-4 img-fluid rounded-img"
            />
            <p>
              Da clic en la imagen y entérate de noticias, eventos e información
              acontecida en <strong>Tarahumara</strong>
            </p>
            </a>
          </Container>
        
        </section>
        <section className="py-5">
        <Container>
          <h3 className="mb-4 text-center">Contenido de capacitación</h3>
          <Row className="d-flex justify-content-center">
            {[
              {
                title: 'Almacén',
                image: '/images/almacen.png',
                alt: 'Almacén',
                text: 'Encuentra contenidos de cursos de capacitación referentes al departamento de almacén.',
              },
              {
                title: 'Producto',
                image: '/images/Producto.png',
                alt: 'Producto',
                text: 'Información sobre la importancia del producto que comercializa Tarahumara.',
              },
              {
                title: 'Comercial',
                image: '/images/comercial.png',
                alt: 'Comercial',
                text: 'Información necesaria para obtener conocimiento sobre los temas comerciales.',
              },
            ].map((item, idx) => (
              <Col key={idx} md={4} className="mb-4">
                <div className="custom-card h-100">
                  <div className="image-wrapper">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="img-fluid"
                    />
                  </div>
                  <div className="content">
                    <h5 className="card-title">{item.title}</h5>
                    <p>{item.text}</p>
                    <Button
                      className="text-white w-100"
                      style={{ backgroundColor: '#9A3324', borderColor: '#9A3324' }}
                    >
                      Ver más
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Cambia de <style jsx> a <style> */}
          <style>{`
            .custom-card {
              background-color: white;
              border-radius: 15px;
              box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
              overflow: hidden;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .custom-card:hover {
              transform: translateY(-10px);
              box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
            }

            .image-wrapper {
              position: relative;
              overflow: hidden;
              height: 200px;
            }

            .image-wrapper img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s ease;
            }

            .custom-card:hover .image-wrapper img {
              transform: scale(1.1);
            }

            .content {
              padding: 20px;
              text-align: center;
            }

            .card-title {
              font-size: 1.25rem;
              margin-bottom: 1rem;
            }

            p {
              font-size: 0.95rem;
              color: #6c757d;
            }
            
            .rounded-container {
              border-radius: 15px; /* Ajusta el valor según el grado de redondeo que prefieras */
              overflow: hidden; /* Asegura que el contenido no se desborde de los bordes redondeados */
              display: block; /* Hace que el contenedor se comporte como un bloque para que el enlace abarque todo el área */
            }

            .rounded-img {
              border-radius: 15px; /* Ajusta el valor para que coincida con el redondeo del contenedor */
            }

          `}</style>
        </Container>

        </section>
      </div>
    </div>
  );
}

export default HomePage;
