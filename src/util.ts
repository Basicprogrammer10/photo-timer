// Formats a duration in 3d 5h 2m 1s format
export function formatTime(sec: number): string {
  const FORMATS: [number, string][] = [
    [60, "s"],
    [60, "m"],
    [24, "h"],
    [365, "d"],
  ];

  let parts = [];
  for (let format of FORMATS) {
    if (sec === 0) break;
    parts.push(`${sec % format[0]}${format[1]}`);
    sec = Math.floor(sec / format[0]);
  }

  return parts.reverse().join(" ");
}

// In the form `3d 5h 2m 1s`
export function parseTime(time: string) {
  const FORMATS: [string, number][] = [
    ["d", 24 * 60 * 60],
    ["h", 60 * 60],
    ["m", 60],
    ["s", 1],
  ];

  let sec = 0;
  let parts = time.split(" ");
  for (let part of parts) {
    for (let format of FORMATS) {
      if (!part.endsWith(format[0])) continue;
      sec += parseFloat(part.slice(0, -1)) * format[1];
      break;
    }
  }

  return sec;
}
