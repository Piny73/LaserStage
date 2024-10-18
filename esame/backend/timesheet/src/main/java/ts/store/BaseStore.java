/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.store;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;


@Transactional(Transactional.TxType.REQUIRED)
public class BaseStore<TEntity>{

    @PersistenceContext(unitName = "pu")
    private EntityManager em;

    public EntityManager getEm() {
        return em;
    }


    public TEntity save(TEntity obj) {
        try {
            return em.merge(obj);
        } catch (Exception e) {
            return null;
        }
    }

   
    public TEntity update(TEntity obj) {
        try {
            return em.merge(obj);
        } catch (Exception e) {
            return null;
        }
    }


    public boolean remove(TEntity obj) {
        try {
            update(obj);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    
    public void delete(Long id, Class<TEntity> entityClass) {
       
        TEntity entity = em.find(entityClass, id);
        if (entity != null) {
            em.remove(entity);
        } else {
            throw new EntityNotFoundException("Entity not found with ID: " + id);
        }
    }
    
   
}
