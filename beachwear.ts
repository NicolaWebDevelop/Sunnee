// Sistema dimostrativo: ogni prodotto rappresenta un singolo capo.

export type TipoProdotto = "bikini" | "costume intero" | "shorts";
export type Taglia = "XS" | "S" | "M" | "L" | "XL";
export type MetodoPagamento = "carta" | "paypal" | "bonifico";

export interface IProdotto {
  readonly id: string;
  readonly tipo: TipoProdotto;
  readonly taglia: Taglia;
  readonly colore: string;
  readonly prezzo: number;
  readonly percentualePlasticaRiciclata: number;
  readonly cliente: ICliente | null;
  readonly processoProduzione: IProcessoProduzione | null;
  assegnaCliente(cliente: ICliente): void;
  assegnaProcesso(processo: IProcessoProduzione): void;
}

export interface ICliente {
  readonly nome: string;
  readonly cognome: string;
  readonly email: string;
  readonly metodoPagamento: MetodoPagamento;
  ordinaProdotto(prodotto: IProdotto): void;
}

export interface IProcessoProduzione {
  readonly nome: string;
  readonly descrizione: string;
  readonly origineMateriale: string;
  readonly prodotti: readonly IProdotto[];
  aggiungiProdotto(prodotto: IProdotto): void;
}

function verificaTesto(valore: string, campo: string): string {
  const testo = valore.trim();
  if (!testo) throw new Error(`${campo} non può essere vuoto.`);
  return testo;
}

export class Prodotto implements IProdotto {
  readonly id: string;
  readonly colore: string;
  private clienteAssegnato: ICliente | null = null;
  private processoAssegnato: IProcessoProduzione | null = null;

  constructor(
    id: string,
    readonly tipo: TipoProdotto,
    readonly taglia: Taglia,
    colore: string,
    readonly prezzo: number,
    readonly percentualePlasticaRiciclata: number,
  ) {
    this.id = verificaTesto(id, "ID prodotto");
    this.colore = verificaTesto(colore, "Colore");
    if (!Number.isFinite(prezzo) || prezzo <= 0) {
      throw new Error("Il prezzo deve essere un numero positivo.");
    }
    if (!Number.isFinite(percentualePlasticaRiciclata)
      || percentualePlasticaRiciclata <= 0
      || percentualePlasticaRiciclata > 100) {
      throw new Error("La percentuale riciclata deve essere maggiore di 0 e fino a 100.");
    }
  }

  get cliente(): ICliente | null {
    return this.clienteAssegnato;
  }

  get processoProduzione(): IProcessoProduzione | null {
    return this.processoAssegnato;
  }

  assegnaCliente(cliente: ICliente): void {
    if (this.clienteAssegnato !== null) {
      throw new Error(`Il prodotto ${this.id} è già stato ordinato.`);
    }
    if (this.processoAssegnato === null) {
      throw new Error(`Il prodotto ${this.id} non ha un processo di produzione associato.`);
    }
    this.clienteAssegnato = cliente;
  }

  assegnaProcesso(processo: IProcessoProduzione): void {
    if (this.processoAssegnato === processo) return;
    if (this.processoAssegnato !== null) {
      throw new Error(`Il prodotto ${this.id} appartiene già a un altro processo.`);
    }
    // Il processo aggiorna entrambi i lati della relazione.
    processo.aggiungiProdotto(this);
    this.processoAssegnato = processo;
  }
}

export class Cliente implements ICliente {
  readonly nome: string;
  readonly cognome: string;
  readonly email: string;

  constructor(
    nome: string,
    cognome: string,
    email: string,
    readonly metodoPagamento: MetodoPagamento,
  ) {
    this.nome = verificaTesto(nome, "Nome");
    this.cognome = verificaTesto(cognome, "Cognome");
    this.email = verificaTesto(email, "Email").toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      throw new Error("Indirizzo email non valido.");
    }
  }

  ordinaProdotto(prodotto: IProdotto): void {
    // Registrazione dell'ordine: nessun pagamento reale viene eseguito.
    prodotto.assegnaCliente(this);
    console.log(`${this.nome} ${this.cognome} ha ordinato ${prodotto.tipo} (${prodotto.id}).`);
  }
}

export class ProcessoProduzione implements IProcessoProduzione {
  readonly nome: string;
  readonly descrizione: string;
  readonly origineMateriale: string;
  private readonly elencoProdotti: IProdotto[] = [];

  constructor(nome: string, descrizione: string, origineMateriale: string) {
    this.nome = verificaTesto(nome, "Nome processo");
    this.descrizione = verificaTesto(descrizione, "Descrizione processo");
    this.origineMateriale = verificaTesto(origineMateriale, "Origine materiale");
  }

  get prodotti(): readonly IProdotto[] {
    return [...this.elencoProdotti];
  }

  aggiungiProdotto(prodotto: IProdotto): void {
    if (this.elencoProdotti.includes(prodotto)) return;
    if (this.elencoProdotti.some(elemento => elemento.id === prodotto.id)) {
      throw new Error(`ID prodotto duplicato: ${prodotto.id}.`);
    }
    if (prodotto.processoProduzione !== null && prodotto.processoProduzione !== this) {
      throw new Error(`Il prodotto ${prodotto.id} appartiene a un altro processo.`);
    }
    // Inserimento prima del collegamento per interrompere la chiamata reciproca.
    this.elencoProdotti.push(prodotto);
    try {
      prodotto.assegnaProcesso(this);
    } catch (errore) {
      this.elencoProdotti.pop();
      throw errore;
    }
  }
}

// Esempio di utilizzo con dati fittizi.
const processo = new ProcessoProduzione(
  "Riciclo PET e confezionamento",
  "Selezione del PET, riciclo, filatura, tessitura e confezionamento dei capi.",
  "PET proveniente da raccolta differenziata",
);

const bikini = new Prodotto("BW-001", "bikini", "S", "blu", 59.90, 80);
const shorts = new Prodotto("BW-002", "shorts", "M", "verde", 49.90, 90);
const costume = new Prodotto("BW-003", "costume intero", "L", "nero", 69.90, 85);

processo.aggiungiProdotto(bikini);
processo.aggiungiProdotto(shorts);
processo.aggiungiProdotto(costume);

const cliente = new Cliente("Nicola", "Berardi", "nicola@example.com", "carta");
cliente.ordinaProdotto(shorts);

console.table(processo.prodotti.map(prodotto => ({
  id: prodotto.id,
  tipo: prodotto.tipo,
  taglia: prodotto.taglia,
  prezzo: prodotto.prezzo,
  percentualeRiciclata: prodotto.percentualePlasticaRiciclata,
  cliente: prodotto.cliente?.email ?? "Disponibile",
  processo: prodotto.processoProduzione?.nome,
})));
