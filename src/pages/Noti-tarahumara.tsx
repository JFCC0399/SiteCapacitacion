import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Sidebar from './Sidebar';

const NotiTarahumara: React.FC = () => {
  const styles = {
    pageContainer: {
      position: 'relative' as 'relative',
      width: '100%',
      height: '100vh',
      overflowX: 'hidden' as 'hidden',
      display: 'flex', // Asegura un diseño de flexbox
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      marginLeft: '60px', // Espacio para el Sidebar (ajustar según el ancho del Sidebar)
    },
    backgroundImage: {
      position: 'fixed' as 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url("https://s1.1zoom.me/b6650/683/Apples_Wood_planks_Foliage_521904_1920x1080.jpg")',
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed' as 'fixed',
      zIndex: -1,
      opacity: 1,
    },
    cardContainer: {
      width: '80%',
      maxWidth: '1200px',
      margin: '0px',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Fondo de la tarjeta transparente
      color: '#fff',
      borderRadius: '10px',
      padding: '20px',
    },
    carouselContainer: {
      marginBottom: '20px',
    },
    textContainer: {
      fontSize: '1.2rem',
    },
    title: {
      fontSize: '3rem',
      color: 'white',
      fontWeight: 'bold' as 'bold',
      marginBottom: '20px',
    },
  };

  return (

    <div>
      <Sidebar /> 
      <div style={styles.pageContainer}>
        
        <div style={styles.backgroundImage}></div>
        

        {/* Tarjeta con carrusel y texto */}
        <Card style={styles.cardContainer}>
          <Card.Body>
            {/* Título */}
            <Card.Title style={styles.title}>Noti-Tarahumara</Card.Title>

            {/* Carrusel de imágenes */}
            <div style={styles.carouselContainer}>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Foto+1"
                    alt="Primera foto"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Foto+2"
                    alt="Segunda foto"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://via.placeholder.com/800x400?text=Foto+3"
                    alt="Tercera foto"
                  />
                </Carousel.Item>
              </Carousel>
            </div>

            {/* Texto descriptivo */}
            <div style={styles.textContainer}>
              <h2>Capacitación en Carozos</h2>
              <p>
                El pasado julio contamos con la presencia de "Carozos California" donde se ofrecieron
                capacitaciones sobre durazno amarillo y blanco, se dio a conocer el manejo, exhibición y formas de
                consumirlos. Así mismo se contó con la participación de colaboradores Tarahumara de diferentes departamentos.
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
      </div>
  );
};

export default NotiTarahumara;
