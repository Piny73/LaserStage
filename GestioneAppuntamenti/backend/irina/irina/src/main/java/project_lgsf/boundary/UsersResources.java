/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.t
xt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.boundary;

import project_lgsf.boundary.mapping.Credential;
import java.util.List;
import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonObject;
import javax.json.stream.JsonCollectors;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import project_lgsf.security.JWTManager;
import project_lgsf.store.UserStore;
import project_lgsf.entity.User;


@Path("users")
@Tag(name = "Gestione Users", description = "Permette di gestire gli admin di bkmapp")
@DenyAll
public class UsersResources {
    
    @Inject
    private UserStore storeuser;
    
    @Context
    ResourceContext rc;
    
    @Context
    UriInfo uriInfo;
    
    @Inject
    private JWTManager jwtManager;
    
    @Inject
    private JsonWebToken token;
    
    @Claim(value = "sub")
    private String sub;
        
   
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'elenco di tutti gli admin")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    @RolesAllowed({"Admin","User"})
    public List<User> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storeuser.all();
    }
    
    
    @GET
    @Path("allslice")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'elenco con informazioni ridotte di tutti gli utenti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    @PermitAll
    public JsonArray allSlice() {
        //System.out.println(token);
        return storeuser.all().stream().map(User::toJsonSliceName).collect(JsonCollectors.toJsonArray());
    }
    
    
        
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa utente identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Utente non trovato")
    })
    @RolesAllowed({"Admin","User"})
    public User find(@PathParam("id") Long id) {
        return storeuser.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di un nuovo utente")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo utente creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di utente fallito")
    })
    @PermitAll
    public Response create(@Valid User entity) {
        
        if(storeuser.findUserbyLogin(entity.getEmail()).isPresent()){
            
           return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }
        
        User saved = storeuser.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
}
    
    
    @POST
    @Path("login")
    @Operation(description = "Permette fare login e ristituisce il token valido")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Login fatto con successo"),
        @APIResponse(responseCode = "404", description = "Login fallito")

    })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public JsonObject login (@Valid Credential credential){
        
        User u = storeuser.login(credential).orElseThrow(() -> new NotAuthorizedException("User non Authorized",  
                                                                       Response.status(Response.Status.UNAUTHORIZED).build()));
        String jwt = jwtManager.generate(u);
         
        return  Json.createObjectBuilder()
                .add("mail", u.getEmail())
                .add("token",jwt)
                .add("userid", u.getId())
                .add("first_name", u.getFirstName())
                .add("last_name", u.getLastName())
                .add("role", u.getRoleuser().toString())
                .build();
    }
    
    
    
     @DELETE
    @Path("{id}")
    @Operation(description = "Elimina una risorsa Utente tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Utente non trovato")

    })
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public Response delete(@PathParam("id") Long id) {
        User found = storeuser.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
        storeuser.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    /*
    @DELETE
@Path("{id}")
@Operation(description = "Elimina un utente tramite l'ID")
@APIResponses({
    @APIResponse(responseCode = "200", description = "Utente eliminato con successo"),
    @APIResponse(responseCode = "404", description = "Utente non trovato")
})
@Produces(MediaType.APPLICATION_JSON)
@PermitAll
public Response delete(@PathParam("id") Long id) {
    // Trova l'utente nel database
    User found = storeuser.find(id).orElseThrow(() -> new NotFoundException("Utente non trovato. id=" + id));

    // Imposta lo stato dell'utente come cancellato
    found.setCanceled(true);

    // Prova a rimuovere l'utente dal database
    try {
        storeuser.remove(found); // O storeuser.save(found) se stai salvando le modifiche.
    } catch (Exception e) {
        // Gestisci l'eccezione e invia un messaggio di errore
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                       .entity("Errore durante l'eliminazione dell'utente: " + e.getMessage())
                       .build();
    }

    // Restituisci una risposta positiva
    return Response.status(Response.Status.OK).build();
} 
    */
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati dell'utente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente aggirnato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    @RolesAllowed("Admin")
    public User update(@PathParam("id") Long id, @Valid User entity) {
        User found = storeuser.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
        entity.setId(id);
        return storeuser.update(entity);
    }
   
    
    
}