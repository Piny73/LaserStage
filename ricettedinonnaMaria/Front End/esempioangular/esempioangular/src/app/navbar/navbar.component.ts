import { Component } from '@angular/core';
import { Contact, Ricetta } from '../models/contact.model';  // Assicurati di importare il modello

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  title = '';  // Definisci la proprietà title
  showLogin = false;
  contacts: Contact[] = []; // Array per contenere i contatti creati
  showForm: boolean = false;  // Variabile per gestire la visibilità del form
  showIngredientForm: boolean = false;
  ingredienti: { nome: string; unitaDiMisura: string }[] = [];
  showRecipeForm = false;
  ricette: Ricetta[] = [];  // Definisci ricette come un array di oggetti Ricetta
  immagini: string[] = [];  // Array per le immagini selezionate
  searchQuery: string = ''; // Modello per la barra di ricerca
  allRecipes = []; // Lista completa delle ricette
  filteredRecipes = []; // Lista delle ricette filtrate

  showSearchMessage = false; // Variabile per controllare se mostrare il messaggio

  toggleLogin() {
    this.showLogin = !this.showLogin;  // Alterna la visibilità del form di login
  }

  createContact(nome: string, cognome: string, email: string) {
    const newContact = new Contact(nome, cognome, email);
    this.contacts.push(newContact);  // Aggiungi il contatto all'array
    console.log('Contact created:', newContact);  // Stampa il contatto creato
    this.showForm = false; // Nascondi il form dopo la creazione del contatto
  }

  // Creazione del nuovo ingrediente
  createIngredient(nome: string, unitaDiMisura: string) {
    this.ingredienti.push({ nome, unitaDiMisura });
    this.toggleIngredientForm(); // Nasconde il form dopo la creazione dell'ingrediente
  }

  createRecipe(categoria: string, nome: string, difficolta: string, procedimento: string, tempodiEsecuzione: string, tempodiCottura: string, immagini: string[]) {
    // Creazione di un nuovo oggetto Ricetta con tutti i campi, incluse le immagini
    const nuovaRicetta = new Ricetta(categoria, nome, difficolta, procedimento, tempodiEsecuzione, tempodiCottura, this.immagini);
    // Log per debugging
    console.log('Ricetta creata:', nuovaRicetta);
    // Aggiunge la nuova ricetta all'array delle ricette
    this.ricette.push(nuovaRicetta);
    // Chiude il form dopo la creazione
    console.log('Ricetta creata:', nuovaRicetta);
    // Resetta l'array delle immagini per la prossima ricetta
    this.immagini = [];
    this.toggleRecipeForm();
}

// Metodo per gestire le immagini selezionate
onFileSelected(event: any) {
  const files: FileList = event.target.files;

  // Limita il numero di immagini a un massimo di 3
  if (files.length > 3) {
    alert("Puoi selezionare un massimo di 3 immagini.");
    return;
  }

  // Svuota l'array delle immagini precedenti
  this.immagini = [];

  // Cicla sui file selezionati e leggi ogni immagine
  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.immagini.push(e.target.result);  // Memorizza il file come base64
    };
    reader.readAsDataURL(files[i]);
  }
}
    // Metodo per chiudere/aprire il form (se hai già un'implementazione)
  toggleRecipeForm() {
    this.showRecipeForm = !this.showRecipeForm;
  }

  // Metodo per mostrare il form
  toggleForm() {
    this.showForm = !this.showForm;  // Alterna tra true e false
  }

  toggleIngredientForm() {
    this.showIngredientForm = !this.showIngredientForm;
  }

  onSearch() {
    this.showSearchMessage = true;  // Mostra il messaggio "barra ancora non abilitata"
  }
}