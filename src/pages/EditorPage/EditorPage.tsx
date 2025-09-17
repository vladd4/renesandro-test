import styles from './EditorPage.module.scss';

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Prompt from 'modules/ai-editor/components/Prompt/Prompt';
import Sidebar from 'modules/ai-editor/components/Sidebar/Sidebar';
import CreativeCard from 'modules/creative-picker/components/CreativeCard/CreativeCard';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';

export default function EditorPage() {
  const currentCard = useSelectedCardsStore((state) => state.currentCard);

  const navigate = useNavigate();

  useEffect(() => {
    if (!currentCard) {
      navigate('/');
    }
  }, [navigate, currentCard]);

  return (
    <section className={styles.root}>
      <Sidebar />
      {currentCard && (
        <div className={styles.main}>
          <CreativeCard size="big" card={currentCard} className={styles.main_image} />
          <Prompt currentCard={currentCard} />
        </div>
      )}
    </section>
  );
}
