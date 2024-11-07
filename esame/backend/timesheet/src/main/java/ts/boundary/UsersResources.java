package ts.boundary;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.NotAuthorizedException;
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
import ts.entity.User;
import ts.boundary.mapping.Credential;
import ts.boundary.mapping.UserDTO;
import ts.store.UserStore;

@Path("users")
@Tag(name = "User Management", description = "Allows managing bkmapp users")
@PermitAll
public class UsersResources {
    
    @Inject
    private UserStore storeuser;
    
    @Context
    ResourceContext rc;
    
    @Context
    UriInfo uriInfo;
        
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Returns the list of all users")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "List returned successfully"),
        @APIResponse(responseCode = "404", description = "List not found")
    })
    public List<UserDTO> all() {
        List<UserDTO> usList = new ArrayList<>();
        storeuser.all().forEach(e -> {
           UserDTO us = new UserDTO();
            us.id = e.getId();
            us.name = e.getName();
            us.email = e.getEmail();
            us.pwd = ""; 
           
           usList.add(us); 
        });
        return usList;
    }
         
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Allows registering a new user")
    @APIResponses({
        @APIResponse(responseCode = "201", description = "New user created successfully"),
        @APIResponse(responseCode = "404", description = "User creation failed")
    })
    @PermitAll
    public Response create(@Valid User entity) {
        
        if(storeuser.findUserbyLogin(entity.getEmail()).isPresent()){
            return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }
        
        if(entity.getPwd().length() < 4){
            return Response.status(Response.Status.PRECONDITION_FAILED).build();
        }
        
        User saved = storeuser.save(entity);
        
        return Response.status(Response.Status.CREATED)
                .entity(saved)
                .build();
    }
    
    @POST
    @Path("login")
    @Operation(description = "Allows logging in and returns a valid token")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Login successful"),
        @APIResponse(responseCode = "404", description = "Login failed")
    })
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public UserDTO login (@Valid Credential credential){
        User u = storeuser.login(credential)
                .orElseThrow(() -> new NotAuthorizedException("Unauthorized user",  
                                                                       Response.status(Response.Status.UNAUTHORIZED).build()));
        
        UserDTO us = new UserDTO();
        us.id = u.getId();
        us.name = u.getName();
        us.email = u.getEmail();
        us.pwd = ""; 
       
        
        return us;
    }
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Deletes a User resource via ID")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "User deleted successfully"),
        @APIResponse(responseCode = "404", description = "User not found")
    })
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response delete(@PathParam("id") Long id) {
        User found = storeuser.find(id)
                .orElseThrow(() -> new NotFoundException("User not found. ID=" + id));
        storeuser.remove(found);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Updates user data")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "User updated successfully"),
        @APIResponse(responseCode = "404", description = "Update failed")
    })
    @PermitAll
    public User update(@Valid User entity) {
        User found = storeuser.find(entity.getId())
                .orElseThrow(() -> new NotFoundException("User not found. ID=" + entity.getId()));
        return storeuser.update(entity);
    }
}

