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
    private UserStore userStore;

    @Inject
    private ActivityStore activityStore;
    
    @Inject
    private TimeSheetStore timeSheetStore;

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
    public List<TimeSheetDTO> all(@PathParam("id") Long id, 
                                   @DefaultValue("1") @QueryParam("page") int page, 
                                   @DefaultValue("10") @QueryParam("size") int size) {
        User foundUser = userStore.find(id).orElseThrow(() -> new NotFoundException("User not found. id=" + id));
        
        List<TimeSheetDTO> timeSheetList = new ArrayList<>();
        
        timeSheetStore.all(id).forEach(e -> {
            TimeSheetDTO timeSheetDTO = new TimeSheetDTO();
            timeSheetDTO.id = e.getId();
            timeSheetDTO.activityid = e.getActivity().getId();
            timeSheetDTO.userid = e.getUser().getId();
            timeSheetDTO.dtstart = e.getDtstart();
            timeSheetDTO.dtend = e.getDtend();
            timeSheetDTO.detail = e.getDetail();
            
            timeSheetList.add(timeSheetDTO);
        });
        
        return timeSheetList;
    }
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Crea un nuovo TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Successo nella creazione"),
        @APIResponse(responseCode = "404", description = "Fallimento nella creazione")
    })
    public Response createTimeSheet(@Valid TimeSheetDTO entity) {
        TimeSheet timeSheet = new TimeSheet();
        timeSheet.setActivity(activityStore.find(entity.activityid)
            .orElseThrow(() -> new NotFoundException("Activity not found. id=" + entity.activityid)));
        timeSheet.setUser(userStore.find(entity.userid)
            .orElseThrow(() -> new NotFoundException("User not found. id=" + entity.userid)));
        timeSheet.setDetail(entity.detail);
        timeSheet.setDtstart(entity.dtstart);
        timeSheet.setDtend(entity.dtend);
        
        timeSheet = timeSheetStore.save(timeSheet);
        entity.id = timeSheet.getId();
        
        return Response.status(Response.Status.CREATED)
                .entity(entity)
                .build();
    }
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Cancella il TimeSheet tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Successo nella cancellazione"),
        @APIResponse(responseCode = "404", description = "Fallimento nella cancellazione")
    })
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTimeSheet(@PathParam("id") Long id) {
        TimeSheet foundTimeSheet = timeSheetStore.find(id)
            .orElseThrow(() -> new NotFoundException("TimeSheet not found. id=" + id));
        foundTimeSheet.setCanceled(true);
        timeSheetStore.remove(foundTimeSheet);
        
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Aggiorna il TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Aggiornamento avvenuto con successo"),
        @APIResponse(responseCode = "404", description = "Fallimento nell'aggiornamento")
    })
    public Response updateTimeSheet(@Valid TimeSheetDTO entity) {
        TimeSheet foundTimeSheet = timeSheetStore.find(entity.id)
            .orElseThrow(() -> new NotFoundException("TimeSheet not found. id=" + entity.id));
        
        foundTimeSheet.setUser(userStore.find(entity.userid)
            .orElseThrow(() -> new NotFoundException("User not found. id=" + entity.userid)));
        foundTimeSheet.setDtstart(entity.dtstart);
        foundTimeSheet.setDtend(entity.dtend);
        foundTimeSheet.setDetail(entity.detail);
        
        timeSheetStore.update(foundTimeSheet);
        
        return Response.status(Response.Status.OK)
                .entity(entity)
                .build();
    }
}
