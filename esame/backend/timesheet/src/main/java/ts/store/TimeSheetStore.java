/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import ts.entity.TimeSheet;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class TimeSheetStore extends BaseStore<TimeSheet> {

    public List<TimeSheet> all(Long id) {

        return getEm().createQuery("select e from TimeSheet e where e.user.id = :id and = false", TimeSheet.class)
                .setParameter("id", id)
                .getResultList();

    }

    public Optional<TimeSheet> find(Long id) {

        TimeSheet found = getEm().find(TimeSheet.class, id);

        return found == null ? Optional.empty() : Optional.of(found);

    }
}
