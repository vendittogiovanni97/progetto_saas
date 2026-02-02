/**
 * Componente Card singola per il progetto
 */

import { CardGeneric } from "../../../../components/card/CardGeneric";
import { ProjectCard as ProjectCardType } from "../../types/types";

interface ProjectCardProps {
  card: ProjectCardType;
  onClick: () => void;
}

export function ProjectCard({ card, onClick }: ProjectCardProps) {
  return (
    <CardGeneric
      title={card.title}
      subtitle={card.status}
      mediaImage={card.img}
      onClick={onClick}
      isActive={card.isActive}
      isError={card.isError}
    >
      {/* Optional: we could add more specific project info here if needed */}
      {/* For now children are empty as generic handles basic info */}
    </CardGeneric>
  );
}

