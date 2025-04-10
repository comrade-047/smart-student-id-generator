import React, { useRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useNavigate } from 'react-router-dom';
import SavedCards from '../components/SavedCards';

const SavedCardsContainer = () => {
  const navigate = useNavigate();
  const savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];
  const cardRefs = useRef({});
  const [activeDownloadIndex, setActiveDownloadIndex] = useState(null);

  const handleBack = () => {
    navigate('/');
  };

  const handleStartDownload = (index) => {
    setActiveDownloadIndex(index);
  };

  const handleDownload = async (card, index) => {
    const cardNode = cardRefs.current[index];

    if (cardNode) {
      setActiveDownloadIndex(null);
      setTimeout(() => {
        htmlToImage.toPng(cardNode).then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `${card.name}_ID.png`;
          link.href = dataUrl;
          link.click();
        });
      }, 100);
    }
  };

  return (
    <SavedCards
      savedCards={savedCards}
      cardRefs={cardRefs}
      activeDownloadIndex={activeDownloadIndex}
      onBack={handleBack}
      onStartDownload={handleStartDownload}
      onDownload={handleDownload}
    />
  );
};

export default SavedCardsContainer;
