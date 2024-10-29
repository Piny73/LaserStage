package ts.entity.adapter;

import javax.json.bind.adapter.JsonbAdapter;
import javax.json.JsonObject;
import javax.inject.Inject;
import javax.ws.rs.NotFoundException;
import ts.store.UserStore;
import ts.entity.User;

/**
 *
 * @author AndreLima
 */
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
        if (!json.containsKey("id") && !json.containsKey("username")) {
            throw new IllegalArgumentException("JSON deve contenere l'id o il username"); // Aggiunto controllo per l'id o username
        }

        // Cerca l'utente per id o username
        User user = null;
        if (json.containsKey("id")) {
            Long id = json.getJsonNumber("id").longValue();
            user = store.find(id)
                .orElseThrow(() -> new NotFoundException("Utente non trovato con id: " + id)); // Messaggio d'errore migliorato
        } else if (json.containsKey("username")) {
            String username = json.getString("username");
            user = store.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("Utente non trovato con username: " + username)); // Messaggio d'errore migliorato
        }

        return user; // Ritorna l'utente trovato
    }
}

