import { Component } from '@angular/core';
import { Contact } from '../models/contact.model';  // Assicurati di importare il modello


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  title = '';  // Definisci la proprietà title
  showLogin = false;
  // Array per contenere i contatti creati
  contacts: Contact[] = [];
  showForm: boolean = false;  // Variabile per gestire la visibilità del form

  toggleLogin() {
    this.showLogin = !this.showLogin;  // Alterna la visibilità del form di login
  }

  createContact(nome: string, cognome: string, email: string) {
    const newContact = new Contact(nome, cognome, email);
    this.contacts.push(newContact);  // Aggiungi il contatto all'array
    console.log('Contact created:', newContact);  // Stampa il contatto creato
    this.showForm = false; // Nascondi il form dopo la creazione del contatto
  }

  // Metodo per mostrare il form
  toggleForm() {
    this.showForm = !this.showForm;  // Alterna tra true e false
  }
    createRecipe() {
    throw new Error('Method not implemented.');
    }
    createIngredient() {
    throw new Error('Method not implemented.');
    }
  }
  

