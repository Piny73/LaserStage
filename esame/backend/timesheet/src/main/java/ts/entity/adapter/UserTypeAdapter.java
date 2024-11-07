package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import ts.store.UserStore;
import ts.entity.User;


public class UserTypeAdapter implements JsonbAdapter<User, JsonObject> {
    
    @Inject
    UserStore store;

    @Override
    public JsonObject adaptToJson(User entity) throws Exception {
        // Assicurati che l'entità non sia null
        if (entity == null) {
            return null; // Gestisci il caso null
        }
        return entity.toJsonSlice(); // Assicurati che toJsonSlice restituisca un JsonObject valido
    }

    @Override
    public User adaptFromJson(JsonObject json) throws Exception {
        if (!json.containsKey("id")) {
            throw new IllegalArgumentException("JSON deve contenere l'id"); // Aggiunto controllo per l'id
        }

        // Cerca l'utente per id
        User user = null;
        Long id = json.getJsonNumber("id").longValue();
        user = store.find(id)
            .orElseThrow(() -> new NotFoundException("Utente non trovato con id: " + id)); // Messaggio d'errore migliorato

        return user; // Ritorna l'utente trovato
    }
}

