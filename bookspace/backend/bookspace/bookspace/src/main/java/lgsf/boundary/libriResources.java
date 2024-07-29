/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.boundary;

import lgsf.boundary.mapping.Credential;
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
import lgsf.security.JWTManager;
import lgsf.store.UserStore;
import lgsf.entity.User;
import lgsf.entity.libro;
import lgsf.store.libroStore;

/**
 *
 * @author AndreLima
 */
@Path("libri")
@Tag(name = "Gestione libri", description = "Permette di gestire gli utenti di bookspace")
@DenyAll
public class libriResources {
    
    @Inject
    private libroStore store;
    
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
    @Operation(description = "Restituisce l'elenco di tutti gli utenti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin","User"})
    @PermitAll
    public List<libro> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return store.all();
    }
    
    
        
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa utente identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Utente non trovato")
    })
    //@RolesAllowed({"Admin","User"})
    @PermitAll
    public libro find(@PathParam("id") Long id) {
        return store.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
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
    public Response create(@Valid libro entity) {
        
            
        libro saved = store.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
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
    //@RolesAllowed("Admin")
    @PermitAll
    public Response delete(@PathParam("id") Long id) {
        libro found = store.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
        store.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati dell'utente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente aggirnato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    //@RolesAllowed("Admin")
    @PermitAll
    public libro update(@Valid libro entity) {
        libro found = store.find(entity.getId()).orElseThrow(() -> new NotFoundException("user non trovato. id=" + entity.getId()));
        return store.update(entity);
    }
   
    
    
}