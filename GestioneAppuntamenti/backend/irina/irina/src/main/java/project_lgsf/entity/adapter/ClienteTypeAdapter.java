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
import project_lgsf.entity.Cliente;
import project_lgsf.store.ClienteStore;



public class ClienteTypeAdapter implements JsonbAdapter<Cliente, JsonObject>  {
    
    @Inject
    ClienteStore store;

    @Override
    public JsonObject adaptToJson(Cliente entity) throws Exception {
        return entity.toJsonSlice();
    }

    @Override
    public Cliente adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            return null;
        }
        return store.find(json.getJsonNumber("id").longValue()).orElseThrow(() -> new NotFoundException("ClienteTypeAdapter.adaptFromJson not found"));
    }
    
    
    
}
