/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import ts.boundary.mapping.Credential;
import ts.entity.Activity;
import ts.entity.User;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class ActivityStore extends BaseStore<Activity> {

    public List<Activity> all() {

        return getEm().createQuery("select e from Activity e where e.canceled = false", Activity.class)
                .getResultList();

    }

    public Optional<Activity> find(Long id) {

        Activity found = getEm().find(Activity.class, id);

        return found == null ? Optional.empty() : Optional.of(found);

    }
}
