/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package project_lgsf.store;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 *
 * @author andrelima
 * @param <TEntity>
 */


@Transactional(Transactional.TxType.REQUIRED)
public class BaseStore<TEntity>{

    @PersistenceContext
    EntityManager em;


    public TEntity save(TEntity obj) {
       
        return em.merge(obj);
        
    }

   
    public TEntity update(TEntity obj) {

        return em.merge(obj);
    }


    public void remove(TEntity obj) {

        em.remove(obj);
        
    }

}
