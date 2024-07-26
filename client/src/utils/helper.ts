export function getDayOfWeek(dateString: string): string {
    const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date: Date = new Date(dateString);
    return daysOfWeek[date.getDay()];
}