/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.store;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
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
 @PersistenceContext(unitName = "pu")
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }
     public Optional<Cliente> find(Long id){
        
        Cliente found = em.find(Cliente.class, id);
       
        return found == null ? Optional.empty() : Optional.of(found);
        
    }
     
     
         public Optional<Cliente> findClientebyNome(String nome) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Cliente e where e.nome = :nome and e.canceled = false", Cliente.class)
                    .setParameter("nome", nome)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
         
    
         /*public Optional<Cliente> findClientebyVettura(String vettura) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Cliente e where e.targa = :vettura and e.disponibile = false", Cliente.class)
                    .setParameter("vettura", vettura)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }*/
       
        public Cliente findClientebyVettura(String vettura) {
        try{
            
             return  (Cliente) em.createNativeQuery(""
                    + "select c.id, "
                    + "c.canceled, "
                    + "c.created, "
                    + "c.dateCanceled, "
                    + "c.version, "
                    + "c.cognome, "
                    + "c.email, "
                    + "c.indirizzo, "
                    + "c.nome, "
                    + "c.telefono, "
                    + "c.canceledby, "
                    + "c.createdby\n" +
                    " FROM \n" +
                    "	cliente c \n" +
                    "    inner join vettura v on v.cliente_id = c.id\n" +
                    " where \n" +
                    "	c.canceled = false\n" +
                    "and v.targa = :vettura", Cliente.class)
                    .setParameter("vettura", vettura)
                    .getSingleResult();
                   
            } catch (NoResultException ex) {
           
                return null;

            }
            
        }
         
         
        public Optional<Cliente> findClientebyAppunto(String appunto) {
        try{
            
            return Optional.of(
                    em.createQuery("select e from Appunto e where e.created :cliente and e.stato = false", Cliente.class)
                    .setParameter("appunto", appunto)
                    .getSingleResult()
                    );
            
        } catch (NoResultException ex) {
            
            return Optional.empty();                    
            
        }
            
    }
     
}

