package ts.boundary.mapping;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    
    private Long id; // Uso di private per incapsulare i dati

    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    private String pwd; // Considera di non esporre la password nei DTO, se non necessario

    @NotBlank
    private String roleUser; // Rappresenta il ruolo dell'utente

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getRoleUser() {
        return roleUser;
    }

    public void setRoleUser(String roleUser) {
        this.roleUser = roleUser;
    }

    @Override
    public String toString() {
        return "UserDTO{" + "id=" + id + ", name=" + name + ", email=" + email + ", roleUser=" + roleUser + '}';
    }
}
