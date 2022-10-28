import { formatDuration } from "date-fns";
import { parse } from "tinyduration";

const DEFAULT_DURATION = { hours: 0, minutes: 0 };

export const _formatDuration = (duration: Duration) => {
  return formatDuration(duration, {
    format: ["hours", "minutes"],
    zero: true,
    delimiter: ":",
    locale: {
      formatDistance: (_token, count) => String(count).padStart(2, "0"),
    },
  });
};

export const getDuration = (source?: string) => {
  const duration = source ? { ...DEFAULT_DURATION, ...parse(source) } : DEFAULT_DURATION;
  return _formatDuration(duration);
};

export const getSummarizedDuration = (source: Duration[]): Duration => {
  const minutes = source.reduce((acc, it) => {
    const days = it.days || 0;
    const hours = it.hours || 0;
    const minutes = it.minutes || 0;
    return acc + days * 8 * 60 + hours * 60 + minutes;
  }, 0);

  return { hours: Math.floor(minutes / 60), minutes: minutes % 60 };
};
