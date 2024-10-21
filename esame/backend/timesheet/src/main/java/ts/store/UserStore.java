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
import ts.entity.User;

@RequestScoped
@Transactional(Transactional.TxType.REQUIRED)
public class UserStore extends BaseStore<User> {

    /**
     * Restituisce l'elenco degli utenti non cancellati.
     * 
     * @return Lista di utenti attivi.
     */
    public List<User> all() {
        List<User> users = getEm()
            .createQuery("select e from User e where e.canceled = false", User.class)
            .getResultList();

        System.out.println("Utenti trovati: " + users.size()); // Stampa il numero di utenti trovati
        return users;
    }

    /**
     * Trova un utente per ID.
     * 
     * @param id ID dell'utente da cercare.
     * @return Un Optional contenente l'utente trovato, o vuoto se non trovato.
     */
    public Optional<User> find(Long id) {
        User found = getEm().find(User.class, id);
        return Optional.ofNullable(found); // Restituisce Optional.empty() se found è null
    }

    /**
     * Trova un utente in base all'email di login.
     * 
     * @param login Email dell'utente da cercare.
     * @return Un Optional contenente l'utente trovato, o vuoto se non trovato.
     */
    public Optional<User> findUserByLogin(String login) {
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

    /**
     * Effettua il login di un utente utilizzando le credenziali.
     * 
     * @param credential Oggetto contenente le credenziali dell'utente.
     * @return Un Optional contenente l'utente trovato, o vuoto se non trovato.
     */
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

    
}
