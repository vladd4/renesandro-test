import styles from './HomePage.module.scss';

import { useEffect } from 'react';

import { useTrackGenerationStore } from 'modules/ai-editor/hooks/useTrackGenerationStore';
import CreativeCard from 'modules/creative-picker/components/CreativeCard/CreativeCard';
import CreativeCardUploader from 'modules/creative-picker/components/CreativeCardUploader/CreativeCardUploader';
import Sidebar from 'modules/creative-picker/components/Sidebar/Sidebar';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';

export default function HomePage() {
  const allCards = useSelectedCardsStore((state) => state.allCards);
  const clear = useSelectedCardsStore((state) => state.clear);

  const setIsGeneration = useTrackGenerationStore((state) => state.setIsGeneration);

  useEffect(() => {
    clear();
    setIsGeneration(false);
  }, [clear, setIsGeneration]);

  return (
    <section className={styles.root}>
      <h1>Results: quick_ad</h1>
      <article className={styles.wrapper}>
        <div className={styles.cards_block}>
          <CreativeCardUploader />
          {allCards.map((card) => {
            return <CreativeCard key={card.id} card={card} size="normal" withCheckbox />;
          })}
        </div>
        <Sidebar />
      </article>
    </section>
  );
}
