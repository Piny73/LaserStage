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
  ingredienti: { nome: string; unitaDiMisura: string }[] = [];
  showRecipeForm = false;
  ricette: Ricetta[] = [];  // Definisci ricette come un array di oggetti Ricetta
  immagini: string[] = [];  // Array per le immagini selezionate
  searchQuery: string = ''; // Modello per la barra di ricerca
  showSearchMessage = false; // Variabile per controllare se mostrare il messaggio
  showLogin: boolean = false;  // Variabile per controllare la visibilità del modale
  showAllRecipes: boolean = false;  // Variabile booleana per mostrare l'elenco delle ricette

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
    const nuovaRicetta = new Ricetta(categoria, nome, difficolta, procedimento, tempodiEsecuzione, tempodiCottura, this.immagini);
    console.log('Ricetta creata:', nuovaRicetta);
    this.ricette.push(nuovaRicetta);
    this.immagini = [];  // Resetta l'array delle immagini per la prossima ricetta
    this.toggleRecipeForm();
  }

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

  toggleRecipeForm() {
    this.showRecipeForm = !this.showRecipeForm;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  toggleIngredientForm() {
    this.showIngredientForm = !this.showIngredientForm;
  }

  toggleElencoRicette() {
    this.showAllRecipes = !this.showAllRecipes;
  }


  showRecipes(ricetta: Ricetta) {
    console.log('Ricetta selezionata:', ricetta);
    }

  onSearch() {
    this.showSearchMessage = true;  // Mostra il messaggio "barra ancora non abilitata"
  }
}
