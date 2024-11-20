package ts.boundary.mapping;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    
    public Long id;
    
   /* @NotBlank
    public String username; // Aggiunto campo username
*/
    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;
    
    public String pwd;
    
    @NotBlank
    public String roleUser; // Rappresenta il ruolo dell'utente

    @Override
    public String toString() {
        return "UserDTO{" + 
               "id=" + id + 
              // ", username='" + username + '\'' +  // Includi username nel toString
               ", name='" + name + '\'' + 
               ", email='" + email + '\'' + 
               ", pwd='" + pwd + '\'' + 
               ", roleUser='" + roleUser + '\'' + 
               '}';
    }
}
