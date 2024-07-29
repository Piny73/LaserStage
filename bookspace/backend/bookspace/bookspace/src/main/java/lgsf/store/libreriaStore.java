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
import lgsf.entity.libreria;
import lgsf.entity.libro;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class libreriaStore extends BaseStore<libreria> {

    public List<libreria> all() {

        return em.createQuery("select e from libreria e where e.canceled = false", libreria.class)
                .getResultList();

    }

    public Optional<libreria> find(Long id) {

        libreria found = em.find(libreria.class, id);

        return found == null ? Optional.empty() : Optional.of(found);

    }

    public Optional<libreria> findbyScaffale(String scaffale) {
        try {

            return Optional.of(
                    em.createQuery("select e from libreria e where e.scaffale = :scaffale and e.canceled = false", libreria.class)
                            .setParameter("scaffale", scaffale)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }
    }

    public Optional<libreria> findbyGenere(String genere) {
        try {

            return Optional.of(
                    em.createQuery("select e from libreria e where e.genere = :genere and e.canceled = false", libreria.class)
                            .setParameter("genere", genere)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }

    }

}
