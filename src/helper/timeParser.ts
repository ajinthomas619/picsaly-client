export const timeParser = (timestamp: Date | undefined): string | undefined => {
    if (!timestamp) {
      return undefined; 
    }
  
    const date = new Date(timestamp);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const amPM = hours >= 12 ? 'PM' : 'AM';
  
    hours = hours % 12 || 12;
  
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    return `${hours}:${formattedMinutes} ${amPM}`;
  };