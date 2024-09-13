/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.entity.adapter;

/**
 *
 * @author Stage
 */
import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import project_lgsf.entity.Vettura;
import project_lgsf.store.VetturaStore;


public class VetturaTypeAdapter implements JsonbAdapter<Vettura, JsonObject>  {
    
    @Inject
    VetturaStore store;

    @Override
    public JsonObject adaptToJson(Vettura entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public Vettura adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id_vettura")) {
            return null;
        }
        return store.find(json.getJsonNumber("id_vettura").longValue()).orElseThrow(() -> new NotFoundException("VetturaTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}
