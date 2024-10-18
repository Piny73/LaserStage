package ts.boundary;

import java.util.ArrayList;
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
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import ts.boundary.mapping.ActivityDTO;
import ts.entity.User;
import ts.boundary.mapping.TimeSheetDTO;
import ts.entity.Activity;
import ts.entity.TimeSheet;
import ts.store.ActivityStore;
import ts.store.TimeSheetStore;
import ts.store.UserStore;

@Path("timesheet")
@Tag(name = "TimeSheet Management", description = "TimeSheet Business Logic")
@PermitAll
public class TimeSheetResources {

    @Inject
    private UserStore storeuser;

    @Inject
    private ActivityStore storeactivity;

    @Inject
    private TimeSheetStore storets;

    @Context
    ResourceContext rc;

    @Context
    UriInfo uriInfo;

    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'elenco di TimeSheet of User")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Elenco non trovato")
    })
    @PermitAll
    public List<TimeSheetDTO> all(@PathParam("id") Long id, @DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        User found = storeuser.find(id).orElseThrow(() -> new NotFoundException("user not found. id=" + id));

        List<TimeSheetDTO> tsList = new ArrayList<>();

        storets.all(id).forEach(e -> {
            TimeSheetDTO ts = new TimeSheetDTO();
            ts.id = e.getId();
            ts.activityid = e.getActivity().getId();
            ts.userid = e.getUser().getId();
            ts.dtstart = e.getDtstart(); // Assicurati che e.getDtstart() restituisca ZonedDateTime
            ts.dtend = e.getDtend(); // Assicurati che e.getDtend() restituisca ZonedDateTime
            ts.detail = e.getDetail();
            tsList.add(ts);
        });

        return tsList;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Crea un nuovo TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "TimeSheet creato con successo"),
        @APIResponse(responseCode = "404", description = "Operazione fallita")
    })
    @PermitAll
    public Response createTimeSheet(@Valid TimeSheetDTO entity) {
        TimeSheet ts = new TimeSheet();
        ts.setActivity(storeactivity.find(entity.activityid).orElseThrow(() -> new NotFoundException("activity not found. id=" + entity.activityid)));
        ts.setUser(storeuser.find(entity.userid).orElseThrow(() -> new NotFoundException("user not found. id=" + entity.userid)));
        ts.setDetail(entity.detail);
        ts.setDtstart(entity.dtstart); // Assicurati che dtstart sia di tipo ZonedDateTime
        ts.setDtend(entity.dtend); // Assicurati che dtend sia di tipo ZonedDateTime

        ts = storets.save(ts);
        entity.id = ts.getId();
        return Response.status(Response.Status.CREATED)
                .entity(entity)
                .build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Annulla TimeSheet tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "TimeSheet cancellato con successo"),
        @APIResponse(responseCode = "404", description = "TimeSheet non trovato")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response deleteTimeSheet(@PathParam("id") Long id) {
        TimeSheet found = storets.find(id).orElseThrow(() -> new NotFoundException("TimeSheet non trovato. id=" + id));
        found.setCanceled(true); // Imposta il flag "canceled" a true
        storets.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "TimeSheet aggiornato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento fallito")
    })
    @PermitAll
    public Response updateTimeSheet(@PathParam("id") Long id, @Valid TimeSheetDTO entity) {
        TimeSheet found = storets.find(id).orElseThrow(() -> new NotFoundException("TimeSheet non trovato. id=" + id));

        // Aggiorna i dettagli del TimeSheet
        found.setUser(storeuser.find(entity.userid).orElseThrow(() -> new NotFoundException("user not found. id=" + entity.userid)));
        found.setActivity(storeactivity.find(entity.activityid).orElseThrow(() -> new NotFoundException("activity not found. id=" + entity.activityid)));
        found.setDetail(entity.detail);
        found.setDtstart(entity.dtstart); // Assicurati che dtstart sia di tipo ZonedDateTime
        found.setDtend(entity.dtend); // Assicurati che dtend sia di tipo ZonedDateTime

        storets.update(found);
        
        // Restituisci il TimeSheet aggiornato
        return Response.ok(entity).build();
    }
}
