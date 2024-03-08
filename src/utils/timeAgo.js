export const timeAgo = (timestamp) => {
  const now = Date.now();
  const date = new Date(timestamp);
  const diff = now - date;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    const year = date.getFullYear();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = String(date.getDate());
    return `${day} ${month} ${year}`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `${seconds} seconds ago`;
  }
};
