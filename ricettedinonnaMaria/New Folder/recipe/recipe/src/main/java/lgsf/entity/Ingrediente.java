/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lgsf.entity.constant.BaseEntity;

/**
 * @author piny73
 */

@Entity
@Table(name = "ingredienti")
public class Ingrediente extends  BaseEntity {    
    @NotNull
    @Column(nullable = false)
    private String nome; 
    @NotNull
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String descrizione; 
    @NotNull
    @Size(max = 10)
    @Column(nullable = false, length = 10)
    private String unitaDiMisura; 
    
    public Ingrediente() {}

    public Ingrediente(String nome, String descrizione, String unitadimisura) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.unitaDiMisura = unitaDiMisura;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public String getUnitadimisura() {
        return unitaDiMisura;
    }

    public void setUnitadimisura(String unitadimisura) {
        this.unitaDiMisura = unitaDiMisura;
    }

    @Override
    public String toString() {
        return "Ingrediente{" + "nome=" + nome + ", descrizione=" + descrizione + ", unitadimisura=" + unitaDiMisura + '}';
    }

    
 
}