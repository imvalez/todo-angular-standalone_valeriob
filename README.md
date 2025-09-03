# 📝 Todo App - Angular Standalone Components

![GitHub repo size](https://img.shields.io/github/repo-size/imvalez/todo-angular-standalone_valeriob)
![GitHub last commit](https://img.shields.io/github/last-commit/imvalez/todo-angular-standalone_valeriob)
![GitHub issues](https://img.shields.io/github/issues/imvalez/todo-angular-standalone_valeriob)
![GitHub stars](https://img.shields.io/github/stars/imvalez/todo-angular-standalone_valeriob?style=social)
![License](https://img.shields.io/github/license/imvalez/todo-angular-standalone_valeriob)

---

## 📖 Descrizione

Questa è una **Todo App moderna** sviluppata con **Angular 18** utilizzando **componenti standalone**.  
Permette di aggiungere, completare e rimuovere attività quotidiane in modo semplice, con un'interfaccia fluida, responsive e con animazioni eleganti.

La logica è centralizzata in un servizio (`TodoService`) e i dati sono gestiti tramite **TypeScript**, garantendo chiarezza e sicurezza dei tipi.

---

## 🎯 Funzionalità principali

- **Gestione attività:** aggiungi, completa e cancella task con pochi click.  
- **Interfaccia responsive:** ottimizzata per desktop e dispositivi mobili.  
- **Contatori e feedback:** monitoraggio delle attività completate e in sospeso.  
- **Animazioni e UX:** transizioni fluide e feedback visivo sulle operazioni.  
- **Componenti standalone:** modulare, scalabile e facile da manutenere.  
- **Comunicazione tra componenti:** tramite `@Input`, `@Output` e `EventEmitter`.  

---

## 🧩 Struttura dei componenti

- `AppComponent` – entry point e gestione globale  
- `AddTodoComponent` – aggiunta di nuove attività  
- `TodoListComponent` – visualizzazione e gestione delle attività  

La logica è gestita in `TodoService` per mantenere il codice pulito e riutilizzabile.

---

## 🔗 Tecnologie utilizzate

- Angular 18 (Standalone Components)  
- TypeScript con interfacce forti  
- CSS moderno e animazioni  
- RxJS per eventuale gestione reattiva dei dati  

**Esempio di interfaccia Todo:**
```ts
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}
```

---

## ⚙️ Requisiti

- Node.js (>=16)  
- Angular CLI (>=15)  
- npm o yarn  

---

## 🚀 Avvio del progetto

1. Clona il repository:
```sh
git clone <url-repository>
cd todo-angular-standalone_valeriob
```

2. Installa le dipendenze:
```sh
npm install
```

3. Avvia l’app:
```sh
ng serve
```

Apri il browser su `http://localhost:4200`.

---

## 👨‍💻 Autore

**Valerio Bottari**  
📧 Email: valeriobottari99@gmail.com  
🌐 GitHub: [imvalez](https://github.com/imvalez)

---

## 🔖 Note

- La gestione dei dati è temporanea (in-memory). Può essere estesa con backend o storage locale.  
- L’app sfrutta il **two-way data binding**, direttive Angular (`*ngFor`, `*ngIf`) e stili condizionali.
