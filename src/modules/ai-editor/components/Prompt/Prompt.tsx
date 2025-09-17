import styles from './Prompt.module.scss';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Image1 from 'assets/10f89679-0bd2-40d8-8df7-4dee6e89b3a1.jpg';
import { CheckCircle2, ChevronLeft, Star } from 'lucide-react';
import { useTrackGenerationStore } from 'modules/ai-editor/hooks/useTrackGenerationStore';
import {
  type SimulationResponse,
  simulateImageGeneration,
} from 'modules/ai-editor/utils/simulateImageGeneration';
import {
  type SaveResponse,
  simulateImageSave,
} from 'modules/ai-editor/utils/simulateImageSave';
import { urlToBase64 } from 'modules/ai-editor/utils/urlToBase64';
import { useSelectedCardsStore } from 'modules/creative-picker/hooks/useSelectedCardsStore';
import type { CardType } from 'modules/creative-picker/types/card.types';
import { DEFAULT_PROMTS } from 'shared/config/promts';
import Button from 'shared/ui/Button/Button';
import TextArea from 'shared/ui/Input/Textarea';
import LoaderSpinner from 'shared/ui/LoaderComponent/LoaderSpinner';
import { toast } from 'sonner';

import PromptLabel from './PromptLabel/PromptLabel';

interface PromptProps {
  currentCard: CardType;
}

export default function Prompt({ currentCard }: PromptProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);

  const setCurrentCard = useSelectedCardsStore((state) => state.setCurrentCard);
  const updateCard = useSelectedCardsStore((state) => state.updateCard);
  const updateAllCards = useSelectedCardsStore((state) => state.updateAllCards);

  const setIsGeneration = useTrackGenerationStore((state) => state.setIsGeneration);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleLabelClick = (prompt: (typeof DEFAULT_PROMTS)[0]) => {
    if (selectedPrompt === prompt.heading) {
      setSelectedPrompt(null);
      setTextareaValue('');
    } else {
      setSelectedPrompt(prompt.heading);
      setTextareaValue(prompt.text);
    }
  };

  const handleGenerateImage = async () => {
    try {
      setLoading(true);
      setIsGeneration(true);

      const base64Image: string | null = Image1
        ? (await urlToBase64(Image1)).split(',')[1]
        : null;

      const result: SimulationResponse = await simulateImageGeneration(
        textareaValue,
        base64Image,
      );

      if (result.success && result.outputs?.[0]?.data) {
        const updatedCard: CardType = {
          ...currentCard,
          imageSrc: `data:image/png;base64,${result.outputs[0].data}`,
        };
        setCurrentCard(updatedCard);
        updateCard(updatedCard);
        setHasUnsavedChanges(true);
      }
    } catch (error: unknown) {
      console.error('Simulation error:', error);
      console.log(
        'Error in simulation: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
      setIsGeneration(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveImage = async () => {
    try {
      setLoadingSave(true);

      const result: SaveResponse = await simulateImageSave();

      if (result.success && currentCard) {
        toast.success('Image saved successfully!');

        updateAllCards(currentCard);
        setHasUnsavedChanges(false);
        setIsGeneration(false);
        setTextareaValue('');
        setSelectedPrompt(null);
      }
    } catch (error: unknown) {
      toast.error('Save simulation error!');
      console.log(
        'Error saving image: ' +
          (error instanceof Error ? error.message : 'Unknown error'),
      );
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <article className={styles.root}>
      <h3>Change with prompt</h3>
      <div className={styles.labels_row}>
        {DEFAULT_PROMTS.map((item) => (
          <PromptLabel
            key={item.heading}
            isActive={selectedPrompt === item.heading}
            onClick={() => handleLabelClick(item)}
          >
            {item.heading}
          </PromptLabel>
        ))}
      </div>
      <TextArea
        className={styles.textarea}
        placeholder="Enter prompt to start using AI..."
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
        disabled={loading}
      />
      <div className={styles.buttons}>
        {hasUnsavedChanges ? (
          <>
            <Button onClick={handleSaveImage} isDisabled={loadingSave}>
              {loadingSave ? (
                <LoaderSpinner />
              ) : (
                <>
                  <CheckCircle2 size={18} /> Save Changes
                </>
              )}
            </Button>
            <Button
              isActive
              onClick={handleGenerateImage}
              isDisabled={!textareaValue.trim() || loading}
            >
              {loading ? (
                <LoaderSpinner />
              ) : (
                <>
                  <Star size={18} /> Regenerate
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleBackClick}>
              <ChevronLeft size={18} /> Back To All
            </Button>
            <Button
              isActive
              onClick={handleGenerateImage}
              isDisabled={!textareaValue.trim() || loading}
            >
              {loading ? (
                <LoaderSpinner />
              ) : (
                <>
                  <Star size={18} /> Generate
                </>
              )}
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
