/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import java.time.LocalDateTime;
import javax.json.bind.annotation.JsonbDateFormat;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


public class UserDTO {
    
    public Long id;
    
    @NotBlank
    public String name;

    @NotBlank
    @Email
    public String email;
    
    public String pwd;

    @Override
    public String toString() {
        return "UserDTO{" + "id=" + id + ", name=" + name + ", email=" + email + ", pwd=" + pwd + '}';
    }
    
       
}
