/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity.Adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import lgsf.entity.Ricetta;
import lgsf.store.RicettaStore;

/**
 * @author piny73
 */
public class RicettaTypeAdapter implements JsonbAdapter<Ricetta, JsonObject>  {
    
    @Inject
    RicettaStore store;

    @Override
    public JsonObject adaptToJson(Ricetta entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public Ricetta adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            return null;
        }
        return store.find(json.getJsonNumber("id").longValue()).orElseThrow(() -> new NotFoundException("UserTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}
