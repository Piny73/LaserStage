import { User } from "./user.model";

export class Activity {
    id!: number;
    description!: string;
    dtstart!: string | null;
    dtend!: string | null;
    ownerid!: number;
    enable!: boolean;
    owner!: User | null;

    constructor(init?: Partial<Activity>) {
        Object.assign(this, init);
    }

    // Metodo per ottenere una descrizione breve dell'attività
    getShortDescription(): string {
        return this.description.length > 20
            ? `${this.description.substring(0, 20)}...`
            : this.description;
    }

    // Metodo per verificare se l'attività è attualmente in corso
    isOngoing(): boolean {
        const now = new Date(); // Ottieni la data attuale
        // Controlla se dtstart e dtend sono validi e restituisci un booleano
        if (this.dtstart && this.dtend) {
            const start = new Date(this.dtstart);
            const end = new Date(this.dtend);
            return now > start && now < end; // Restituisce true se l'attività è in corso
        }
        return false; // Se dtstart o dtend non sono validi, restituisci false
    }
}