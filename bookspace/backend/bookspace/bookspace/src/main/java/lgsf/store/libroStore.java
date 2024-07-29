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
import lgsf.entity.libro;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class libroStore extends BaseStore<libro> {

    public List<libro> all() {

        return em.createQuery("select e from libro e where e.canceled = false", libro.class)
                .getResultList();

    }

    public Optional<libro> find(Long id) {

        libro found = em.find(libro.class, id);

        return found == null ? Optional.empty() : Optional.of(found);

    }

    public Optional<libro> findbyTitolo(String titolo) {
        try {

            return Optional.of(
                    em.createQuery("select e from libro e where e.titolo = :titolo and e.canceled = false", libro.class)
                            .setParameter("titolo", titolo)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }
    }

    public Optional<libro> findbyAutore(String autore) {
        try {

            return Optional.of(
                    em.createQuery("select e from libro e where e.autore.nome = :autore and e.canceled = false", libro.class)
                            .setParameter("autore", autore)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }

    }

}
