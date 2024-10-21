package ts.boundary;

import ts.boundary.mapping.TimeSheetDTO;
import ts.entity.TimeSheet;
import ts.entity.User;
import ts.store.ActivityStore;
import ts.store.TimeSheetStore;
import ts.store.UserStore;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.core.Context;
import javax.ws.rs.container.ResourceContext;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.NotFoundException;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("timesheet")
@Tag(name = "TimeSheet Management", description = "Gestione dei fogli presenze")
@PermitAll
public class TimeSheetResources {

    @Inject
    private UserStore storeUser;

    @Inject
    private ActivityStore storeActivity;

    @Inject
    private TimeSheetStore storeTimeSheet;

    @Context
    ResourceContext resourceContext;

    @Context
    UriInfo uriInfo;

    @GET
    @Path("{userId}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Restituisce l'elenco dei TimeSheet di un Utente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Elenco ritornato con successo"),
        @APIResponse(responseCode = "404", description = "Utente non trovato")
    })
    public List<TimeSheetDTO> getAllTimeSheets(@PathParam("userId") Long userId) {
        User user = storeUser.find(userId).orElseThrow(() -> new NotFoundException("Utente non trovato. ID=" + userId));

        List<TimeSheetDTO> timeSheetList = new ArrayList<>();
        storeTimeSheet.all(userId).forEach(e -> {
            TimeSheetDTO timeSheetDTO = new TimeSheetDTO();
            timeSheetDTO.id = e.getId();
            timeSheetDTO.activityid = e.getActivity().getId();
            timeSheetDTO.userid = e.getUser().getId();
            timeSheetDTO.dtstart = e.getDtstart();
            timeSheetDTO.dtend = e.getDtend();
            timeSheetDTO.detail = e.getDetail();
            timeSheetDTO.hoursPerDay = e.getHoursPerDay();  // Usa la mappa di tipo String
            timeSheetList.add(timeSheetDTO);
        });

        return timeSheetList;
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Crea un nuovo TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Timesheet creato con successo"),
        @APIResponse(responseCode = "404", description = "Creazione fallita")
    })
    public Response createTimeSheet(@Valid TimeSheetDTO entity) {
        TimeSheet timeSheet = new TimeSheet();
        
        timeSheet.setActivity(storeActivity.find(entity.activityid)
            .orElseThrow(() -> new NotFoundException("Attività non trovata: " + entity.activityid)));
        timeSheet.setUser(storeUser.find(entity.userid)
            .orElseThrow(() -> new NotFoundException("Utente non trovato: " + entity.userid)));
        timeSheet.setDetail(entity.detail);
        timeSheet.setDtstart(entity.dtstart);
        timeSheet.setDtend(entity.dtend);
        timeSheet.setHoursPerDay(entity.hoursPerDay);  // Usa la mappa di tipo String

        storeTimeSheet.save(timeSheet);

        entity.id = timeSheet.getId();
        return Response.status(Response.Status.CREATED).entity(entity).build();
    }

    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna un TimeSheet esistente")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Timesheet aggiornato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento fallito")
    })
    public Response updateTimeSheet(@PathParam("id") Long id, @Valid TimeSheetDTO entity) {
        TimeSheet found = storeTimeSheet.find(id)
            .orElseThrow(() -> new NotFoundException("TimeSheet non trovato: " + id));

        found.setUser(storeUser.find(entity.userid)
            .orElseThrow(() -> new NotFoundException("Utente non trovato: " + entity.userid)));
        found.setDetail(entity.detail);
        found.setDtstart(entity.dtstart);
        found.setDtend(entity.dtend);
        found.setHoursPerDay(entity.hoursPerDay);  // Usa la mappa di tipo String

        storeTimeSheet.update(found);
        return Response.status(Response.Status.OK).entity(entity).build();
    }

    @DELETE
    @Path("{id}")
    @Operation(description = "Cancella un TimeSheet tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Timesheet cancellato con successo"),
        @APIResponse(responseCode = "404", description = "Eliminazione fallita")
    })
    public Response deleteTimeSheet(@PathParam("id") Long id) {
        TimeSheet found = storeTimeSheet.find(id)
            .orElseThrow(() -> new NotFoundException("TimeSheet non trovato. ID=" + id));

        storeTimeSheet.remove(found);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
