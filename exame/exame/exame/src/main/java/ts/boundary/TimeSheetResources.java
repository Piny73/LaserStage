/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
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
            ts.dtstart = e.getDtstart();
            ts.dtend = e.getDtend();
            ts.detail = e.getDetail();
            
            tsList.add(ts);
        
        });
        
        return tsList;
    }

       
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "New TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "Success"),
        @APIResponse(responseCode = "404", description = "Failed")
    })
    @PermitAll
    public Response createTimeSheet(@Valid TimeSheetDTO entity) {
        
        TimeSheet ts = new TimeSheet();
        ts.setActivity(storeactivity.find(entity.activityid).orElseThrow(() -> new NotFoundException("activity not founded. id=" + entity.activityid)));
        ts.setUser(storeuser.find(entity.userid).orElseThrow(() -> new NotFoundException("user not found. id=" + entity.userid)));
        ts.setDetail(entity.detail);
        ts.setDtstart(entity.dtstart);
        ts.setDtend(entity.dtend);
        
        ts = storets.save(ts);
        entity.id = ts.getId();
        return Response.status(Response.Status.CREATED)
                .entity(entity)
                .build();
    }
    
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Cancel TimeSheed tramite l'ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Failed")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response deleteTimeSheet(@PathParam("id") Long id) {
        TimeSheet found = storets.find(id).orElseThrow(() -> new NotFoundException("TimeSheet non trovato. id=" + id));
       found.setCanceled(true);
        storets.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Update TimeSheet")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Utente aggirnato con successo"),
        @APIResponse(responseCode = "404", description = "Aggiornamento falito")
            
    })
    public Response updateTimeSheet(@Valid TimeSheetDTO entity) {
        TimeSheet found = storets.find(entity.id).orElseThrow(() -> new NotFoundException("TimeSheet not founded. id=" + entity.id));
        found.setUser(storeuser.find(entity.userid).orElseThrow(() -> new NotFoundException("user not found. id=" + entity.userid)));
        found.setDtstart(entity.dtstart);
        found.setDtend(entity.dtend);
        found.setDetail(entity.detail);
        
        return Response.status(Response.Status.OK)
                .build();
    }
    
}