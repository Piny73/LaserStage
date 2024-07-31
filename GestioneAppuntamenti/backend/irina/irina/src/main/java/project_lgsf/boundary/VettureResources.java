/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.boundary;

import java.util.List;
import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
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
import project_lgsf.entity.Vettura;
import project_lgsf.security.JWTManager;
import project_lgsf.store.VetturaStore;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

/**
 *
 * @author Stage
 */
@Path("vetture")
@Tag(name = "Gestione Vetture", description = "Permette di gestire le vetture di bkmapp")
@DenyAll
public class VettureResources {
    
    @Inject
    private VetturaStore storevettura;
    
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
    @Operation(description = "Restituisce l'elenco di tutte le vetture")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin","Vettura"})
    @PermitAll
    public List<Vettura> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storevettura.all();
    }
    
    
        
    @GET
    @Path("{id_vettura}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa vettura identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Vettura ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Vettura non trovato")
    })
    @RolesAllowed({"Admin","Vettura"})
    public Vettura find(@PathParam("id_vettura") Long id_vettura) {
        return storevettura.find(id_vettura).orElseThrow(() -> new NotFoundException("Vettura non trovata. id_vettura=" + id_vettura));
    }
    
        
    @GET
    @Path("/vetture/{vettura}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa utente identificata dalla vettura")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Vettura ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Vettura non trovato")
    })
    //@RolesAllowed({"Admin","User"})
    @PermitAll
    public Vettura findbyvettura(@PathParam("Vettura") Long vettura) {
        return storevettura.find(vettura).orElseThrow(() -> new NotFoundException("vettura non trovata. id_vettura=" + vettura));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di una nuova vettura")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuova vettura creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di vettura fallito")
    })
    @PermitAll
    public Response create(@Valid Vettura entity) {
        
        Vettura saved = storevettura.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
}
    
    
    @DELETE
    @Path("{id_vettura}")
    @Operation(description = "Elimina una risorsa Vettura tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Vettura eliminata con successo"),
        @APIResponse(responseCode = "404", description = "Vettura non trovata")

    })
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed("Admin")
    @PermitAll
    public Response delete(@PathParam("id_vettura") Long id_vettura) {
       Vettura found = storevettura.find(id_vettura).orElseThrow(() -> new NotFoundException("vettura non trovata. id_vettura=" + id_vettura));
        storevettura.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Path("{id_vettura}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati della vettura")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Vettura aggiornata con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Vettura update(@Valid Vettura entity) {
        Vettura found = storevettura.find(entity.getId()).orElseThrow(() -> new NotFoundException("vettura non trovata. id_vettura=" + entity.getId().toString()));
        //entity.setId(id);
        return storevettura.update(entity);
    }
   
       
}