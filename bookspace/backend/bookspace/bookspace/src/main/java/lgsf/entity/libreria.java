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
@Table(name = "libreria")
public class libreria extends BaseEntity {
    private String scaffale;
    private String genere;
    private String autore;
    private String titolo;
    private String casaeditrice;
    private int annopubbl;
    private int numpagine;
    private int numscaffale;
    private int posizionelibro;

    public libreria() {} //costruttore vuoto

    public libreria(String scaffale, String genere, String autore, String titolo, String casaeditrice, int annopubbl, int numpagine, int numscaffale, int posizionelibro) {
        this.scaffale = scaffale;
        this.genere = genere;
        this.autore = autore;
        this.titolo = titolo;
        this.casaeditrice = casaeditrice;
        this.annopubbl = annopubbl;
        this.numpagine = numpagine;
        this.numscaffale = numscaffale;
        this.posizionelibro = posizionelibro;
    }

    public String getScaffale() {
        return scaffale;
    }

    public void setScaffale(String scaffale) {
        this.scaffale = scaffale;
    }

    public String getGenere() {
        return genere;
    }

    public void setGenere(String genere) {
        this.genere = genere;
    }

    public String getAutore() {
        return autore;
    }

    public void setAutore(String autore) {
        this.autore = autore;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getCasaeditrice() {
        return casaeditrice;
    }

    public void setCasaeditrice(String casaeditrice) {
        this.casaeditrice = casaeditrice;
    }

    public int getAnnopubbl() {
        return annopubbl;
    }

    public void setAnnopubbl(int annopubbl) {
        this.annopubbl = annopubbl;
    }

    public int getNumpagine() {
        return numpagine;
    }

    public void setNumpagine(int numpagine) {
        this.numpagine = numpagine;
    }

    public int getNumscaffale() {
        return numscaffale;
    }

    public void setNumscaffale(int numscaffale) {
        this.numscaffale = numscaffale;
    }

    public int getPosizionelibro() {
        return posizionelibro;
    }

    public void setPosizionelibro(int posizionelibro) {
        this.posizionelibro = posizionelibro;
    }

    @Override
    public String toString() {
        return "libreria{" + "scaffale=" + scaffale + ", genere=" + genere + ", autore=" + autore + ", titolo=" + titolo + ", casaeditrice=" + casaeditrice + ", annopubbl=" + annopubbl + ", numpagine=" + numpagine + ", numscaffale=" + numscaffale + ", posizionelibro=" + posizionelibro + '}';
    }
    
    
    
}
