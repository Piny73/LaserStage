/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class UserDTO {
    
    public Long id;
    
    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;
    
    public String pwd;
    
    @NotBlank
    public String roleUser; // Aggiunto il campo roleUser per rappresentare il ruolo dell'utente

    @Override
    public String toString() {
        return "UserDTO{" + "id=" + id + ", name=" + name + ", email=" + email + ", pwd=" + pwd + ", roleUser=" + roleUser + '}';
    }
}
