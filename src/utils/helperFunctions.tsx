export const getUrgencyColor = (value: number): string => {
    if (value >= 0.7) return 'red';    // HIGH (urgent)
    if (value >= 0.4) return 'yellow'; // MID (important)
    return 'green';                   // LOW (not urgent)
  };