import { Component } from '@angular/core';
import { Contact, Ricetta } from '../models/contact.model';  // Assicurati di importare il modello

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = '';  // Definisci la proprietà title
  contacts: Contact[] = []; // Array per contenere i contatti creati
  showForm: boolean = false;  // Variabile per gestire la visibilità del form
  showIngredientForm: boolean = false;
  showIngredientModal: boolean = false; // Modal per scegliere gli ingredienti
  quantita: number = 0;  // Quantità per ciascun ingrediente selezionato
  showRecipeForm = false;
  ricette: Ricetta[] = [];  // Definisci ricette come un array di oggetti Ricetta
  immagini: string[] = [];  // Array per le immagini selezionate
  searchQuery: string = ''; // Modello per la barra di ricerca
  showSearchMessage = false; // Variabile per controllare se mostrare il messaggio
  showLogin: boolean = false;  // Variabile per controllare la visibilità del modale
  showAllRecipes: boolean = false;  // Variabile booleana per mostrare l'elenco delle ricette

  // Lista di ingredienti disponibili
  ingredientiSelezionabili: { nome: string; unitaDiMisura: string }[] = [
    { nome: 'Farina', unitaDiMisura: 'gr' },
    { nome: 'Zucchero', unitaDiMisura: 'gr' },
    { nome: 'Burro', unitaDiMisura: 'gr' },
    { nome: 'Latte', unitaDiMisura: 'ml' },
    { nome: 'Uova', unitaDiMisura: 'pezzi' },
    { nome: 'Carne', unitaDiMisura: 'gr' },
    { nome: 'Formaggio', unitaDiMisura: 'gr' },
    { nome: 'Acciughe', unitaDiMisura: 'pezzi' },
    { nome: 'Aceto', unitaDiMisura: 'ml' },
    { nome: 'Acqua', unitaDiMisura: 'ml' },
    { nome: 'Marmellata', unitaDiMisura: 'gr' },
    { nome: 'Legumi', unitaDiMisura: 'gr' },
    { nome: 'Dado', unitaDiMisura: 'pezzi' },
    { nome: 'Concentrato di pomodoro', unitaDiMisura: 'gr' },
    { nome: 'Vino', unitaDiMisura: 'ml' }
  ];

  // Array per memorizzare gli ingredienti selezionati
  ingredientiSelezionati: { nome: string; unitaDiMisura: string; quantita: number }[] = [];

  // Array per memorizzare gli ingredienti aggiunti alla ricetta
  ingredientiAggiunti: { nome: string; quantita: number; unitaDiMisura: string }[] = [];

  toggleLogin() {
    this.showLogin = !this.showLogin;  // Alterna la visibilità del form di login
  }

  createContact(nome: string, cognome: string, email: string) {
    const newContact = new Contact(nome, cognome, email);
    this.contacts.push(newContact);  // Aggiungi il contatto all'array
    console.log('Contact created:', newContact);  // Stampa il contatto creato
    this.showForm = false; // Nascondi il form dopo la creazione del contatto
  }

  // Metodo per creare una ricetta
  createRecipe(
    categoria: string, 
    nome: string, 
    difficolta: string, 
    procedimento: string, 
    tempoDiEsecuzione: string, 
    tempoDiCottura: string, 
    immagini: string[]
  ) {
    if (this.ingredientiAggiunti.length === 0) {
      alert('Seleziona almeno un ingrediente e specifica la quantità.');
      return;
    }

    // Creazione della nuova ricetta
    const nuovaRicetta = new Ricetta(
      categoria, 
      nome, 
      this.ingredientiAggiunti.map(ing => ({ nome: ing.nome, unitaDiMisura: ing.unitaDiMisura })),  // Solo nome e unità di misura
      this.ingredientiAggiunti.map(ing => ({ quantita: ing.quantita })),  // Solo quantità
      difficolta, 
      procedimento, 
      tempoDiEsecuzione, 
      tempoDiCottura, 
      immagini
    );

    // Stampa la ricetta creata per debug
    console.log('Ricetta creata:', nuovaRicetta);

    // Aggiungi la nuova ricetta all'elenco delle ricette
    this.ricette.push(nuovaRicetta);

    // Resetta i campi dopo la creazione
    this.immagini = [];
    this.ingredientiAggiunti = [];
    this.toggleRecipeForm();  // Chiudi il form della ricetta
  }

  // Metodo per selezionare/deselezionare un ingrediente e gestire la quantità
  toggleIngrediente(ingrediente: { nome: string; unitaDiMisura: string }, event: any) {
    const isChecked = event.target.checked;

    if (isChecked) {
      this.ingredientiSelezionati.push({ ...ingrediente, quantita: 0 });  // Aggiungi l'ingrediente con quantità iniziale di 0
    } else {
      const index = this.ingredientiSelezionati.findIndex(ing => ing.nome === ingrediente.nome);
      if (index > -1) {
        this.ingredientiSelezionati.splice(index, 1);  // Rimuovi l'ingrediente deselezionato
      }
    }
  }

  // Verifica se l'ingrediente è selezionato
  isIngredienteSelezionato(ingrediente: { nome: string; unitaDiMisura: string }): boolean {
    return this.ingredientiSelezionati.some(ing => ing.nome === ingrediente.nome);
  }

  // Funzione per aprire/chiudere il modal di selezione degli ingredienti
  toggleIngredientModal() {
    this.showIngredientModal = !this.showIngredientModal;
  }

  // Funzione per aggiungere gli ingredienti selezionati alla ricetta
  aggiungiIngredientiAllaRicetta() {
    this.ingredientiSelezionati.forEach(ingrediente => {
      const quantita = ingrediente.quantita;
      if (quantita > 0) {
        this.ingredientiAggiunti.push({
          nome: ingrediente.nome,
          quantita: quantita,
          unitaDiMisura: ingrediente.unitaDiMisura
        });
      }
    });

    // Resetta la selezione degli ingredienti
    this.ingredientiSelezionati = [];
    this.toggleIngredientModal();  // Chiudi il modal dopo aver aggiunto gli ingredienti
  }

  // Gestione delle immagini selezionate
  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 3) {
      alert("Puoi selezionare un massimo di 3 immagini.");
      return;
    }

    this.immagini = [];

    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.immagini.push(e.target.result);  // Memorizza il file come base64
      };
      reader.readAsDataURL(files[i]);
    }
  }

  // Alterna la visibilità del form di creazione ricetta
  toggleRecipeForm() {
    this.showRecipeForm = !this.showRecipeForm;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addIngredient() {
    throw new Error('Method not implemented.');
  }

  toggleIngredientForm() {
    this.showIngredientForm = !this.showIngredientForm;
  }

  toggleElencoRicette() {
    this.showAllRecipes = !this.showAllRecipes;
  }

  // Mostra una ricetta specifica
  showRecipes(ricetta: Ricetta) {
    console.log('Ricetta selezionata:', ricetta);
  }

  // Funzione per la ricerca delle ricette
  onSearch() {
    this.showSearchMessage = true;  // Mostra il messaggio "barra ancora non abilitata"
  }
}

