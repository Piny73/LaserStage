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
import lgsf.entity.ImmaginiRicetta;
import lgsf.store.BaseStore;
import lgsf.entity.User;



/**
 * @author piny73
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class ImmaginiRicettaStore extends BaseStore<ImmaginiRicetta>  {
    
    public List<ImmaginiRicettaStore> all() {

        return em.createQuery("select e from ImmaginiRicettaStore e where e.canceled = false",ImmaginiRicettaStore.class)
                .getResultList();

    }

     public Optional<ImmaginiRicettaStore> find(Long id){
        
        ImmaginiRicettaStore found = em.find(ImmaginiRicettaStore.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<ImmaginiRicetta> findImmaginiRicettabyNome(String nome) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from ImmaginiRicetta e where e.nome = :nome and e.canceled = false", ImmaginiRicetta.class)
                    .setParameter("nome", nome)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }

    public void remove(ImmaginiRicettaStore found) {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
}

