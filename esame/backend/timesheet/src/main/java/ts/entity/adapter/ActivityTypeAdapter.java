/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import ts.entity.Activity;
import ts.store.ActivityStore;

/**
 *
 * @author AndreLima
 */
public class ActivityTypeAdapter implements JsonbAdapter<Activity, JsonObject>  {
    
    @Inject
    ActivityStore store;

    @Override
    public JsonObject adaptToJson(Activity entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public Activity adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            return null;
        }
        return store.find(json.getJsonNumber("id").longValue()).orElseThrow(() -> new NotFoundException("ActivityTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}