package org.devbage.core.repository;

import javax.enterprise.context.ApplicationScoped;

import org.devbage.core.model.Contact;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class ContactRepository implements PanacheRepository<Contact> {

}