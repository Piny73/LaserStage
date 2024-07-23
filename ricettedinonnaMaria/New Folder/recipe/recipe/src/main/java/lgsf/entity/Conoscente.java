/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;
import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.Table;
import lgsf.entity.constant.BaseEntity;

/**
 *
 * @author piny7
 */
@Entity
@Table(name = "listaconoscenti")
public class Conoscente extends BaseEntity {
    
    @Column(nullable = false)
    private String nomeC;

    @Column(nullable = false)
    private String cognomeC;

    @Column(nullable = false, unique = true)
    private String emailC;

    public Conoscente() {
    }

    public Conoscente(String nomeC, String cognomeC, String emailC) {
        this.nomeC = nomeC;
        this.cognomeC = cognomeC;
        this.emailC = emailC;
    }

    public String getNomeC() {
        return nomeC;
    }

    public void setNomeC(String nomeC) {
        this.nomeC = nomeC;
    }

    public String getCognomeC() {
        return cognomeC;
    }

    public void setCognomeC(String cognomeC) {
        this.cognomeC = cognomeC;
    }

    public String getEmailC() {
        return emailC;
    }

    public void setEmailC(String emailC) {
        this.emailC = emailC;
    }

    @Override
    public String toString() {
        return "Conoscente{" + "nomeC=" + nomeC + ", cognomeC=" + cognomeC + ", emailC=" + emailC + '}';
    }  
}
