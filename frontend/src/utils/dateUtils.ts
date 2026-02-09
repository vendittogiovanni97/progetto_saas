/**
 * Utility per la gestione e formattazione delle date
 */

export const formatDate = (date: Date | string) => {
  if (!date) return "-";
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Verifica se la data è valida
  if (isNaN(d.getTime())) return "-";

  return d.toLocaleDateString('it-IT', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
