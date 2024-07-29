/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import project_lgsf.entity.Vettura;

/**
 *
 * @author Stage
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class VetturaStore extends BaseStore<Vettura>  {
    
    public List<Vettura> all() {

        return em.createQuery("select e from User e where e.canceled = false",Vettura.class)
                .getResultList();

    }

     public Optional<Vettura> find(Long id){
        
       Vettura found = em.find(Vettura.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Vettura> findUserbyVettura(String login) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Vettura e where e.annoProduzione = :login and e.canceled = false", Vettura.class)
                    .setParameter("login", login)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
         
       public Optional<Vettura> findUserbyCliente(String login) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Cliente e where e.createdby = :login and e.canceled = false", Vettura.class)
                    .setParameter("login", login)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
    
         public Optional<Vettura> findUserbyAppunto(String login) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Appunto e where e.cliente = :login and e.canceled = false", Vettura.class)
                    .setParameter("login", login)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
       
}

