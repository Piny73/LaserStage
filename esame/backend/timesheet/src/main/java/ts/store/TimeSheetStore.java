package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import ts.entity.TimeSheet;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class TimeSheetStore extends BaseStore<TimeSheet> {

    // Recupera tutti i TimeSheet per un dato utente, escludendo quelli cancellati
    public List<TimeSheet> all(Long id) {
        return getEm().createQuery("select e from TimeSheet e where e.user.id = :id and e.canceled = false", TimeSheet.class)
    .setParameter("id", id)
    .getResultList();

    }

    // Trova un TimeSheet per ID
    public Optional<TimeSheet> find(Long id) {
        TimeSheet found = getEm().find(TimeSheet.class, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }
}



