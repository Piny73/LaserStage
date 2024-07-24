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
@Table(name = "conoscenti")
public class Conoscente extends BaseEntity {
    
    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String cognome;

    @Column(nullable = false, unique = true)
    private String email;

    public Conoscente() {
    }

    public Conoscente(String nome, String cognome, String email) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
    }

    public String getNome() {
        return nome;
    }

    public void setNomeC(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmailC(String emailC) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Conoscente{" + "nome=" + nome + ", cognome=" + cognome + ", email=" + email + '}';
    }  
}
