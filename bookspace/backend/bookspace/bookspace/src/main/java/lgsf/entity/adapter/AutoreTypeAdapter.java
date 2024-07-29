/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import lgsf.entity.User;
import lgsf.entity.autore;
import lgsf.store.UserStore;
import lgsf.store.autoreStore;


/**
 *
 * @author AndreLima
 */
public class AutoreTypeAdapter implements JsonbAdapter<autore, JsonObject>  {
    
    @Inject
    autoreStore store;

    @Override
    public JsonObject adaptToJson(autore entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public autore adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            return null;
        }
        return store.find(json.getJsonNumber("id").longValue()).orElseThrow(() -> new NotFoundException("UserTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}
