import styles from './CreativeCard.module.scss';

import clsx from 'clsx';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';
import type { CardType } from 'modules/creative-picker/types/card.types';
import Input from 'shared/ui/Input/Input';

interface CreariveCardProps {
  card: CardType;
  size: 'small' | 'normal' | 'big';
  withCheckbox?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CreativeCard({
  card,
  withCheckbox,
  isActive,
  className,
  onClick,
  isDisabled,
  size = 'normal',
}: CreariveCardProps) {
  const selectedCards = useSelectedCardsStore((state) => state.selectedCards);
  const toggleCard = useSelectedCardsStore((state) => state.toggleCard);

  const isChecked = selectedCards.some((c) => c.id === card.id);

  const handleCardClick = () => {
    if (withCheckbox) {
      toggleCard(card);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={clsx([
        styles.root,
        size === 'small' && styles.small_card,
        size === 'big' && styles.big_card,
        isActive && styles.active,
        className,
        isDisabled && styles.disabled,
      ])}
      style={{ backgroundImage: `url(${card.imageSrc})` }}
    >
      {withCheckbox && (
        <Input
          type="checkbox"
          divClassName={styles.select_area}
          checked={isChecked}
          onChange={(e) => {
            e.stopPropagation();
            toggleCard(card);
          }}
        />
      )}
    </div>
  );
}
