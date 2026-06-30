import { useState, useEffect } from 'react';

import imagem1 from '../assets/eventhighlightplaceholder.png';
import imagem2 from '../assets/eventhighlightplaceholder2.png';

export default function EventHighlight() {
  const images = [imagem1, imagem2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative inline-block">
      <div className="relative">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Destaque do evento"
            className={`
              rounded-2xl
              transition-opacity duration-700 ease-in-out
              ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
              absolute top-0 left-0
            `}
          />
        ))}
        <img src={images[0]} alt="" className="invisible rounded-2xl" />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-t from-black/70 to-transparent rounded-2xl pointer-events-none">
        <div className="p-8">
          <h2 className="text-white text-7xl font-bold w-[700px]">
            Transformando o futuro por meio da tecnologia
          </h2>
        </div>
      </div>
    </div>
  );
}
