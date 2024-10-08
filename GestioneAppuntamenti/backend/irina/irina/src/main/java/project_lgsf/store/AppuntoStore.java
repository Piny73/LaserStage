/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import project_lgsf.entity.Appunto;

import javax.persistence.PersistenceContext;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class AppuntoStore extends BaseStore<Appunto> {

    @PersistenceContext(unitName = "pu")
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }

    public List<Appunto> all() {
        return em.createQuery("select e from Appunto e where e.canceled = false", Appunto.class)
                .getResultList();
    }

    public Optional<Appunto> find(Long id) {
        Appunto found = em.find(Appunto.class, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }

    public Optional<Appunto> findAppuntobyTarga(String targa) {
        try {
            return Optional.of(
                    em.createQuery("select e from Appunto e where e.vettura.targa = :targa and e.canceled = false", Appunto.class)
                    .setParameter("targa", targa)
                    .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public Optional<Appunto> findAppuntobyCliente(String cliente) {
        try {
            return Optional.of(
                    em.createQuery("select e from Appunto e where e.cliente.nome = :cliente and e.canceled = false", Appunto.class)
                    .setParameter("cliente", cliente)
                    .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public Appunto save(Appunto entity) {
        em.persist(entity);
        return entity;
    }

    public Appunto update(Appunto entity) {
        return em.merge(entity);
    }


}
