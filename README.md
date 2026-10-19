# Sunnee 🌊 — Beachwear sostenibile

Progetto didattico in **TypeScript** che modella le interazioni tra clienti, prodotti beachwear e processi di produzione sostenibile attraverso interfacce e classi.

Sunnee è un brand ipotetico ma realistico, nato dall'idea di una surfista e amante del mare: trasformare rifiuti plastici, come le reti da pesca dismesse, in una risorsa per realizzare articoli beachwear.

## Obiettivo

Rappresentare la struttura operativa del brand applicando i principi della programmazione orientata agli oggetti: tipizzazione, interfacce, classi e incapsulamento.

Il progetto richiede esclusivamente codice TypeScript. I risultati vengono mostrati nella console: non è prevista un'interfaccia grafica.

## Tecnologie

- **TypeScript** per la definizione dei tipi e della logica applicativa.
- **CodePen** come ambiente di esecuzione con preprocessore TypeScript.
- **Console** per messaggi, verifiche e riepilogo dei prodotti.

Non sono utilizzati framework o librerie esterne.

## Struttura del sistema

| Interfaccia | Classe | Responsabilità |
| --- | --- | --- |
| `IProdotto` | `Prodotto` | Gestire gli articoli e la loro assegnazione ai clienti |
| `ICliente` | `Cliente` | Gestire i dati dei clienti e l'ordinazione dei prodotti |
| `IProcessoProduzione` | `ProcessoProduzione` | Rappresentare un processo e i prodotti associati |

### Prodotti

L'interfaccia `IProdotto` definisce ID, tipo, taglia, colore, stato e il metodo `assegnaCliente(cliente: ICliente): void`.

I tipi previsti sono **costume da bagno**, **pareo** e **cappello**. Ogni istanza rappresenta un singolo articolo e riceve un ID progressivo, univoco durante l'esecuzione del programma.

La classe `Prodotto` conserva il cliente assegnato e rende consultabile la proprietà `ordinato`. Dopo l'assegnazione, l'articolo risulta ordinato e il suo stato passa da `disponibile` a `esaurito`.

### Clienti

L'interfaccia `ICliente` definisce nome, cognome, email, metodo di pagamento preferito e il metodo `ordinaProdotto(prodotto: IProdotto): void`.

La classe `Cliente` permette di ordinare un articolo disponibile e delega l'assegnazione al prodotto. I metodi di pagamento previsti sono **carta**, **PayPal** e **bonifico**; non vengono eseguiti pagamenti reali.

### Processi di produzione

L'interfaccia `IProcessoProduzione` definisce nome, descrizione, l'array `prodottiInProduzione` e il metodo `aggiungiProdotto(prodotto: IProdotto): void`.

La classe `ProcessoProduzione` aggiunge gli articoli all'elenco e impedisce l'inserimento di prodotti con un ID già presente nello stesso processo.

## Funzionamento

1. Si creano gli articoli beachwear e i clienti.
2. Si crea un processo di produzione sostenibile e vi si aggiungono i prodotti.
3. Un cliente ordina un prodotto disponibile.
4. Il prodotto viene associato al cliente e segnato come esaurito.
5. Un secondo ordine dello stesso articolo viene bloccato.

L'aggiunta a un processo registra un'associazione dimostrativa: non simula tempi di lavorazione o completamento della produzione.

## Esempio di utilizzo

Il seguente esempio può essere eseguito dopo le definizioni delle interfacce e delle classi:

```typescript
const articoloDemo = new Prodotto("costume da bagno", "M", "blu");

const clienteDemo = new Cliente(
  "Nicola",
  "Berardi",
  "nicola@example.com",
  "carta"
);

const processoDemo = new ProcessoProduzione(
  "Rigenerazione delle reti da pesca",
  "Recupero delle reti dismesse e realizzazione di articoli beachwear."
);

processoDemo.aggiungiProdotto(articoloDemo);
clienteDemo.ordinaProdotto(articoloDemo);

console.log(articoloDemo.stato); // "esaurito"
console.log(articoloDemo.ordinato); // true
console.log(articoloDemo.cliente === clienteDemo); // true
```

## Esecuzione su CodePen

1. Crea un nuovo Pen.
2. Nelle impostazioni del pannello JavaScript seleziona **TypeScript** come preprocessore.
3. Incolla il codice TypeScript completo nel pannello JS, senza tag `<script>`, delimitatori Markdown o dichiarazioni `export`.
4. Lascia vuoti i pannelli HTML e CSS.
5. Apri la console ed esegui il codice.

L'anteprima vuota è prevista: l'output viene prodotto nella console. Il riepilogo usa `console.table`, la cui rappresentazione può variare tra la console di CodePen e quella del browser.

## Verifiche incluse

Il codice dimostrativo contiene controlli per verificare:

- L'aggiunta iniziale di tre prodotti al processo.
- L'assegnazione del costume al primo cliente e del pareo al secondo.
- L'aggiornamento dello stato dopo un ordine.
- Il blocco di un secondo ordine dello stesso articolo, preservando il cliente originale.
- Il blocco dell'ordine di un articolo già esaurito.
- Il rifiuto di un'aggiunta duplicata al processo.
- L'aggiunta di un nuovo articolo disponibile.
- L'unicità degli ID dei prodotti presenti nel processo.

Gli errori previsti vengono intercettati dai test. Un controllo fallito interrompe l'esecuzione con il messaggio `TEST FALLITO`; se tutti i controlli passano, viene stampato:

```text
Tutti i test Sunnee sono stati superati.
```

Il riepilogo finale dell'esempio contiene quattro prodotti:

| Articolo | Stato finale |
| --- | --- |
| Costume da bagno | Esaurito, assegnato a Nicola |
| Pareo iniziale | Esaurito, assegnato a Giulia |
| Cappello | Disponibile |
| Nuovo pareo | Disponibile |

Queste verifiche riguardano gli scenari dimostrativi e non sostituiscono il controllo statico dei tipi con il compilatore TypeScript.

## Ambito del progetto

Il sistema opera in memoria: i dati e il contatore degli ID vengono ricreati a ogni esecuzione. Non include database, autenticazione, pagamenti, certificazioni ambientali o gestione completa di magazzino e produzione.

Il contesto di sostenibilità è parte della simulazione didattica; il codice non misura l'impatto ambientale dei prodotti.

## Autore

**Nicola Berardi** — [NicolaWebDevelop](https://github.com/NicolaWebDevelop)
