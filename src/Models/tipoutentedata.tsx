export class TipoUtenteData {
    private id: number;
    private tipo: string;
    private descrizione: string;
    
    constructor(Id: number, Tipo: string, Descrizione: string) {
        this.id = Id;
        this.tipo = Tipo;
        this.descrizione = Descrizione;
    }
}