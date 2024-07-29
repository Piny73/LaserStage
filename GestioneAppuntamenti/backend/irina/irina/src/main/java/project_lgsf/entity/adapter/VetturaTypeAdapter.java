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
import project_lgsf.entity.User;
import project_lgsf.store.UserStore;


/**
 *
 * @author AndreLima
 */
public class VetturaTypeAdapter implements JsonbAdapter<User, JsonObject>  {
    
    @Inject
    UserStore store;

    @Override
    public JsonObject adaptToJson(User entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public User adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            return null;
        }
        return store.find(json.getJsonNumber("id").longValue()).orElseThrow(() -> new NotFoundException("VetturaTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}
