//navbar.components.ts
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

  createRecipe(categoria: string, nome: string, difficolta: string, procedimento: string, tempodiEsecuzione: string, tempodiCottura: string) {
    // Creazione di un nuovo oggetto Ricetta con tutti i campi (compresa categoria e difficoltà)
    const nuovaRicetta = new Ricetta(categoria, nome, difficolta, procedimento, tempodiEsecuzione, tempodiCottura);
    // Log per debugging
    console.log('Ricetta creata:', nuovaRicetta);
    // Aggiunge la nuova ricetta all'array delle ricette
    this.ricette.push(nuovaRicetta);
    // Chiude il form dopo la creazione
    this.toggleRecipeForm();
  }

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
}

