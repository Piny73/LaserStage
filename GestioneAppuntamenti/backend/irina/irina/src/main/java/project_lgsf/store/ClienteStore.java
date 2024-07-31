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
import project_lgsf.entity.Cliente;

/**
 *
 * @author Stage
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class ClienteStore extends BaseStore<Cliente>  {
    
    public List<Cliente> all() {

        return em.createQuery("select e from Cliente e where e.canceled = false",Cliente.class)
                .getResultList();

    }

     public Optional<Cliente> find(Long id){
        
        Cliente found = em.find(Cliente.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Cliente> findUserbyCliente(String cliente) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Cliente e where e.email = :login and e.canceled = false", Cliente.class)
                    .setParameter("cliente", cliente)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
         
    
         public Optional<Cliente> findUserbyVettura(String vettura) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Vettura e where e.targa = :vettura and e.canceled = false", Cliente.class)
                    .setParameter("vettura", vettura)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
         
        public Optional<Cliente> findUserbyAppunto(String appunto) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Appunto e where e.created :login and e.canceled = false", Cliente.class)
                    .setParameter("appunto", appunto)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
     
}

