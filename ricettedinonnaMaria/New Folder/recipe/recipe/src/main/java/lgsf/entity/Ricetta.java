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
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
    private Integer tempodiCottura;

    @Column(nullable = false)
    private String difficolta;

    @ManyToMany(mappedBy = "ricetta_id")
    private List<Ingrediente> ingredienti;
    
    @Column(nullable = false)
    private Integer quantita;

    @Column(length = 255)
    private String preparatione;

    @Column(length = 255)
    private String videoLinkR;

    public Ricetta() {
    }

    public Ricetta(String nome, Integer tempodiCottura, String difficolta, List<Ingrediente> ingredienti, Integer quantita, String preparatione, String videoLinkR) {
        this.nome = nome;
        this.tempodiCottura = tempodiCottura;
        this.difficolta = difficolta;
        this.ingredienti = ingredienti;
        this.quantita = quantita;
        this.preparatione = preparatione;
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

    public void setTempodiCottura(Integer tempodiCottura) {
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

    public void setQuantita(Integer quantita) {
        this.quantita = quantita;
    }

    public String getPreparatione() {
        return preparatione;
    }

    public void setPreparatione(String preparatione) {
        this.preparatione = preparatione;
    }
    public String getVideoLinkR() {
        return videoLinkR;
    }

    public void setVideoLinkR(String videoLinkR) {
        this.videoLinkR = videoLinkR;
    }

    @Override
    public String toString() {
        return "Ricetta{" + "nome=" + nome + ", tempodiCottura=" + tempodiCottura + ", difficolta=" + difficolta + ", ingredienti=" + ingredienti + ", quantita=" + quantita + ", preparatione=" + preparatione + ", videoLinkR=" + videoLinkR + '}';
    }

    
    
}