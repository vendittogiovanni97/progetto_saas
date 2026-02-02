/**
 * Grid delle statistiche
 */

import { Box } from "@mui/material";
import { Stat } from "../types/index";
import { StatCardGeneric } from "@/common/components/card/StatCardGeneric";

interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        gap: 2,
      }}
    >
      {stats.map((stat) => (
        <StatCardGeneric
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          color={stat.color}
          description={stat.description}
        />
      ))}
    </Box>
  );
}

