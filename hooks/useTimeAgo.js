import { useEffect, useState } from "react";

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsep = (timestamp - now) / 1000;

  for (const [unit, secondInUnit] of DATE_UNITS) {
    if (Math.abs(elapsep) > secondInUnit || unit === "second") {
      const value = Math.round(elapsep / secondInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp);
      setTimeAgo(newTimeAgo);
    }, 5000);

    return () => clearInterval(interval);
  }, [timestamp]);

  const rft = new Intl.RelativeTimeFormat("en", { style: "short" });
  // ? cuando se manda un value (+) crea el formato a futuro, si es (-) lo hace a pasado
  const { value, unit } = timeAgo;
  return rft.format(value, unit);
}
