/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author rlanz
 */
@Entity
@Table(name = "libro")
public class libro extends BaseEntity {
  
  private String titolo;
  
  private autore autore;
  
  private Integer annopubbl;
  
  private String isbn;
  
  private String luogo;
  
  private String lingua;
  
  private String genere;

    public libro(String titolo, autore autore, Integer annopubbl, String isbn, String luogo, String lingua, String genere) {
        this.titolo = titolo;
        this.autore = autore;
        this.annopubbl = annopubbl;
        this.isbn = isbn;
        this.luogo = luogo;
        this.lingua = lingua;
        this.genere = genere;
    }

    public libro() {
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public autore getAutore() {
        return autore;
    }

    public void setAutore(autore autore) {
        this.autore = autore;
    }

    public Integer getAnnopubbl() {
        return annopubbl;
    }

    public void setAnnopubbl(Integer annopubbl) {
        this.annopubbl = annopubbl;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getLuogo() {
        return luogo;
    }

    public void setLuogo(String luogo) {
        this.luogo = luogo;
    }

    public String getLingua() {
        return lingua;
    }

    public void setLingua(String lingua) {
        this.lingua = lingua;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    @Override
    public String toString() {
        return "libro{" + "titolo=" + titolo + ", autore=" + autore + ", annopubbl=" + annopubbl + ", isbn=" + isbn + ", luogo=" + luogo + ", lingua=" + lingua + ", genere=" + genere + '}';
    }
  
   
}
