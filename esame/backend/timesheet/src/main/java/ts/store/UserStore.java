package ts.store;

import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import ts.boundary.mapping.Credential;
import ts.entity.User;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class UserStore extends BaseStore<User> {

    public List<User> all() {
        List<User> users = getEm().createQuery("select e from User e where e.canceled = false", User.class)
                .getResultList();
        System.out.println("Users found: " + users.size()); // Prints the number of users found
        return users;
    }

    public Optional<User> find(Long id) {
        User found = getEm().find(User.class, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }

    public Optional<User> findUserbyLogin(String login) {
        try {
            return Optional.of(
                    getEm().createQuery("select e from User e where e.email = :login and e.canceled = false", User.class)
                            .setParameter("login", login)
                            .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public Optional<User> login(Credential credential) {
        try {
            return Optional.of(
                    getEm().createQuery("select e from User e where e.email = :usr and e.pwd = :pwd and e.canceled = false", User.class)
                            .setParameter("usr", credential.usr)
                            .setParameter("pwd", credential.pwd)
                            .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public User save(User user) {
        // Uses `merge` to handle detached users without throwing exceptions
        return getEm().merge(user);
    }

    public User update(User user) {
        // Merge the user to update existing data
        return getEm().merge(user);
    }

    public boolean remove(User user) {
        try {
            if (!getEm().contains(user)) {
                user = getEm().merge(user); // Ensure the object is managed
            }
            getEm().remove(user);
            return true; // Returns true if removal was successful
        } catch (Exception e) {
            System.err.println("Error removing user: " + e.getMessage());
            return false; // Returns false if there was an error
        }
    }
}


//classe UserStore con l'implementare l'hashing delle password utilizzando SHA-256.Ho anche incluso la logica per hashare la password quando un utente viene salvato o aggiornato
/*
package ts.store;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;
import javax.enterprise.context.RequestScoped;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import ts.boundary.mapping.Credential;
import ts.entity.User;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class UserStore extends BaseStore<User> {

    public List<User> all() {
        List<User> users = getEm().createQuery("select e from User e where e.canceled = false", User.class)
                .getResultList();
        System.out.println("Utenti trovati: " + users.size()); // Stampa il numero di utenti trovati
        return users;
    }

    public Optional<User> find(Long id) {
        User found = getEm().find(User.class, id);
        return found == null ? Optional.empty() : Optional.of(found);
    }

    public Optional<User> findUserbyLogin(String login) {
        try {
            return Optional.of(
                    getEm().createQuery("select e from User e where e.email = :login and e.canceled = false", User.class)
                            .setParameter("login", login)
                            .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public Optional<User> login(Credential credential) {
        try {
            return Optional.of(
                    getEm().createQuery("select e from User e where e.email = :usr and e.pwd = :pwd and e.canceled = false", User.class)
                            .setParameter("usr", credential.usr)
                            .setParameter("pwd", hashPassword(credential.pwd)) // Hash della password
                            .getSingleResult()
            );
        } catch (NoResultException ex) {
            return Optional.empty();
        }
    }

    public User save(User user) {
        user.setPwd(hashPassword(user.getPwd())); // Hash della password prima di salvarla
        user = getEm().merge(user); // Usa `merge` per gestire anche utenti "detached"
        return user; // Ritorna l'oggetto utente salvato o aggiornato
    }

    public User update(User user) {
        user.setPwd(hashPassword(user.getPwd())); // Hash della password prima di aggiornare
        return getEm().merge(user); // Merge l'utente per aggiornare i dati esistenti
    }

    public boolean remove(User user) {
        try {
            if (!getEm().contains(user)) {
                user = getEm().merge(user); // Assicurati che l'oggetto sia gestito
            }
            getEm().remove(user);
            return true; // Ritorna true se la rimozione è avvenuta con successo
        } catch (Exception e) {
            System.err.println("Errore durante la rimozione dell'utente: " + e.getMessage());
            return false; // Ritorna false se c'è stato un errore
        }
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashedBytes = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashedBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Errore durante l'hashing della password", e);
        }
    }
}

*/