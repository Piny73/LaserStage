// footer.component.ts
import { Component, Input } from '@angular/core';
import { Ricetta } from '../../models/contact.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
// Definisci la proprietà title
title: string = 'Categorie Ricette';

  @Input() ricette: Ricetta[] = []; // Input per ricevere le ricette dal componente padre
  selectedCategoryRecipes: Ricetta[] = [];
  selectedCategory: string = '';

  // Metodo per mostrare le ricette in base alla categoria selezionata
  showRecipesByCategory(categoria: string) {
    this.selectedCategory = categoria;
    this.selectedCategoryRecipes = this.ricette.filter(ricetta => ricetta.categoria === categoria);
  }
}