export function isoDateToDayMonthYear(isoDateString: string) {
  const date = new Date(isoDateString);

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

export function millisecondsToHoursMinutes(milliseconds: number): string {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes}`;
}

export function extractTitleFromTrack(track: string) {
  // When appears a  symbol '|' or '/' we returns the title. Ex:
  // "trackName": "Episode 709 | \"Ish Type Beat\"",
  return track.split(/[|\/]/)[1] || track;
}
