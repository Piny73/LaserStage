package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import ts.entity.TimeSheet;  
import ts.store.TimeSheetStore; 

public class TimeSheetAdapter implements JsonbAdapter<TimeSheet, JsonObject> {

    @Inject
    TimeSheetStore store;  // Iniettiamo lo store per gestire il recupero dei TimeSheet

    @Override
    public JsonObject adaptToJson(TimeSheet entity) throws Exception {
        // Adatta l'entità TimeSheet a un oggetto JSON
        return entity.toJsonSlice(); // Assicurati che il metodo toJsonSlice() sia implementato nella tua classe TimeSheet
    }

    @Override
    public TimeSheet adaptFromJson(JsonObject json) throws Exception {
        // Verifica che l'oggetto JSON contenga una chiave "id"
        if (!json.containsKey("id")) {
            return null;  // Ritorna null se non c'è un ID
        }
        // Recupera il TimeSheet dallo store usando l'ID e gestisce il caso in cui non venga trovato
        return store.find(json.getJsonNumber("id").longValue())
                .orElseThrow(() -> new NotFoundException("TimeSheetAdapter.adaptFromJson not found"));
    }
}


