export function formatHour(milliseconds){
    const totalMilliseconds = milliseconds;
    const millisecondsPerHour = 3600000;
    const millisecondsPerMinute = 60000;
    
    const hours = Math.floor(totalMilliseconds / millisecondsPerHour);
    const remainingMilliseconds = totalMilliseconds % millisecondsPerHour;
    const minutes = Math.round(remainingMilliseconds / millisecondsPerMinute);
    
    const formattedTime = `${hours}H${minutes}`;

  return formattedTime
}