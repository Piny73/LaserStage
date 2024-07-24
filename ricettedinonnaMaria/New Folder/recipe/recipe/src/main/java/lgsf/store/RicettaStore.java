/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import lgsf.entity.Ricetta;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class RicettaStore extends BaseStore<Ricetta>  {
    
    public List<Ricetta> all() {

        return em.createQuery("select e from Ricetta e where e.canceled = false",Ricetta.class)
                .getResultList();

    }

     public Optional<Ricetta> find(Long id){
        
        Ricetta found = em.find(Ricetta.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Ricetta> findRicettabyNome(String nome) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Ricetta e where e.nome = :nome and e.canceled = false", Ricetta.class)
                    .setParameter("nome", nome)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
}

