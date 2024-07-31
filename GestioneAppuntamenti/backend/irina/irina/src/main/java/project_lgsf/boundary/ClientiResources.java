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
import project_lgsf.entity.Cliente;
import project_lgsf.security.JWTManager;
import project_lgsf.store.ClienteStore;
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

@Path("clienti")
@Tag(name = "Gestione Clienti", description = "Permette di gestire i clienti di bkmapp")
@DenyAll
public class ClientiResources {
    
    @Inject
    private ClienteStore storecliente;
    
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
    @Operation(description = "Restituisce l'elenco di tutti i clienti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin","Cliente"})
    @PermitAll
    public List<Cliente> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storecliente.all();
    }
    
    
        
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa cliente identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Cliente ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Cliente non trovato")
    })
    @RolesAllowed({"Admin","Cliente"})
    public Cliente find(@PathParam("id") Long id) {
        return storecliente.find(id).orElseThrow(() -> new NotFoundException("cliente non trovato. id=" + id));
    }
    
        
    @GET
    @Path("/clienti/{cliente}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la risorsa cliente identificata dall'Cliente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Cliente ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Cliente non trovato")
    })
    //@RolesAllowed({"Admin","User"})
    @PermitAll
    public Cliente findbycliente(@PathParam("cliente") String cliente) {
        return storecliente.findClientebyCliente(cliente).orElseThrow(() -> new NotFoundException("cliente non trovato. id=" + cliente));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di un nuovo cliente")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo cliente creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di cliente fallito")
    })
    @PermitAll
    public Response create(@Valid Cliente entity) {
        
        Cliente saved = storecliente.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
}
    
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina una risorsa Cliente tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Cliente eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Cliente non trovato")

    })
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed("Admin")
    @PermitAll
    public Response delete(@PathParam("id") Long id) {
        Cliente found = storecliente.find(id).orElseThrow(() -> new NotFoundException("cliente non trovato. id=" + id));
        storecliente.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati dell'cliente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Cliente aggiornato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Cliente update(@Valid Cliente entity) {
        Cliente found = storecliente.find(entity.getId()).orElseThrow(() -> new NotFoundException("cliente non trovato. id=" + entity.getId().toString()));
        //entity.setId(id);
        return storecliente.update(entity);
    }
   
       
}

