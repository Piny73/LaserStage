/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import javax.json.Json;
import javax.json.JsonObject;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 *
 * @author rlanz
 */
@Entity
@Table(name = "autore")
public class autore extends BaseEntity {
   
    private String nome;
    private String cognome;
    private String nazionalita;
    private int annonascita;

    public autore(String nome, String cognome, String nazionalita, int annonascita) {
        this.nome = nome;
        this.cognome = cognome;
        this.nazionalita = nazionalita;
        this.annonascita = annonascita;
    }

    public autore() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getNazionalita() {
        return nazionalita;
    }

    public void setNazionalita(String nazionalita) {
        this.nazionalita = nazionalita;
    }

    public int getAnnonascita() {
        return annonascita;
    }

    public void setAnnonascita(int annonascita) {
        this.annonascita = annonascita;
    }

    @Override
    public String toString() {
        return "autore{" + "nome=" + nome + ", cognome=" + cognome + ", nazionalita=" + nazionalita + ", annonascita=" + annonascita + '}';
    }

    @Override
     public JsonObject toJsonSlice() {

        return Json.createObjectBuilder()
                .add("id", this.id)
                .add("nome", this.nome)
                .add("cognome", this.cognome)
                .add("nazionalita", this.nazionalita)
                .add("annonascita", this.annonascita)
                .build();
    }
    
    
}
