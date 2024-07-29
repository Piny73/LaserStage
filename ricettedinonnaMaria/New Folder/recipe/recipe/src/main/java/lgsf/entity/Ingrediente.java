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
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String nome; 
    @NotNull
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String tipologia; 
    @NotNull
    @Size(max = 255)
    @Column(nullable = false, length = 255)
    private String unitaDiMisura; 
    
    public Ingrediente() {}

    public Ingrediente(String nome, String tipologia, String unitaDiMisura) {
        this.nome = nome;
        this.tipologia = tipologia;
        this.unitaDiMisura = unitaDiMisura;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTipologia() {
        return tipologia;
    }

    public void setTipologia(String tipologia) {
        this.tipologia = tipologia;
    }

    public String getUnitaDiMisura() {
        return unitaDiMisura;
    }

    public void setUnitaDiMisura(String unitaDiMisura) {
        this.unitaDiMisura = unitaDiMisura;
    }

    @Override
    public String toString() {
        return "Ingrediente{" + "nome=" + nome + ", tipologia=" + tipologia + ", unitaDiMisura=" + unitaDiMisura + '}';
    }

    
 
}