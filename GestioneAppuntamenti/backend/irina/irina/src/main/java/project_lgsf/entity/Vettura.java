/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.entity;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.bind.annotation.JsonbTypeAdapter;
import project_lgsf.entity.constant.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import javax.persistence.Table;
import project_lgsf.entity.adapter.ClienteTypeAdapter;

/**
 *
 * @author Stage
 */
@Entity
@Table(name = "vettura")
public class Vettura extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String targa;

    @Column(nullable = false)
    private String marca;

    @Column(nullable = false)
    private String modello;

    private int annoProduzione;
    private boolean disponibile;
    private boolean diesel;
    private boolean benzina;
    private boolean gpl;
    private boolean elettrica;

    @JsonbTypeAdapter(ClienteTypeAdapter.class)
    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    //costruttore
    public Vettura() {
    }

    public Vettura(String targa, String marca, String modello, int annoProduzione, boolean disponibile, boolean diesel, boolean benzina, boolean gpl, boolean elettrica, Cliente cliente) {
        this.targa = targa;
        this.marca = marca;
        this.modello = modello;
        this.annoProduzione = annoProduzione;
        this.disponibile = disponibile;
        this.diesel = diesel;
        this.benzina = benzina;
        this.gpl = gpl;
        this.elettrica = elettrica;
        this.cliente = cliente;
    }

    public String getTarga() {
        return targa;
    }

    public void setTarga(String targa) {
        this.targa = targa;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModello() {
        return modello;
    }

    public void setModello(String modello) {
        this.modello = modello;
    }

    public int getAnnoProduzione() {
        return annoProduzione;
    }

    public void setAnnoProduzione(int annoProduzione) {
        this.annoProduzione = annoProduzione;
    }

    public boolean isDisponibile() {
        return disponibile;
    }

    public void setDisponibile(boolean disponibile) {
        this.disponibile = disponibile;
    }

    public boolean isDiesel() {
        return diesel;
    }

    public void setDiesel(boolean diesel) {
        this.diesel = diesel;
    }

    public boolean isBenzina() {
        return benzina;
    }

    public void setBenzina(boolean benzina) {
        this.benzina = benzina;
    }

    public boolean isGpl() {
        return gpl;
    }

    public void setGpl(boolean gpl) {
        this.gpl = gpl;
    }

    public boolean isElettrica() {
        return elettrica;
    }

    public void setElettrica(boolean elettrica) {
        this.elettrica = elettrica;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

   

    public JsonObject toJsonSliceName() {

        return Json.createObjectBuilder()
                .add("targa", this.targa)
                .build();
    }

}
