package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.transaction.Transactional;
import ts.entity.Activity;

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

    public Activity update(Activity activity) {
        // L'EntityManager gestirà l'aggiornamento automatico dell'entità
        return getEm().merge(activity); // Restituisce l'entità aggiornata
    }
}
