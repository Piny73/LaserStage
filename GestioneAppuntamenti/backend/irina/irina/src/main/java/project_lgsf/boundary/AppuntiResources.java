/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.boundary;


import java.util.List;
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
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import project_lgsf.entity.Appunto;
import project_lgsf.security.JWTManager;
import project_lgsf.store.AppuntoStore;
import javax.enterprise.context.RequestScoped;
import project_lgsf.store.UserStore;
/**
 *
 * @author Stage
 */
@Path("appunti")
@Tag(name = "Gestione Appunti", description = "Permette di gestire gli appunti di bkmapp")
@PermitAll
@RequestScoped
public class AppuntiResources {
    
    @Inject
    private AppuntoStore storeappunto;
    
     
    
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
    @Operation(description = "Restituisce l'elenco di tutti gli appunti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato"),
         
    })
    //@RolesAllowed({"Admin","User"})
    @PermitAll
    public List<Appunto> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storeappunto.all();
    }
    
    
        
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa utente identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Appunto ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Appunto non trovato"),
        @APIResponse(responseCode = "500", description = "Errore interno del server")  
    })
    //@RolesAllowed({"Admin","Appunto"})
    public Appunto find(@PathParam("id") Long id) {
        return storeappunto.find(id).orElseThrow(() -> new NotFoundException("appunto non trovato. id=" + id));
    }
    
        
    @GET
    @Path("/appunti/{appunto}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa utente identificata dall'Appunto")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Appunto ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Appunto non trovato")
    })
    //@RolesAllowed({"Admin","Appunto"})
    @PermitAll
    public Appunto findbycliente(@PathParam("cliente") Long cliente) {
        return storeappunto.find(cliente).orElseThrow(() -> new NotFoundException("cliente non trovato. id=" + cliente));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di un nuovo appunto")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo appunto creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di appunto fallito"),
        @APIResponse(responseCode = "500", description = "Errore interno del server")  
    })
    @PermitAll
    public Response create(@Valid Appunto entity) {
        
        Appunto saved = storeappunto.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
}
    
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina una risorsa Appunto tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Appunto eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Appunto non trovato"),
        @APIResponse(responseCode = "500", description = "Errore interno del server")  

    })
     @Produces(MediaType.APPLICATION_JSON)
   //@RolesAllowed({"Admin","User"})
    public Response deleteCompany(@PathParam("id") Long id) {
        Appunto found = storeappunto.find(id).orElseThrow(() -> new NotFoundException("Appunto non fondata. id=" + id));
        found.setCanceled(true);
        storeappunto.remove(found);
        //store.delete(id, Company.class);
        
        return Response.status(Response.Status.OK)
                .build();
    }
   
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati dell'appunto")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Appunto aggirnato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito"),
        @APIResponse(responseCode = "500", description = "Errore interno del server")  
    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Appunto update(@PathParam("id") Long id, @Valid Appunto entity) {
        Appunto found = storeappunto.find(entity.getId()).orElseThrow(() -> new NotFoundException("appunto non trovato. id=" + entity.getId().toString()));
        //entity.setId(id);
        return storeappunto.update(entity);
    }
   
    /*
    @PUT
@Path("{id}")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@Operation(description = "Aggiorna i dati dell'appunto")
@APIResponses({
    @APIResponse(responseCode = "200", description = "Appunto aggiornato con successo"),
    @APIResponse(responseCode = "404", description = "Appunto non trovato"),
    @APIResponse(responseCode = "500", description = "Errore interno del server")
})
@PermitAll
public Appunto update(@PathParam("id") Long id, @Valid Appunto entity) {
    // Assicurati che l'ID nel payload corrisponda a quello passato nel path
    if (!id.equals(entity.getId())) {
        throw new BadRequestException("L'ID nel payload non corrisponde all'ID nel path.");
    }
    /*
    // Trova l'appunto
    Appunto found = storeappunto.find(id).orElseThrow(() -> {
        throw new NotFoundException("Appunto non trovato. id=" + id);
    });

    // Aggiornare il record dell'appunto
    return storeappunto.update(entity);

*/
}
       


