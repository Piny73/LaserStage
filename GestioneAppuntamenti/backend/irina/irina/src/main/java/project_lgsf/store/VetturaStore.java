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
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import project_lgsf.entity.User;
import project_lgsf.entity.Vettura;

/**
 *
 * @author Stage
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class VetturaStore extends BaseStore<Vettura> {

    public List<Vettura> all() {

        return em.createQuery("select e from Vettura e where e.canceled = false", Vettura.class)
                .getResultList();

    }
 @PersistenceContext(unitName = "pu")
    private EntityManager em;

    @Override
    public EntityManager getEm() {
        return em;
    }
      public Optional<Vettura> find(Long id){
        
        Vettura found = em.find(Vettura.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
    /*
     public Optional<Vettura> find(Long id_vettura){
        
       Vettura found = em.find(Vettura.class, id_vettura);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     */
 /*
         public Optional<Vettura> findVetturabyVettura(String vettura) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Vettura e where e.targa :vettura and e.annoProduzione = false", Vettura.class)
                    .setParameter("vettura", vettura)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
     */
    public Optional<Vettura> findVetturayCliente(String cliente) {
        try {

            return Optional.of(
                    em.createQuery("select e from Cliente e where e.nome = :cliente and e.cognome false", Vettura.class)
                            .setParameter("cliente", cliente)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }

    }

    public Optional<Vettura> findVetturabyAppunto(String appunto) {
        try {

            return Optional.of(
                    em.createQuery("select e from Appunto e where e.cliente = :appunto and e.vettura.targa = false", Vettura.class)
                            .setParameter("appunto", appunto)
                            .getSingleResult()
            );

        } catch (NoResultException ex) {

            return Optional.empty();

        }

    }

}
