/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package bs.boundary;

import bs.entity.Area;
import bs.entity.Company;
import bs.entity.Product;
import bs.entity.Strategy;
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
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;
import bs.security.JWTManager;
import bs.store.AreaStore;
import bs.store.CompanyStore;
import bs.store.ProductStore;
import bs.store.StrategyStore;
import bs.store.UserStore;
import javax.enterprise.context.RequestScoped;

/**
 *
 * @author AndreLima
 */
@Path("company")
@Tag(name = "Company Management", description = "Management Functions of Company")
@PermitAll
@RequestScoped
public class CompanyResources {
    
    @Inject
    private UserStore userstore;
    
    @Inject
    private CompanyStore store;
    
    @Inject
    private AreaStore areastore;
    
    @Inject
    private ProductStore productstore;
    
    @Inject
    private StrategyStore strategystore;
    
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
    @Operation(description = "All Companies")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public List<Company> allCompany(@DefaultValue("1") @QueryParam("page") int page, @DefaultValue("10") @QueryParam("size") int size) {
        System.out.println(token);
        return store.all();
    }
    
        
    @GET
    @Path("{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Company by Id")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Company findCompany(@PathParam("id") Long id) {
        System.out.println(token);
        return store.find(id).orElseThrow(() -> new NotFoundException("Company not found id=" + id));
    }
    
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Create new Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Response createCompany(@Valid Company entity) {
        System.out.println(token);
        Company saved = store.save(entity);
        return Response.status(Response.Status.OK)
                .entity(saved)
                .build();
    }
    
    
    @DELETE
    @Path("{id}")
    @Operation(description = "Delete Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    @Produces(MediaType.APPLICATION_JSON)
   //@RolesAllowed({"Admin","User"})
    public Response deleteCompany(@PathParam("id") Long id) {
        Company found = store.find(id).orElseThrow(() -> new NotFoundException("Company not founded. id=" + id));
        found.setCanceled(true);
        store.remove(found);
        //store.delete(id, Company.class);
        
        return Response.status(Response.Status.OK)
                .build();
    }
    
    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Update Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Response updateCompany(@Valid Company entity) {
        Company found = store.find(entity.getId()).orElseThrow(() -> new NotFoundException("Company not founded. id=" + entity.getId()));
        store.update(entity);
        return Response.status(Response.Status.OK)
                .build();
    }
   
    //------------------------- Area Management
    
    @GET
    @Path("area")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Area of a Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public List<Area> allarea(@DefaultValue("1") @QueryParam("id") Long id) {
        System.out.println(token);
        return areastore.all(id);
    }
    
    
    @POST
    @Path("area")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Create new Area of Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Response createArea(@Valid Area entity) {
        System.out.println(token);
        Area saved = areastore.save(entity);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    //----------------------------------- Product Management
    
    @GET
    @Path("product")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Product of a Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public List<Product> allProduct(@DefaultValue("1") @QueryParam("id") Long id) {
        System.out.println(token);
        return productstore.all(id);
    }
    
    
    @POST
    @Path("product")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Create new Product of Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Response createProduct(@Valid Product entity) {
        System.out.println(token);
        productstore.save(entity);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    //------------------------ Management of Strategy
    
    @GET
    @Path("strategy")
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Product of a Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public List<Strategy> allStrategy(@DefaultValue("1") @QueryParam("id") Long id) {
        System.out.println(token);
        return strategystore.all(id);
    }
    
    
    @POST
    @Path("strategy")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Operation(description = "Create new Product of Company")
    @APIResponses({
        @APIResponse(responseCode = "200", description = "Success"),
        @APIResponse(responseCode = "404", description = "Error")
    })
    //@RolesAllowed({"Admin","User"})
    public Response createStrategy(@Valid Strategy entity) {
        System.out.println(token);
        strategystore.save(entity);
        return Response.status(Response.Status.OK)
                .build();
    }
    
    //
    
}