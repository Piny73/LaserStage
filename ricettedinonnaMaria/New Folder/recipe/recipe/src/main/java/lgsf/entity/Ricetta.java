/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import java.util.List;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lgsf.entity.constant.BaseEntity;

/**
 * @author piny73
 */
@Entity
@Table(name = "listaricette")
class Ricetta extends BaseEntity {
   @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private int tempodiCottura;

    @Column(nullable = false)
    private String difficolta;

    @OneToMany(mappedBy = "ricetta_id")
    private List<Ingrediente> ingredienti;
    
    @Column(nullable = false)
    private double quantita;

    @Column(length = 255)
    private String preparatione;

    @OneToMany(mappedBy = "ricetta_id")
    @CollectionTable(name = "ImmaginiRicetta", joinColumns = @JoinColumn(name = "id"))
    private List<immaginiRicetta> immaginiricetta;

    @Column(length = 255)
    private String videoLinkR;

    public Ricetta() {
    }

    public Ricetta(String nome, int tempodiCottura, String difficolta, List<Ingrediente> ingredienti, double quantita, String preparatione, List<immaginiRicetta> immaginiricetta, String videoLinkR) {
        this.nome = nome;
        this.tempodiCottura = tempodiCottura;
        this.difficolta = difficolta;
        this.ingredienti = ingredienti;
        this.quantita = quantita;
        this.preparatione = preparatione;
        this.immaginiricetta = immaginiricetta;
        this.videoLinkR = videoLinkR;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getTempodiCottura() {
        return tempodiCottura;
    }

    public void setTempodiCottura(int tempodiCottura) {
        this.tempodiCottura = tempodiCottura;
    }

    public String getDifficolta() {
        return difficolta;
    }

    public void setDifficolta(String difficolta) {
        this.difficolta = difficolta;
    }

    public List<Ingrediente> getIngredienti() {
        return ingredienti;
    }

    public void setIngredienti(List<Ingrediente> ingredienti) {
        this.ingredienti = ingredienti;
    }

    public double getQuantita() {
        return quantita;
    }

    public void setQuantita(double quantita) {
        this.quantita = quantita;
    }

    public String getPreparatione() {
        return preparatione;
    }

    public void setPreparatione(String preparatione) {
        this.preparatione = preparatione;
    }

    public List<immaginiRicetta> getImmaginiricetta() {
        return immaginiricetta;
    }

    public void setImmaginiricetta(List<immaginiRicetta> immaginiricetta) {
        this.immaginiricetta = immaginiricetta;
    }

    public String getVideoLinkR() {
        return videoLinkR;
    }

    public void setVideoLinkR(String videoLinkR) {
        this.videoLinkR = videoLinkR;
    }

    @Override
    public String toString() {
        return "Ricetta{" + "nome=" + nome + ", tempodiCottura=" + tempodiCottura + ", difficolta=" + difficolta + ", ingredienti=" + ingredienti + ", quantita=" + quantita + ", preparatione=" + preparatione + ", immaginiricetta=" + immaginiricetta + ", videoLinkR=" + videoLinkR + '}';
    }
    
}