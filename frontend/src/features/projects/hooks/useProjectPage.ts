import { useState } from "react";
import { projectCards } from "../services/services";
import { TabValue } from "../types/types";

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

