/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.entity;

import java.time.LocalDateTime;
import project_lgsf.entity.constant.BaseEntity;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import project_lgsf.entity.constant.StatoAppuntoType;

/**
 *
 * @author Stage
 */

@Entity
@Table(name = "appunto")
public class Appunto extends BaseEntity  {
 
    private LocalDateTime dataOraInizio;
    private LocalDateTime dataOraFine;
    private String descrizione;
    
    @Enumerated(EnumType.STRING)
    private StatoAppuntoType stato;
    
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;
    
    @ManyToOne
    @JoinColumn(name = "vettura_id")
    private Vettura vettura;


    public Appunto() {}

    public Appunto(LocalDateTime dataOraInizio, LocalDateTime dataOraFine, String descrizione, Cliente cliente, Vettura vettura) {
        this.dataOraInizio = dataOraInizio;
        this.dataOraFine = dataOraFine;
        this.descrizione = descrizione;
        this.stato = StatoAppuntoType.NUOVO;
        this.cliente = cliente;
        this.vettura = vettura;
    }

    public LocalDateTime getDataOraInizio() {
        return dataOraInizio;
    }

    public void setDataOraInizio(LocalDateTime dataOraInizio) {
        this.dataOraInizio = dataOraInizio;
    }

    public LocalDateTime getDataOraFine() {
        return dataOraFine;
    }

    public void setDataOraFine(LocalDateTime dataOraFine) {
        this.dataOraFine = dataOraFine;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public StatoAppuntoType getStato() {
        return stato;
    }

    public void setStato(StatoAppuntoType stato) {
        this.stato = stato;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Vettura getVettura() {
        return vettura;
    }

    public void setVettura(Vettura vettura) {
        this.vettura = vettura;
    }

    @Override
    public String toString() {
        return "Appunto{" + "dataOraInizio=" + dataOraInizio + ", dataOraFine=" + dataOraFine + ", descrizione=" + descrizione + ", stato=" + stato + ", cliente=" + cliente + ", vettura=" + vettura + '}';
    }

    public String getPwd() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

    public void setPwd(String shaHash) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }

  
    
    
}
