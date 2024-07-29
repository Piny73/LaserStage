/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.json.bind.annotation.JsonbTypeAdapter;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lgsf.entity.adapter.AutoreTypeAdapter;

/**
 *
 * @author rlanz
 */
@Entity
@Table(name = "libro")
public class libro extends BaseEntity {
  
  private String titolo;
  
  @JsonbTypeAdapter(AutoreTypeAdapter.class)
  @ManyToOne(optional = true)
  @JoinColumn(name = "autore_id")
  private autore autore;
  
  private Integer annopubbl;
  
  private String isbn;
  
  private String luogo;
  
  private String lingua;
  
  private String genere;
  
  private String descrizione;


    public libro(String titolo, autore autore, Integer annopubbl, String isbn, String luogo, String lingua, String genere, String descrizione) {
        this.titolo = titolo;
        this.autore = autore;
        this.annopubbl = annopubbl;
        this.isbn = isbn;
        this.luogo = luogo;
        this.lingua = lingua;
        this.genere = genere;
        this.descrizione = descrizione;
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

     public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    @Override
    public String toString() {
        return "libro{" + "titolo=" + titolo + ", autore=" + autore + ", annopubbl=" + annopubbl + ", isbn=" + isbn + ", luogo=" + luogo + ", lingua=" + lingua + ", genere=" + genere + ", descrizione=" + descrizione + '}';
    }
 
  
   
}
