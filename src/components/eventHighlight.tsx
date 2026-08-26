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
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="Destaque do evento"
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-700 ease-in-out
            ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ))}
      <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-white text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold max-w-full lg:max-w-[700px]">
            Transformando o futuro por meio da tecnologia
          </h2>
        </div>
      </div>
    </div>
  );
}