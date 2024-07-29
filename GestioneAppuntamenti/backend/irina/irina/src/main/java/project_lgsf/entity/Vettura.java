/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.entity;

import javax.json.Json;
import javax.json.JsonObject;
import project_lgsf.entity.constant.BaseEntity;
import javax.persistence.Column;
import javax.persistence.Entity;

import javax.persistence.Table;
import javax.ws.rs.core.UriBuilder;
import project_lgsf.boundary.UsersResources;

/**
 *
 * @author Stage
 */

@Entity
@Table(name = "vettura")
public class Vettura extends BaseEntity  {
      
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
   
    //costruttore
    public Vettura() {}

    public Vettura(String targa, String marca, String modello, int annoProduzione, boolean disponibile, boolean diesel, boolean benzina, boolean gpl, boolean elettrica) {
        this.targa = targa;
        this.marca = marca;
        this.modello = modello;
        this.annoProduzione = annoProduzione;
    
        this.diesel = diesel;
        this.benzina = benzina;
        this.gpl = gpl;
        this.elettrica = elettrica;
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

    @Override
    public String toString() {
        return "Vettura{" + "targa=" + targa + ", marca=" + marca + ", modello=" + modello + ", annoProduzione=" + annoProduzione +  ", diesel=" + diesel + ", benzina=" + benzina + ", gpl=" + gpl + ", elettrica=" + elettrica + '}';
    }
     
           public JsonObject toJsonSliceName() {

        return Json.createObjectBuilder()
                .add("targa", this.targa)
                
                .build();
    }

}
