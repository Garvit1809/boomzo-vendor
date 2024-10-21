export const getHeaders = (token: string) => {
  return {
    Authorization: `Bearer ${token}`,
  };
};

export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

export function getTimeInIST(isoDateString: string): string {
  const date = new Date(isoDateString);

  // Convert to IST (Indian Standard Time) and extract only the time
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata", // IST time zone
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // For 12-hour format with AM/PM
  };

  return new Intl.DateTimeFormat("en-IN", options).format(date);
}
