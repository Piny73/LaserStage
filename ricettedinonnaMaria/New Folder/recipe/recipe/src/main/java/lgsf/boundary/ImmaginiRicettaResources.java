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
import lgsf.entity.ImmaginiRicetta;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import lgsf.security.JWTManager;
import lgsf.store.ImmaginiRicettaStore;

@Path("immaginiricetta")
@Tag(name = "Gestione immaginiricetta", description = "Permette di gestire le immagini delle ricette di lericettedinonnamaria")
@DenyAll
public class ImmaginiRicettaResources {

    @Inject
    private ImmaginiRicettaStore storeimmaginiricetta;

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
    @Operation(description = "Restituisce l'elenco delle immagini della ricetta")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public List<ImmaginiRicettaStore> all(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return storeimmaginiricetta.all();
    }

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce le immaginiricette identificate dall'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "ImmaginiRicetta ritornate con successo"),
        @APIResponse(responseCode = "404", description = "ImmaginiRicetta non trovata")
    })
    //@RolesAllowed({"Admin"})
    @PermitAll
    public ImmaginiRicettaStore find(@PathParam("id") Long id) {
        return storeimmaginiricetta.find(id).orElseThrow(() -> new NotFoundException("ImmaginiRicetta non trovate. id=" + id));
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Permette la registrazione di una nuova immagine")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Nuova immagine creata con successo"),
        @APIResponse(responseCode = "404", description = "Creazione di una immagine fallita")
    })
    @PermitAll
    public Response create(@Valid ImmaginiRicetta entity) {

        if (storeimmaginiricetta.findImmaginiRicettabyNome(entity.getNome()).isPresent()) {

            return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }

        ImmaginiRicetta saved = storeimmaginiricetta.save(entity);

        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Elimina una immagini tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Immagine eliminata con successo"),
        @APIResponse(responseCode = "404", description = "Immagine non trovata")

    })
    @Produces(MediaType.APPLICATION_JSON)
    //@RolesAllowed("Admin")
    @PermitAll
    public Response delete(@PathParam("id") Long id) {
        ImmaginiRicettaStore found = storeimmaginiricetta.find(id).orElseThrow(() -> new NotFoundException("Ricetta non trovata. id=" + id));
        storeimmaginiricetta.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna i dati delle immaginiricetta")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Immagini aggiornate con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")

    })
    //@RolesAllowed("Admin")
    @PermitAll
    public ImmaginiRicetta update(@PathParam("id") Long id, @Valid ImmaginiRicetta entity) {
        ImmaginiRicettaStore found = storeimmaginiricetta.find(id).orElseThrow(() -> new NotFoundException("Immagine non trovata. id=" + id));
        entity.setId(id);
        return storeimmaginiricetta.update(entity);
    }

}
