import type { CardType } from 'modules/creative-picker/types/card.types';
import { CREATIVE_CARDS } from 'shared/config/cards';
import { create } from 'zustand';

interface SelectedCardsState {
  allCards: CardType[];
  selectedCards: CardType[];
  currentCard: CardType | null;
  toggleCard: (card: CardType) => void;
  setCurrentCard: (card: CardType) => void;
  clear: () => void;
  selectAll: (cards: CardType[]) => void;
  updateCard: (card: CardType) => void;
  updateAllCards: (card: CardType) => void;
}

export const useSelectedCardsStore = create<SelectedCardsState>((set) => ({
  allCards: CREATIVE_CARDS,
  selectedCards: [],
  currentCard: null,
  toggleCard: (card) =>
    set((state) => ({
      selectedCards: state.selectedCards.includes(card)
        ? state.selectedCards.filter((c) => c !== card)
        : [...state.selectedCards, card],
    })),
  clear: () => set({ selectedCards: [] }),
  selectAll: (cards) => set({ selectedCards: cards }),
  setCurrentCard: (card) => set(() => ({ currentCard: card })),
  updateCard: (updatedCard) =>
    set((state) => ({
      selectedCards: state.selectedCards.map((c) =>
        c.id === updatedCard.id ? updatedCard : c,
      ),
    })),
  updateAllCards: (updatedCard) =>
    set((state) => ({
      allCards: state.allCards.map((c) => (c.id === updatedCard.id ? updatedCard : c)),
    })),
}));
