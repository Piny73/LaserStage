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

    // Recupera tutti i TimeSheet per un dato utente
    public List<TimeSheet> all(Long userId) {
        return getEm().createQuery("select e from TimeSheet e where e.user.id = :id and e.canceled = false", TimeSheet.class)
                .setParameter("id", userId)
                .getResultList();
    }

    // Trova un TimeSheet per ID
    public Optional<TimeSheet> find(Long id) {
        TimeSheet found = getEm().find(TimeSheet.class, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }

    // Crea un nuovo TimeSheet
    public TimeSheet create(TimeSheet timeSheet) {
        getEm().persist(timeSheet);
        return timeSheet;
    }

    // Aggiorna un TimeSheet esistente
    public TimeSheet update(TimeSheet timeSheet) {
        return getEm().merge(timeSheet);
    }

    // Cancella un TimeSheet
    public void delete(Long id) {
        TimeSheet timeSheet = getEm().find(TimeSheet.class, id);
        if (timeSheet != null) {
            getEm().remove(timeSheet);
        }
    }
}
