/**
 * Hook custom per gestire lo stato della pagina Project Detail
 */

import { useState } from "react";
import { TabValue } from "../types/types";
import { projectCards } from "../services/mockData";

export function useProjectPage() {
  const [activeTab, setActiveTab] = useState<TabValue>(0);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const selectedCard = projectCards.find((c) => c.id === selectedCardId);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
    setActiveTab(newValue);
  };

  const handleCardSelect = (cardId: string) => {
    setSelectedCardId(cardId);
  };

  const handleCardDeselect = () => {
    setSelectedCardId(null);
  };

  return {
    activeTab,
    selectedCardId,
    selectedCard,
    handleTabChange,
    handleCardSelect,
    handleCardDeselect,
  };
}

