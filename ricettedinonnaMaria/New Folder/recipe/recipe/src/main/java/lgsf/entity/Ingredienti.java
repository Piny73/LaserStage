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
@Table(name = "ingredienti")
public class Ingredienti extends  BaseEntity {    
   
    @Column(nullable = false)
    private String nome; 
    
    @Column(nullable = false, length = 255)
    private String descrizione; 
    
    @Column(nullable = false, length = 10)
    private String unitadimisura; 
    
    public Ingredienti() {}

    public Ingredienti(String nome, String descrizione, String unitadimisura) {
        this.nome = nome;
        this.descrizione = descrizione;
        this.unitadimisura = unitadimisura;
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
        return unitadimisura;
    }

    public void setUnitadimisura(String unitadimisura) {
        this.unitadimisura = unitadimisura;
    }

    @Override
    public String toString() {
        return "Ingredienti{" + "nome=" + nome + ", descrizione=" + descrizione + ", unitadimisura=" + unitadimisura + '}';
    }

    
 
}