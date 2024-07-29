/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.store;

import lgsf.boundary.mapping.Credential;
import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import lgsf.security.SecurityEncoding;
import lgsf.entity.User;
import lgsf.entity.autore;
import lgsf.entity.libro;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class autoreStore extends BaseStore<autore> {

    public List<autore> all() {

        return em.createQuery("select e from autore e where e.canceled = false", autore.class)
                .getResultList();

    }

    public Optional<autore> find(Long id) {

        autore found = em.find(autore.class, id);

        return found == null ? Optional.empty() : Optional.of(found);

    }

    public Optional<autore> findbyName (String name) {
        try {

            return Optional.of(
                    em.createQuery("select e from autore e where e.nome = :name and e.canceled = false", autore.class)
                            .setParameter("name", name)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }
    }

}
