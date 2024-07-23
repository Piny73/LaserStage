/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity;

import lgsf.entity.constant.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

/**
 *
 * @author Stage
 */
@NamedQueries({
        @NamedQuery(name = Cliente.FIND_BY_USR, query = "select e from Cliente e where e.email= :email"),
        @NamedQuery(name = Cliente.FIND_ALL, query = "select e from Cliente e order by e.cognome")
})

@Entity
@Table(name = "cliente")
public class Cliente extends BaseEntity {
   
    public static final String FIND_BY_USR = "Account.findByUser";
    public static final String FIND_ALL = "Account.findAll";
    
    
    public Cliente() {}
    
    
     @NotBlank(message = "la proprietà nome non può avere solo spazi")
    @Column(nullable = false)
    private String nome;
   
   
     @NotBlank(message = "la proprietà cognome non può avere solo spazi")
     @Column(nullable = false)
    private String cognome;
   
   
      @NotBlank(message = "la proprietà indirizzo non può avere solo spazi")
     @Column(nullable = false)
    private String indirizzo;
   
   
      
    
   
      @NotBlank(message = "la proprietà telefono non può avere solo spazi")
    @Size(min = 10, message = "la proprietà telefono deve avere almeno 10 caratteri")
    @Column(nullable = false)
    private String telefono;
    
    
    @NotBlank
    @Email(message = "la proprietà email non contiene un indirizzo email valido")
    @Column(nullable = false, unique = true)
    private String email;

   
 //costruttori
     public Cliente(String telefono,  @Email(message = "la proprietà email non contiene un indirizzo email valido") String email) {
        
        this.telefono = telefono;
        this.email = email;
    }
    
    public Cliente(String nome, String cognome, String indirizzo, String telefono, @Email(message = "la proprietà email non contiene un indirizzo email valido") String email) {
        this.nome = nome;
        this.cognome = cognome;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.email = email;
    }

   
    //costruttore vuoto
    
    
    // Getters e setters
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

    public String getIndirizzo() {
        return indirizzo;
    }

    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Cliente{" + "nome=" + nome + ", cognome=" + cognome + ", indirizzo=" + indirizzo + ", telefono=" + telefono + ", email=" + email + '}';
    }

    
    
}