import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function wait(duration: number = 1000) {
    return new Promise((resolve) => setTimeout(resolve, duration));
}

export function csvToJson(headers: any,rows: Array<any>) {
    return rows.map((row: any) => {
        return headers.reduce((obj: any, header: any, index: number) => {
            obj[header.trim()] = row[index].trim();
            return obj;
        }, {});
    });
}