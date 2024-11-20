/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.boundary.mapping;

import javax.validation.constraints.NotBlank;


public class Credential {
    
    @NotBlank
    public String usr;
    
    @NotBlank
    public String pwd;
    
    
}
