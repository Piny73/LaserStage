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
import lgsf.entity.Conoscente;
import lgsf.security.SecurityEncoding;
import lgsf.entity.User;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class ConoscenteStore extends BaseStore<Conoscente>  {
    
    public List<Conoscente> all() {

        return em.createQuery("select e from Conoscente e where e.canceled = false",Conoscente.class)
                .getResultList();

    }

     public Optional<Conoscente> find(Long id){
        
        Conoscente found = em.find(Conoscente.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Conoscente> findConoscentebyCognome(String cognome) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Conoscente e where e.cognome = :cognome and e.canceled = false", Conoscente.class)
                    .setParameter("cognome", cognome)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
}
