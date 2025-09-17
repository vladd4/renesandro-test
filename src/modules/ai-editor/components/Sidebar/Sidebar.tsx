import styles from './Sidebar.module.scss';

import { useNavigate } from 'react-router-dom';

import { useTrackGenerationStore } from 'modules/ai-editor/hooks/useTrackGenerationStore';
import CreativeCard from 'modules/creative-picker/components/CreativeCard/CreativeCard';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';
import type { CardType } from 'modules/creative-picker/types/card.types';
import Button from 'shared/ui/Button/Button';

export default function Sidebar() {
  const selectedCards = useSelectedCardsStore((state) => state.selectedCards);
  const currentCard = useSelectedCardsStore((state) => state.currentCard);
  const setCurrentCard = useSelectedCardsStore((state) => state.setCurrentCard);

  const isGeneration = useTrackGenerationStore((state) => state.isGeneration);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleCardClick = (card: CardType) => {
    setCurrentCard(card);
  };

  return (
    <aside className={styles.root}>
      <div className={styles.content}>
        <Button onClick={handleBackClick}>Go Back</Button>
        {selectedCards.map((card) => {
          return (
            <CreativeCard
              key={card.id}
              card={card}
              size="small"
              isActive={currentCard?.id === card.id}
              isDisabled={isGeneration && currentCard?.id !== card.id}
              className={styles.card}
              onClick={() => handleCardClick(card)}
            />
          );
        })}
      </div>
      <Button onClick={handleBackClick} className={styles.mobile_btn}>
        Go Back
      </Button>
    </aside>
  );
}
