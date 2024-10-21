package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import ts.entity.TimeSheet;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class TimeSheetStore extends BaseStore<TimeSheet> {

    /**
     * Recupera tutti i timesheet per un dato utente che non sono stati annullati.
     * 
     * @param userId ID dell'utente.
     * @return lista di timesheet associati all'utente.
     */
   public List<TimeSheet> all(Long userId) {
    return getEm().createQuery("SELECT e FROM TimeSheet e WHERE e.user.id = :userId AND e.enable = true", TimeSheet.class)
            .setParameter("userId", userId)
            .getResultList();
}


    /**
     * Trova un timesheet per ID.
     * 
     * @param id ID del timesheet.
     * @return Optional contenente il timesheet se trovato, altrimenti vuoto.
     */
    public Optional<TimeSheet> find(Long id) {
        TimeSheet found = getEm().find(TimeSheet.class, id);
        return Optional.ofNullable(found);
    }
}


