'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GalleryViewer({ images, label }: { images: readonly string[]; label: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage = selectedIndex === null ? null : images[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
      if (event.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % images.length);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [images.length, selectedIndex]);

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <button className="gallery-thumb" key={image} onClick={() => setSelectedIndex(index)} aria-label={`View ${label} image ${index + 1}`}>
            <Image src={image} alt={`${label} project ${index + 1}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1000px) 33vw, 25vw" />
          </button>
        ))}
      </div>
      {selectedImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${label} image viewer`} onClick={() => setSelectedIndex(null)}>
          <button className="lightbox-close icon-button" onClick={() => setSelectedIndex(null)} aria-label="Close image viewer"><X /></button>
          <button className="lightbox-arrow previous icon-button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex! - 1 + images.length) % images.length); }} aria-label="View previous image"><ChevronLeft /></button>
          <div className="lightbox-image" onClick={(event) => event.stopPropagation()}><Image src={selectedImage} alt={`${label} project ${selectedIndex! + 1}`} fill sizes="90vw" /></div>
          <button className="lightbox-arrow next icon-button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex! + 1) % images.length); }} aria-label="View next image"><ChevronRight /></button>
        </div>
      )}
    </>
  );
}
