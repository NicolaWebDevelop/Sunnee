// SUNNEE - BEACHWEAR SOSTENIBILE

// Ogni prodotto rappresenta un singolo articolo.
// I materiali e i processi descritti sono dimostrativi.

type TipoProdotto = "costume da bagno" | "pareo" | "cappello";

type StatoProdotto = "disponibile" | "esaurito";

type MetodoPagamento = "carta" | "PayPal" | "bonifico";


// INTERFACCE

interface IProdotto {
  readonly id: string;
  readonly tipo: TipoProdotto;
  readonly taglia: string;
  readonly colore: string;

  stato: StatoProdotto;

  assegnaCliente(cliente: ICliente): void;
}

interface ICliente {
  readonly nome: string;
  readonly cognome: string;
  readonly email: string;

  metodoPagamentoPreferito: MetodoPagamento;

  ordinaProdotto(prodotto: IProdotto): void;
}

interface IProcessoProduzione {
  readonly nome: string;
  readonly descrizione: string;

  prodottiInProduzione: IProdotto[];

  aggiungiProdotto(prodotto: IProdotto): void;
}

// CLASSE PRODOTTO

class Prodotto implements IProdotto {
  // Il contatore genera ID diversi per le istanze
  // create durante l'esecuzione del programma.
  private static prossimoId = 1;

  readonly id: string;

  private clienteAssegnato: ICliente | null = null;

  constructor(
    public readonly tipo: TipoProdotto,
    public readonly taglia: string,
    public readonly colore: string,
    public stato: StatoProdotto = "disponibile"
  ) {
    if (!taglia.trim() || !colore.trim()) {
      throw new Error("Taglia e colore sono obbligatori.");
    }

    this.id = `SUN-${Prodotto.prossimoId++}`;
  }

  get cliente(): ICliente | null {
    return this.clienteAssegnato;
  }

  get ordinato(): boolean {
    return this.clienteAssegnato !== null;
  }

  assegnaCliente(cliente: ICliente): void {
    if (this.stato !== "disponibile" || this.ordinato) {
      throw new Error(
        `Il prodotto ${this.id} non è disponibile.`
      );
    }

    this.clienteAssegnato = cliente;
    this.stato = "esaurito";
  }
}


// CLASSE CLIENTE

class Cliente implements ICliente {
  constructor(
    public readonly nome: string,
    public readonly cognome: string,
    public readonly email: string,
    public metodoPagamentoPreferito: MetodoPagamento
  ) {
    if (!nome.trim() || !cognome.trim()) {
      throw new Error("Nome e cognome sono obbligatori.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Indirizzo email non valido.");
    }
  }

  ordinaProdotto(prodotto: IProdotto): void {
    if (prodotto.stato !== "disponibile") {
      throw new Error(
        `Ordine non riuscito: ${prodotto.id} è esaurito.`
      );
    }

    prodotto.assegnaCliente(this);

    console.log(
      `Ordine confermato: ${this.nome} ${this.cognome} ` +
      `ha ordinato ${prodotto.tipo} (${prodotto.id}).`
    );
  }
}


// CLASSE PROCESSO DI PRODUZIONE


class ProcessoProduzione implements IProcessoProduzione {
  prodottiInProduzione: IProdotto[] = [];

  constructor(
    public readonly nome: string,
    public readonly descrizione: string
  ) {
    if (!nome.trim() || !descrizione.trim()) {
      throw new Error(
        "Nome e descrizione del processo sono obbligatori."
      );
    }
  }

  aggiungiProdotto(prodotto: IProdotto): void {
    const giaPresente = this.prodottiInProduzione.some(
      articolo => articolo.id === prodotto.id
    );

    if (giaPresente) {
      throw new Error(
        `Il prodotto ${prodotto.id} è già presente nel processo.`
      );
    }

    this.prodottiInProduzione.push(prodotto);

    console.log(
      `${prodotto.tipo} (${prodotto.id}) aggiunto ` +
      `al processo "${this.nome}".`
    );
  }
}


// CREAZIONE DEI PRODOTTI


const costume = new Prodotto(
  "costume da bagno",
  "M",
  "blu"
);

const pareo = new Prodotto(
  "pareo",
  "unica",
  "verde"
);

const cappello = new Prodotto(
  "cappello",
  "L",
  "sabbia"
);

const prodottoEsaurito = new Prodotto(
  "costume da bagno",
  "S",
  "nero",
  "esaurito"
);


// CREAZIONE DEI CLIENTI


const nicola = new Cliente(
  "Nicola",
  "Berardi",
  "nicola@example.com",
  "carta"
);

const giulia = new Cliente(
  "Giulia",
  "Rossi",
  "giulia@example.com",
  "PayPal"
);


// CREAZIONE DEL PROCESSO DI PRODUZIONE


const processo = new ProcessoProduzione(
  "Rigenerazione delle reti da pesca",
  "Recupero delle reti dismesse, rigenerazione del " +
  "materiale e realizzazione di articoli beachwear."
);

// Aggiunta degli articoli al processo.
processo.aggiungiProdotto(costume);
processo.aggiungiProdotto(pareo);
processo.aggiungiProdotto(cappello);


// TEST AUTOMATICI


// Un test fallito interrompe l'esecuzione.
// Gli errori attesi vengono gestiti da verificaErrore.

function verifica(
  condizione: boolean,
  descrizione: string
): void {
  if (!condizione) {
    throw new Error(`TEST FALLITO: ${descrizione}`);
  }

  console.log(`TEST SUPERATO: ${descrizione}`);
}

function verificaErrore(
  azione: () => void,
  descrizione: string
): void {
  let erroreRilevato = false;

  try {
    azione();
  } catch {
    erroreRilevato = true;
  }

  verifica(erroreRilevato, descrizione);
}

console.log("--- TEST SUNNEE ---");

// Test 1: aggiunta dei prodotti.
verifica(
  processo.prodottiInProduzione.length === 3,
  "Tre prodotti aggiunti al processo"
);

// Test 2: ordine del primo cliente.
nicola.ordinaProdotto(costume);

verifica(
  costume.cliente === nicola &&
  costume.ordinato &&
  costume.stato === "esaurito",
  "Costume assegnato a Nicola e segnato come ordinato"
);

// Test 3: ordine del secondo cliente.
giulia.ordinaProdotto(pareo);

verifica(
  pareo.cliente === giulia &&
  pareo.stato === "esaurito",
  "Pareo assegnato a Giulia"
);

// Test 4: impedire un secondo ordine dello stesso capo.
verificaErrore(
  () => giulia.ordinaProdotto(costume),
  "Secondo ordine dello stesso prodotto bloccato"
);

verifica(
  costume.cliente === nicola,
  "Il costume rimane assegnato al primo cliente"
);

// Test 5: impedire l'ordine di un articolo esaurito.
verificaErrore(
  () => nicola.ordinaProdotto(prodottoEsaurito),
  "Ordine di un prodotto esaurito bloccato"
);

// Test 6: impedire duplicati nel processo.
verificaErrore(
  () => processo.aggiungiProdotto(cappello),
  "Aggiunta duplicata bloccata"
);

verifica(
  processo.prodottiInProduzione.length === 3,
  "Il numero di prodotti resta invariato dopo il duplicato"
);

// Test 7: aggiungere un nuovo articolo.
const nuovoPareo = new Prodotto(
  "pareo",
  "unica",
  "corallo"
);

processo.aggiungiProdotto(nuovoPareo);

verifica(
  processo.prodottiInProduzione.length === 4 &&
  nuovoPareo.stato === "disponibile",
  "Nuovo articolo aggiunto e disponibile"
);

// Test 8: ID univoci.
const ids = processo.prodottiInProduzione.map(
  prodotto => prodotto.id
);

verifica(
  new Set(ids).size === ids.length,
  "Tutti i prodotti del processo hanno ID diversi"
);


// RIEPILOGO FINALE

console.log("--- RIEPILOGO PRODOTTI ---");

console.table(
  processo.prodottiInProduzione.map(prodotto => ({
    id: prodotto.id,
    tipo: prodotto.tipo,
    taglia: prodotto.taglia,
    colore: prodotto.colore,
    stato: prodotto.stato
  }))
);

console.log("Tutti i test Sunnee sono stati superati.");