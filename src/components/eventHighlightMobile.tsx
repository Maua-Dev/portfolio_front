import { useState, useEffect } from 'react';

import imagem1 from '../assets/eventhighlightplaceholder.png';
import imagem2 from '../assets/eventhighlightplaceholder2.png';

export default function EventHighlightMobile() {
  const images = [imagem1, imagem2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full">
      <div className="relative w-full">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Destaque do evento"
            className={`
              rounded-2xl w-full h-auto object-cover
              transition-opacity duration-700 ease-in-out
              ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
              absolute top-0 left-0
            `}
          />
        ))}
        <img src={images[0]} alt="" className="invisible w-full h-auto rounded-2xl" />
      </div>
      
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-2xl pointer-events-none">
        <div className="p-4 sm:p-8">
          <h2 className="text-white text-3xl sm:text-5xl font-bold w-full leading-tight">
            Transformando o futuro por meio da tecnologia
          </h2>
        </div>
      </div>
    </div>
  );
}