/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package lgsf.store;


import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

/**
 *
 * @author andrelima
 * @param <TEntity>
 */

@Transactional(Transactional.TxType.REQUIRED)
public class BaseStore_1<TEntity>{

    @PersistenceContext(unitName = "pu")
    private EntityManager getEm;

    public EntityManager getEm() {
        return getEm();
    }


    public TEntity save(TEntity obj) {
        try {
            return getEm.merge(obj);
        } catch (Exception e) {
            return null;
        }
    }

   
    public TEntity update(TEntity obj) {
        try {
            return getEm.merge(obj);
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
       
        TEntity entity = getEm.find(entityClass, id);
        if (entity != null) {
            getEm.remove(entity);
        } else {
            throw new EntityNotFoundException("Entity not found with ID: " + id);
        }
    }
    
    public Optional<TEntity> baseFind(Long id, Class<TEntity> entityClass){
        TEntity found = getEm.find(entityClass, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }
    
}
