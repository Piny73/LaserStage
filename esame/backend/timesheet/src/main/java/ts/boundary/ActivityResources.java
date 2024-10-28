package ts.boundary;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import ts.boundary.mapping.ActivityDTO;
import ts.entity.Activity;
import ts.store.ActivityStore;
import ts.store.UserStore;

@Path("activity")
@Tag(name = "Activity Management", description = "Activity Business Logic")
@PermitAll
public class ActivityResources {
    
    @Inject
    private UserStore storeuser;

    @Inject
    private ActivityStore storeactivity;
    
    @Context
    ResourceContext rc;
    
    @Context
    UriInfo uriInfo;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'elenco di Attività")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Failed")
    })
    @PermitAll
    public List<ActivityDTO> allActivity() {
        List<ActivityDTO> acList = new ArrayList<>();
        storeactivity.all().forEach(e -> {
            ActivityDTO ac = new ActivityDTO();
            ac.id = e.getId();
            ac.description = e.getDescription();
            ac.ownerid = e.getOwner().getId();
            ac.ownerName = e.getOwner() != null ? e.getOwner().getName() : "N/A";
            ac.dtstart = e.getDtstart();
            ac.dtend = e.getDtend();
            ac.enable = e.isEnable();
            acList.add(ac);
        });
        return acList;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "New Activity")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Success"),
        @APIResponse(responseCode = "404", description = "Failed")
    })
    @PermitAll
    public Response createActivity(@Valid ActivityDTO entity) {
        Activity ac = new Activity();
        ac.setOwner(storeuser.find(entity.ownerid)
            .orElseThrow(() -> new NotFoundException("Activity not found. id=" + entity.ownerid)));
        ac.setDescription(entity.description);
        ac.setDtstart(entity.dtstart);
        ac.setDtend(entity.dtend);
        ac.setEnable(entity.enable);
        
        ac = storeactivity.save(ac);
        entity.id = ac.getId();
        return Response.status(Response.Status.CREATED)
            .entity(entity)
            .build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Cancel Activity tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente eliminato con successo"),
        @APIResponse(responseCode = "404", description = "Utente non trovato")
    })
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteActivity(@PathParam("id") Long id) {
        Activity found = storeactivity.find(id)
            .orElseThrow(() -> new NotFoundException("user non trovato. id=" + id));
        found.setCanceled(true);
        storeactivity.remove(found);
        return Response.status(Response.Status.OK)
            .build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiornamento Attività")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Attività aggiornata con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento fallito")
    })
    public Response updateActivity(@Valid ActivityDTO entity) {
        Activity found = storeactivity.find(entity.id)
            .orElseThrow(() -> new NotFoundException("Activity not found. id=" + entity.id));
        
        found.setOwner(storeuser.find(entity.ownerid)
            .orElseThrow(() -> new NotFoundException("Owner not found. id=" + entity.ownerid)));
        found.setDtstart(entity.dtstart);
        found.setDtend(entity.dtend);
        found.setDescription(entity.description);
        
        // Salva l'attività aggiornata nel database
        storeactivity.update(found);

        return Response.status(Response.Status.OK)
            .entity(entity) // Restituisci l'entità aggiornata
            .build();
    }
    
    @POST
    @Path("data")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "New Activity")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Success"),
        @APIResponse(responseCode = "404", description = "Failed")
    })
    @PermitAll
    public Response createActivityByData(@Valid ActivityDTO entity) {
        Activity ac = new Activity();
        ac.setOwner(storeuser.find(entity.ownerid)
            .orElseThrow(() -> new NotFoundException("Activity not found. id=" + entity.ownerid)));
        ac.setDescription(entity.description);
        ac.setDtstart(entity.dtstart);
        ac.setDtend(entity.dtend);
        ac.setEnable(entity.enable);
        
        ac = storeactivity.save(ac);
        entity.id = ac.getId();
        return Response.status(Response.Status.CREATED)
            .entity(entity)
            .build();
    }  
}
