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

    public List<User> all() {

        return getEm().createQuery("select e from User e where e.canceled = false", User.class)
                .getResultList();

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

}
