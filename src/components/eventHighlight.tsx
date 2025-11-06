import { useState, useEffect } from 'react';

import imagem1 from '../assets/eventhighlightplaceholder.png';
import imagem2 from '../assets/eventhighlightplaceholder2.png';

export default function EventHighlight() {
  const images = [imagem1, imagem2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative inline-block">
      <img
        src={images[currentImageIndex]}
        alt="Destaque do evento"
        className="transition-opacity duration-1000 ease-in-out" 
      />
      <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-t from-black/70 to-transparent rounded-2xl">
        <div className="p-8">
          <h2 className="text-white text-7xl font-bold w-[700px]">Transformando o futuro por meio da tecnologia</h2>
        </div>
      </div>
    </div>
  );
}