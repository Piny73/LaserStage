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
import lgsf.entity.Ingrediente;

/**
 *
 * @author andrelima
 */
@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class IngredienteStore extends BaseStore<Ingrediente>  {
    
    public List<Ingrediente> all() {

        return em.createQuery("select e from Ingrediente e where e.canceled = false",Ingrediente.class)
                .getResultList();

    }

     public Optional<Ingrediente> find(Long id){
        
        Ingrediente found = em.find(Ingrediente.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Ingrediente> findIngredientebyNome(String nome) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Ingrediente e where e.nome = : nome e.canceled = false", Ingrediente.class)
                    .setParameter("nome", nome)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
    
}

