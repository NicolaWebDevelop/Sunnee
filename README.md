# Sunnee 🌊 — Beachwear sostenibile

Progetto didattico in **TypeScript** che modella le interazioni tra clienti, prodotti beachwear e processi di produzione sostenibile attraverso interfacce e classi.

Sunnee è un brand ipotetico ma realistico, nato dall'idea di una surfista e amante del mare: trasformare rifiuti plastici, come le reti da pesca dismesse, in una risorsa per realizzare articoli beachwear.

🌐 [Demo su CodePen](https://codepen.io/NicolaWebDevelop/pen/XJMqMVK)

💻 [Repository GitHub](https://github.com/NicolaWebDevelop/Sunnee)

## Obiettivo

Rappresentare la struttura operativa del brand applicando i principi della programmazione orientata agli oggetti: tipizzazione, interfacce, classi e incapsulamento.

Il progetto comprende la logica applicativa in TypeScript. I risultati vengono mostrati nella console: non è prevista un'interfaccia grafica.

## Tecnologie

- **TypeScript:** definizione dei tipi e implementazione della logica.
- **Node.js:** esecuzione locale del programma compilato.
- **npm:** gestione delle dipendenze e dei comandi del progetto.
- **CodePen:** esecuzione della demo con preprocessore TypeScript.
- **Git e GitHub:** versionamento e gestione dei branch.

Non vengono utilizzati framework applicativi. TypeScript è installato come dipendenza di sviluppo.

## Struttura del sistema

| Interfaccia | Classe | Responsabilità |
| --- | --- | --- |
| `IProdotto` | `Prodotto` | Gestire gli articoli e la loro assegnazione ai clienti |
| `ICliente` | `Cliente` | Gestire i dati dei clienti e gli ordini |
| `IProcessoProduzione` | `ProcessoProduzione` | Gestire un processo e i prodotti associati |

### Prodotti

L'interfaccia `IProdotto` definisce ID, tipo, taglia, colore, stato e il metodo `assegnaCliente(cliente: ICliente): void`.

I tipi previsti sono **costume da bagno**, **pareo** e **cappello**. Ogni istanza rappresenta un singolo articolo e riceve un ID progressivo, univoco durante l'esecuzione del programma.

La classe `Prodotto` conserva il cliente assegnato e rende consultabile la proprietà `ordinato`. Dopo l'assegnazione, l'articolo risulta ordinato e il suo stato passa da `disponibile` a `esaurito`.

### Clienti

L'interfaccia `ICliente` definisce nome, cognome, email, metodo di pagamento preferito e il metodo `ordinaProdotto(prodotto: IProdotto): void`.

La classe `Cliente` permette di ordinare un articolo disponibile e delega l'assegnazione al prodotto.

I metodi di pagamento previsti sono **carta**, **PayPal** e **bonifico**. Non vengono eseguiti pagamenti reali.

### Processi di produzione

L'interfaccia `IProcessoProduzione` definisce nome, descrizione, l'array `prodottiInProduzione` e il metodo `aggiungiProdotto(prodotto: IProdotto): void`.

La classe `ProcessoProduzione` aggiunge gli articoli all'elenco e impedisce l'inserimento di prodotti con un ID già presente nello stesso processo.

## File principali

| File | Contenuto |
| --- | --- |
| `beachwear.ts` | Interfacce, classi, esempi e test |
| `package.json` | Dipendenze e comandi npm |
| `package-lock.json` | Versioni delle dipendenze risolte da npm |
| `tsconfig.json` | Configurazione del compilatore TypeScript |
| `.gitignore` | Esclusione delle dipendenze e dei file generati |
| `README.md` | Documentazione del progetto |

## Funzionamento

1. Si creano gli articoli beachwear e i clienti.
2. Si crea un processo di produzione e vi si aggiungono i prodotti.
3. Un cliente ordina un prodotto disponibile.
4. Il prodotto viene associato al cliente e segnato come esaurito.
5. Un secondo ordine dello stesso articolo viene bloccato.

L'aggiunta a un processo registra un'associazione dimostrativa: non simula tempi di lavorazione o completamento della produzione.

## Esecuzione locale

### Prerequisiti

- Node.js
- npm

### Installazione

Clonare il repository:

```bash
git clone https://github.com/NicolaWebDevelop/Sunnee.git
cd Sunnee
```

Installare le dipendenze:

```bash
npm install
```

### Verifica TypeScript

```bash
npm run verify
```

Il comando `verify` esegue `npm run tsc`, che richiama `tsc --noEmit`.

Il compilatore controlla il codice con le impostazioni definite in `tsconfig.json`, inclusa la modalità `strict`, senza generare file JavaScript.

### Compilazione ed esecuzione

```bash
npm start
```

Il comando compila il codice nella cartella `dist` ed esegue `dist/beachwear.js`, inclusi gli esempi e i test.

Per eseguire soltanto la compilazione:

```bash
npm run build
```

### Comandi disponibili

| Comando | Funzione |
| --- | --- |
| `npm run tsc` | Controlla TypeScript senza generare file |
| `npm run verify` | Esegue `npm run tsc` |
| `npm run build` | Compila il progetto nella cartella `dist` |
| `npm start` | Compila ed esegue il programma e i test |

Le cartelle `node_modules`, `dist` e `.check` sono escluse dal versionamento tramite `.gitignore`.

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

Aprire la [demo del progetto](https://codepen.io/NicolaWebDevelop/pen/XJMqMVK) e visualizzare la console.

Per ricreare il Pen:

1. Creare un nuovo Pen.
2. Selezionare **TypeScript** come preprocessore del pannello JavaScript.
3. Incollare il codice di `beachwear.ts` nel pannello JS, senza tag `<script>`, delimitatori Markdown o dichiarazioni `export`.
4. Lasciare vuoti i pannelli HTML e CSS.
5. Aprire la console ed eseguire il codice.

L'anteprima vuota è prevista: l'output viene mostrato nella console. La rappresentazione di `console.table` può variare tra CodePen e la console del browser.

## Verifiche incluse

Il codice contiene controlli per verificare:

- L'aggiunta iniziale di tre prodotti al processo.
- L'assegnazione del costume al primo cliente e del pareo al secondo.
- L'aggiornamento dello stato dopo un ordine.
- Il blocco di un secondo ordine dello stesso articolo.
- Il mantenimento del cliente originariamente assegnato.
- Il blocco dell'ordine di un articolo già esaurito.
- Il rifiuto di un'aggiunta duplicata al processo.
- Il mantenimento del numero di articoli dopo un duplicato rifiutato.
- L'aggiunta di un nuovo articolo disponibile.
- L'unicità degli ID dei prodotti presenti nel processo.

Gli errori attesi vengono intercettati dai test. Un controllo fallito interrompe l'esecuzione con il messaggio `TEST FALLITO`.

Se tutti i controlli passano, viene stampato:

```text
Tutti i test Sunnee sono stati superati.
```

Il riepilogo finale contiene quattro prodotti:

| Articolo | Stato finale |
| --- | --- |
| Costume da bagno | Esaurito, assegnato a Nicola |
| Pareo iniziale | Esaurito, assegnato a Giulia |
| Cappello | Disponibile |
| Nuovo pareo | Disponibile |

## Flusso Git

- **`development`:** branch dedicato allo sviluppo e alla verifica delle modifiche.
- **`main`:** branch che contiene la versione stabile del progetto.

Le modifiche vengono sviluppate su `development`, verificate con `npm run verify` e `npm start`, quindi integrate in `main`.

## Ambito del progetto

Il sistema opera in memoria: i dati e il contatore degli ID vengono ricreati a ogni esecuzione.

Non include database, autenticazione, pagamenti reali o gestione completa di magazzino e produzione.

Il contesto di sostenibilità è parte della simulazione didattica: il codice non misura l'impatto ambientale dei prodotti.

## 👨‍💻 Autore

**Nicola Berardi** – Frontend Developer

🌐 [Portfolio](https://nicolawebdevelop.github.io/WebNicolaDesign/)

💻 [GitHub](https://github.com/NicolaWebDevelop)

📧 [Email](mailto:nicolag704@gmail.com)