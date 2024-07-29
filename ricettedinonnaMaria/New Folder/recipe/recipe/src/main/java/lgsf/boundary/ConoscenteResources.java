/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.boundary;

import java.util.List;
import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
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
import lgsf.entity.Conoscente;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import lgsf.security.JWTManager;
import lgsf.store.ConoscenteStore;

/**
 * @author Piny73
 */
@Path("conoscente")
@Tag(name = "Gestione Conoscente", description = "Permette di gestire i conoscenti di lericettedinonnamaria")
@DenyAll
public class ConoscenteResources {
    
    @Inject
    private ConoscenteStore storeconoscente;
    
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
    @Operation(description = "Restituisce l'elenco di tutti i conoscenti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public List<Conoscente> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storeconoscente.all();
    }
     
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce il conoscente identificato dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Conoscente ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Conoscente non trovato")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public Conoscente find(@PathParam("id") Long id) {
        return storeconoscente.find(id).orElseThrow(() -> new NotFoundException("conoscente non trovato. id=" + id));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di un nuovo conoscente")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo conoscente creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di un conoscente fallito")
    })
    @PermitAll
    public Response create(@Valid Conoscente entity) {
        
        if(storeconoscente.findConoscentebyCognome(entity.getCognome()).isPresent()){
            
           return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }
        
        Conoscente saved = storeconoscente.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
}
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina un conoscente tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Conoscente eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Conoscente non trovato")

    })
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed("Admin")
    @PermitAll
    public Response delete(@PathParam("id") Long id) {
        Conoscente found = storeconoscente.find(id).orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
        storeconoscente.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    //@Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati del conoscente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Conoscente aggiornato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Conoscente update(@Valid Conoscente entity) {
        Conoscente found = storeconoscente.find(entity.getId()).orElseThrow(() -> new NotFoundException("user non trovato. id=" + entity.getId()));
        return storeconoscente.update(entity);
    }
}