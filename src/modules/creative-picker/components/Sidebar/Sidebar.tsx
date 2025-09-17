import styles from './Sidebar.module.scss';

import { useNavigate } from 'react-router-dom';

import { Image, Pencil, SquareDashedMousePointer } from 'lucide-react';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';
import { CREATIVE_CARDS } from 'shared/config/cards';
import Button from 'shared/ui/Button/Button';

export default function Sidebar() {
  const selectedCards = useSelectedCardsStore((state) => state.selectedCards);
  const selectAll = useSelectedCardsStore((state) => state.selectAll);
  const setCurrentCard = useSelectedCardsStore((state) => state.setCurrentCard);

  const navigate = useNavigate();

  const handleEditorLink = () => {
    if (selectedCards.length > 0) {
      setCurrentCard(selectedCards[0]);
      navigate('/editor');
    }
  };

  return (
    <aside className={styles.root}>
      <div className={styles.info}>
        <div className={styles.row_item}>
          <div>
            <Image size={16} />
            <p>quick_ad</p>
          </div>
          <span>141 Results</span>
        </div>
        <div className={styles.row_item}>
          <div>
            <SquareDashedMousePointer
              size={16}
              onClick={() => selectAll(CREATIVE_CARDS)}
            />
            <p>Select All</p>
          </div>
          <span>{selectedCards.length} Selected</span>
        </div>
        <p>Image Result Edits</p>
        <Button isDisabled={selectedCards.length === 0} onClick={handleEditorLink}>
          <Pencil size={16} /> Edit with AI
        </Button>
      </div>
    </aside>
  );
}
