/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ts.entity;

import java.io.Serializable;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;


@MappedSuperclass
public class BaseEntity implements Serializable{
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;
    
    @Version
    private Long version;

    
    @JsonbTransient
    @Column(nullable = true)
    private boolean canceled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
  
   public boolean isCanceled() {
        return canceled;
    }

    public void setCanceled(boolean canceled) {
        this.canceled = canceled;
    }    
    public JsonObject toJsonSlice() {

        return Json.createObjectBuilder()
                .add("id", this.id)
                .build();
    }
}