package org.devbage.core.resource;

import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.devbage.core.model.Contact;
import org.devbage.core.repository.ContactRepository;
import org.eclipse.microprofile.openapi.annotations.parameters.RequestBody;

@Path("/api")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ContactResource {

    @Inject
    private ContactRepository contactRepository;

    @POST
    @Transactional
    public Response create(@RequestBody final Contact contact) {
        contactRepository.persist(contact);
        return Response.ok(contact).build();
    }

    @GET
    @Transactional
    public Response findAll(){
        List<Contact> contacts = contactRepository.findAll().list();
        return Response.ok(contacts).build();
    }

    @GET
    @Path("/{id}")
    @Transactional
    public Response findById(@PathParam("id") final Long id) {
        final Optional<Contact> contact = contactRepository.findByIdOptional(id); 
        return contact.map(Response::ok).orElseGet(() -> Response.noContent()).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") final Long id) {
        Contact contact = contactRepository.findById(id);
        contactRepository.delete(contact);
        return Response.ok().build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") final Long id, @RequestBody final Contact contact) {
        Contact contactDB = contactRepository.findById(id);
        contactDB.setId(contact.getId());
        contactDB.setName(contact.getName());
        contactDB.setPhone(contact.getPhone());
        
        return Response.ok(contactDB).build();
    }


}