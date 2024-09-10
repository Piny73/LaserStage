/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.boundary;

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
import lgsf.entity.Ingrediente;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import lgsf.security.JWTManager;
import lgsf.store.IngredienteStore;

/**
 * @author piny73
 */

@Path("ingrediente")
@Tag(name = "Gestione Ingrediente", description = "Permette di gestire gli ingredienti di lericettedinonnamaria")
@DenyAll
public class IngredienteResources {

    @Inject
    private IngredienteStore storeingrediente;

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
    @Operation(description = "Restituisce l'elenco degli ingredienti")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public List<Ingrediente> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storeingrediente.all();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'ingrediente identificato dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Ricetta ritornata con successo"),
        @APIResponse(responseCode = "404", description = "Ricetta non trovata")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public Ingrediente find(@PathParam("id") Long id) {
        return storeingrediente.find(id).orElseThrow(() -> new NotFoundException("ingrediente non trovato. id=" + id));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di un nuovo ingrediente")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo ingrediente creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di un ingrediente fallito")
    })
    @PermitAll
    public Response create(@Valid Ingrediente entity) {

        if (storeingrediente.findIngredientebyNome(entity.getNome()).isPresent()) {

            return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }

        Ingrediente saved = storeingrediente.save(entity);

        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina un ingrediente tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Ingrediente eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Ingrediente non trovato")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("Admin")
    public Response delete(@PathParam("id") Long id) {
        Ingrediente found = storeingrediente.find(id).orElseThrow(() -> new NotFoundException("ingrediente non trovato. id=" + id));
        found.setCanceled(true);
        storeingrediente.remove(found);
        return Response.status(Response.Status.OK).build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati dell'ingrediente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Ingrediente aggiornato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")

    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Ingrediente update(@PathParam("id") Long id, @Valid Ingrediente entity) {
        Ingrediente found = storeingrediente.find(id).orElseThrow(() -> new NotFoundException("Ingrediente non trovato. id=" + id));
        entity.setId(id);
        return storeingrediente.update(entity);
    }

}
