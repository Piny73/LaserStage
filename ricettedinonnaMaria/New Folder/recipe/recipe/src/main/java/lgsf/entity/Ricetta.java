/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import lgsf.entity.constant.BaseEntity;

/**
 * @author piny73
 */
@Entity
@Table(name = "ricette")
public class Ricetta extends BaseEntity {
   @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Integer tempodiCottura;

    @Column(nullable = false)
    private String difficolta;

    //@JsonbTypeAdapter(IngredienteTypeAdapter.class)
    //@ManyToMany(mappedBy = "ricetta_id", fetch = FetchType.LAZY)
    //private List<Ingrediente> ingredienti;
    
    @Column(nullable = false)
    private Integer quantita;

    @Column(length = 1500)
    private String procedimento;

    @Column(length = 255)
    private String videoLinkR;

    public Ricetta() {
    }

    public Ricetta(String nome, Integer tempodiCottura, String difficolta, Integer quantita, String procedimento, String videoLinkR) {
        this.nome = nome;
        this.tempodiCottura = tempodiCottura;
        this.difficolta = difficolta;
        //this.ingredienti = ingredienti;
        this.quantita = quantita;
        this.procedimento = procedimento;
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

   /* public List<Ingrediente> getIngredienti() {
        return ingredienti;
    }

    public void setIngredienti(List<Ingrediente> ingredienti) {
        this.ingredienti = ingredienti;
    }*/

    public double getQuantita() {
        return quantita;
    }

    public void setQuantita(Integer quantita) {
        this.quantita = quantita;
    }

    public String getProcedimento() {
        return procedimento;
    }

    public void setProcedimento(String procedimento) {
        this.procedimento = procedimento;
    }
    public String getVideoLinkR() {
        return videoLinkR;
    }

    public void setVideoLinkR(String videoLinkR) {
        this.videoLinkR = videoLinkR;
    }
    
    /*@Override
    public String toString() {
        return "Ricetta{" + "nome=" + nome + ", tempodiCottura=" + tempodiCottura + ", difficolta=" + difficolta + ", ingredienti=" + ingredienti + ", quantita=" + quantita + ", procedimento=" + procedimento + ", videoLinkR=" + videoLinkR + '}';
    }*/
    
    
}