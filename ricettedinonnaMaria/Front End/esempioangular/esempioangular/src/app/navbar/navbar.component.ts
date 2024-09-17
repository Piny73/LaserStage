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
  ingredienti: { nome: string; unita: string }[] = [];
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
  createIngredient(nome: string, unita: string) {
    this.ingredienti.push({ nome, unita });
    this.toggleIngredientForm(); // Nasconde il form dopo la creazione dell'ingrediente
  }

  createRecipe(nome: string, difficolta: string, procedimento: string, tempoEsecuzione: String, tempoCottura: String) {
    const nuovaRicetta = new Ricetta (nome, difficolta, procedimento, tempoEsecuzione, tempoCottura);
    console.log('Contact created:', nuovaRicetta);
    this.ricette.push(nuovaRicetta);
    this.toggleRecipeForm(); // Chiude il form dopo la creazione
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

