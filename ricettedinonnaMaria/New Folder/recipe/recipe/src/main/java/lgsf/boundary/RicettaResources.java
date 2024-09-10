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
import lgsf.entity.Ricetta;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import lgsf.security.JWTManager;
import lgsf.store.RicettaStore;

/**
 * @author piny73
 */

@Path("ricetta")
@Tag(name = "Gestione ricetta", description = "Permette di gestire le ricette di lericettedinonnamaria")
@DenyAll
public class RicettaResources {

    @Inject
    private RicettaStore storericetta;

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
    @Operation(description = "Restituisce l'elenco delle ricette")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public List<Ricetta> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storericetta.all();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce la ricetta identificata dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Ricetta ritornata con successo"),
        @APIResponse(responseCode = "404", description = "Ricetta non trovata")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public Ricetta find(@PathParam("id") Long id) {
        return storericetta.find(id).orElseThrow(() -> new NotFoundException("Ricetta non trovata. id=" + id));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di una nuova ricetta")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuovo ricetta creata con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di una ricetta fallita")
    })
    @PermitAll
    public Response create(@Valid Ricetta entity) {

        if (storericetta.findRicettabyNome(entity.getNome()).isPresent()) {

            return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }

        Ricetta saved = storericetta.save(entity);

        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina una ricetta tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "ricetta eliminata con successo"),
        @APIResponse(responseCode = "404", description = "ricetta non trovata")
    })
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed("Admin")
    @PermitAll
    public Response deleteRicetta(@PathParam("id") Long id) {
        Ricetta found = storericetta.find(id).orElseThrow(() -> new NotFoundException("ricetta non trovata. id=" + id));
        found.setCanceled(true);
        storericetta.remove(found);
        return Response.status(Response.Status.OK).build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati della ricetta")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Ricetta aggiornata con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")

    })
    //@RolesAllowed("Admin")
    @PermitAll
    public Ricetta update(@PathParam("id") Long id, @Valid Ricetta entity) {
        Ricetta found = storericetta.find(id).orElseThrow(() -> new NotFoundException("Ricetta non trovata. id=" + id));
        entity.setId(id);
        return storericetta.update(entity);
    }

}